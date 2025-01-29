import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function comprehensiveAirtableAuthDebug() {
  console.log('=== Comprehensive Airtable Authentication Debug ===');

  // Detailed input validation
  const personalAccessToken = process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;

  // Extensive logging of token and base ID
  console.log('🔍 Token Diagnostic:');
  console.log('- Token Provided:', !!personalAccessToken);
  console.log('- Token Length:', personalAccessToken?.length);
  console.log('- Token Starts with pat_:', personalAccessToken?.startsWith('pat_'));
  console.log('- Base ID Provided:', !!baseId);

  if (!personalAccessToken) {
    console.error('❌ CRITICAL: No Personal Access Token found in .env');
    console.error('Steps to resolve:');
    console.error('1. Generate a new token in Airtable');
    console.error('2. Copy ENTIRE token');
    console.error('3. Paste in .env file');
    console.error('4. Ensure no extra spaces');
    return;
  }

  if (!baseId) {
    console.error('❌ CRITICAL: No Base ID found in .env');
    console.error('Steps to resolve:');
    console.error('1. Open your Airtable base');
    console.error('2. Check URL for base ID');
    console.error('3. Add to .env file');
    return;
  }

  try {
    // Comprehensive API test
    console.log('\n🌐 Attempting Airtable API Connection...');
    const response = await axios.get(
      `https://api.airtable.com/v0/meta/bases/${baseId}/tables`, 
      {
        headers: {
          'Authorization': `Bearer ${personalAccessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ Base Metadata Retrieved Successfully');
    console.log('Tables in Base:', response.data.tables.length);
    
    // List tables
    console.log('\n📋 Base Tables:');
    response.data.tables.forEach((table, index) => {
      console.log(`${index + 1}. ${table.name}`);
    });

    // Specific table check
    console.log('\n🕵️ Checking "Content Pipeline" Table...');
    const contentPipelineTable = response.data.tables
      .find(table => table.name.trim() === 'Content Pipeline');

    if (contentPipelineTable) {
      console.log('✅ "Content Pipeline" Table Found');
      console.log('Table ID:', contentPipelineTable.id);
    } else {
      console.warn('❓ "Content Pipeline" Table Not Found');
      console.warn('Suggestions:');
      console.warn('1. Verify exact table name');
      console.warn('2. Confirm table exists in this base');
    }

  } catch (error) {
    console.error('❌ API Access Failed');
    console.error('Detailed Error Analysis:');
    
    if (error.response) {
      console.error('Status Code:', error.response.status);
      console.error('Error Type:', error.response.data?.error?.type);
      console.error('Error Message:', error.response.data?.error?.message);

      switch (error.response.status) {
        case 401:
          console.warn('🚨 Authentication Failure Reasons:');
          console.warn('- Token may be invalid');
          console.warn('- Token expired');
          console.warn('- Incorrect token scopes');
          break;
        case 403:
          console.warn('🚨 Access Forbidden:');
          console.warn('- Insufficient permissions');
          console.warn('- Base not shared with this account');
          break;
        case 404:
          console.warn('🚨 Base Not Found:');
          console.warn('- Incorrect Base ID');
          console.warn('- Base may have been deleted');
          break;
      }
    } else if (error.request) {
      console.error('No response received');
    } else {
      console.error('Error setting up request');
    }

    console.error('\n🛠️ Troubleshooting Checklist:');
    console.error('1. Regenerate Personal Access Token');
    console.error('2. Verify Base ID');
    console.error('3. Check Airtable Account Permissions');
    console.error('4. Ensure Correct Account is Used');
  }
}

// Run the comprehensive diagnostic
comprehensiveAirtableAuthDebug()
  .catch(err => {
    console.error('Unexpected global error:', err);
  });