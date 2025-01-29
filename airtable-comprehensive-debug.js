// scripts/airtable-comprehensive-debug.js
import Airtable from 'airtable';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load environment variables
dotenv.config();

// Comprehensive debugging function
async function comprehensiveAirtableDebug() {
  console.log('=== Airtable Comprehensive Debug ===');
  
  // Check .env file contents
  try {
    const envPath = path.resolve(process.cwd(), '.env');
    console.log('\n=== .env File Contents ===');
    const envContents = fs.readFileSync(envPath, 'utf8');
    
    // Mask sensitive information
    const maskedContents = envContents
      .split('\n')
      .map(line => {
        if (line.includes('AIRTABLE_PERSONAL_ACCESS_TOKEN')) {
          return line.split('=')[0] + '=***MASKED***';
        }
        if (line.includes('ANTHROPIC_API_KEY')) {
          return line.split('=')[0] + '=***MASKED***';
        }
        return line;
      })
      .join('\n');
    
    console.log(maskedContents);
  } catch (fileError) {
    console.error('Error reading .env file:', fileError);
  }

  // Environment Variable Checks
  console.log('\n=== Environment Variable Checks ===');
  console.log('Node.js Version:', process.version);
  console.log('Airtable Personal Access Token:');
  console.log('- Exists:', !!process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN);
  console.log('- Length:', process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN?.length);
  console.log('Base ID:', process.env.AIRTABLE_BASE_ID);

  // Airtable Connection Test
  try {
    // Verbose Airtable configuration
    const base = new Airtable({ 
      apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN,
      endpointUrl: 'https://api.airtable.com'
    }).base(process.env.AIRTABLE_BASE_ID);

    console.log('\n=== Airtable Connection Attempt ===');
    
    return new Promise((resolve, reject) => {
      base('Content Pipeline').select({
        maxRecords: 5,
        view: "Grid view"
      }).firstPage((err, records) => {
        if (err) {
          console.error('=== Detailed Airtable Error ===');
          console.error('Error Name:', err.name);
          console.error('Error Message:', err.message);
          console.error('Error Details:', JSON.stringify(err, null, 2));
          
          // Additional error type checking
          console.error('Is AirtableError:', err instanceof Airtable.Error);
          console.error('Error Properties:', Object.keys(err));
          
          reject(err);
          return;
        }

        console.log('=== Connection Successful ===');
        console.log('Records Found:', records.length);
        
        // Print first record details if exists
        if (records.length > 0) {
          console.log('\n=== Sample Record ===');
          console.log(JSON.stringify(records[0].fields, null, 2));
        }

        resolve(records);
      });
    });
  } catch (connectionError) {
    console.error('=== Connection Setup Error ===');
    console.error('Error:', connectionError);
    throw connectionError;
  }
}

// Run the comprehensive debug
comprehensiveAirtableDebug()
  .then(() => {
    console.log('\nDebug completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\nDebug encountered an error');
    process.exit(1);
  });