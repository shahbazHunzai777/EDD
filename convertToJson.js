const fs = require('fs');
const xlsx = require('xlsx');
// Read JSON test results
const testResults = require('./cypress/reports/index.json');
// Extract relevant information
//console.log(testResults.results[0].suites)
const appName = ['UIO PPR PERF', 'SDIO PPR PERF', 'UIO PPR STG', 'SDIO PPR STG', 'SDIO PP04', 'BOS', 'UIO PPR UAT', 'SDIO PPR UAT', 'eservicest1'];
const formattedData = testResults.results[0].suites[0].tests.map((test, index) => ({
  "APP Name" : appName[index], 
  "Test URLS": test.title.replace('Visits ', ''),
  "Status": test.state,
  "Duration in (ms)": test.duration
}));
// Create a new workbook
const workbook = xlsx.utils.book_new();
// Convert data to worksheet
const worksheet = xlsx.utils.json_to_sheet(formattedData);
// Add the worksheet to the workbook
xlsx.utils.book_append_sheet(workbook, worksheet, 'Test Results');
// Write the workbook to an Excel file
xlsx.writeFile(workbook, 'test-results.xlsx');