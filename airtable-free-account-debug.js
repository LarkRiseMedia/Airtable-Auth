// scripts/airtable-auth-debug.js
import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function testAirtableAccess() {
  console.log('=== Airtable Authentication Debug ===');

  // Validate inputs
  const personalAccessToken = process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!personalAccessToken) {
    console.error('❌ No Personal Access Token found');
    return;
  }

  if (!baseId) {
    console.error('❌ No Base ID found');
    return;
  }

  try {
    // Direct API request to Airtable
    const response = await axios.get(
      `https://api.airtable.com/v0/${baseId}/Content%20Pipeline`, 
      {
        headers: {
          'Authorization': `Bearer ${personalAccessToken}`,
          'Content-Type': 'application/json'
        },
        params: {
          maxRecords: 3,
          view: 'Grid view'
        }
      }
    );

    console.log('✅ Successful API Connection');
    console.log('Records Retrieved:', response.data.records.length);

    // Print record details
    response.data.records.forEach((record, index) => {
      console.log(`\nRecord ${index + 1}:`);
      console.log(JSON.stringify(record.fields, null, 2));
    });

  } catch (error) {
    console.error('❌ API Access Failed');
    console.error('Full Error Details:');
    console.error('Status:', error.response?.status);
    console.error('Data:', error.response?.data);
    console.error('Message:', error.message);

    // Specific error analysis
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.warn('🚨 Authentication Failed:');
          console.warn('- Invalid or expired personal access token');
          console.warn('- Token may not have correct permissions');
          break;
        case 403:
          console.warn('🚨 Access Forbidden:');
          console.warn('- Base may not be shared with this account');
          console.warn('- Insufficient permissions');
          break;
        case 404:
          console.warn('🚨 Base or Table Not Found:');
          console.warn('- Verify Base ID is correct');
          console.warn('- Confirm "Content Pipeline" table exists');
          break;
      }
    }
  }
}

// Run the diagnostic
testAirtableAccess()
  .catch(err => {
    console.error('Unexpected error:', err);
  });