const fs = require('fs');
const xlsx = require('xlsx');

// Read JSON test results
const testResults = require('./cypress/reports/index.json');

// Extract relevant information
const appName = ['UIO PPR PERF', 'SDIO PPR PERF', 'UIO PPR STG', 'SDIO PPR STG', 'SDIO PP04', 'BOS', 'UIO PPR UAT', 'SDIO PPR UAT', 'eservicest1'];

let formattedData = [];

// Iterate over each result suite
testResults.results.forEach((result, resultIndex) => {
  result.suites.forEach((suite, suiteIndex) => {
    suite.tests.forEach((test, testIndex) => {
      formattedData.push({
        "APP Name": appName[testIndex % appName.length], // Handle cases where testIndex exceeds appName length
        "Test URLS": test.title.replace('Visits ', ''),
        "Status": test.state,
        "Duration in (ms)": test.duration
      });
    });
  });
});

// Log formatted data (optional)
//console.log(formattedData);

// Create a new workbook
const workbook = xlsx.utils.book_new();

// Convert data to worksheet
const worksheet = xlsx.utils.json_to_sheet(formattedData);

// Add the worksheet to the workbook
xlsx.utils.book_append_sheet(workbook, worksheet, 'Test Results');

// Write the workbook to an Excel file
xlsx.writeFile(workbook, 'test-results.xlsx');
