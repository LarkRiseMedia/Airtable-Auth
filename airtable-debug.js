// Modify your debug script to be more explicit
async function checkAirtableConnection() {
  try {
    console.log('Attempting connection with:');
    console.log('Token length:', process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN.length);
    console.log('Base ID:', process.env.AIRTABLE_BASE_ID);

    // Use more explicit configuration
    const base = new Airtable({ 
      apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN,
      // Add this option for more detailed error reporting
      endpointUrl: 'https://api.airtable.com'
    }).base(process.env.AIRTABLE_BASE_ID);

    // More verbose record selection
    return new Promise((resolve, reject) => {
      base('Content Pipeline').select({
        maxRecords: 1,
        view: "Grid view"
      }).firstPage((err, records) => {
        if (err) {
          console.error('Detailed Airtable Error:', {
            errorName: err.name,
            errorMessage: err.message,
            errorDetails: err
          });
          reject(err);
          return;
        }

        console.log('Successful connection!');
        console.log('Records found:', records.length);
        resolve(records);
      });
    });
  } catch (error) {
    console.error('Comprehensive Connection Error:', {
      errorName: error.name,
      errorMessage: error.message,
      errorStack: error.stack
    });
    throw error;
  }
}