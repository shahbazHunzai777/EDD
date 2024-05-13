const fs = require('fs');
const xlsx = require('xlsx');
// Read JSON test results
const testResults = require('./cypress/reports/json/mochawesome.json');
// Extract relevant information
//console.log(testResults.results[0].suites)
const formattedData = testResults.results[0].suites[0].tests.map(test => ({
  "APP Name" : "OAG Preproduction Health Check",
  "Test URLS": test.title.replace('Visit ', ''),
  "Status": test.state,
  "Duration (ms)": test.duration
}));
// Create a new workbook
const workbook = xlsx.utils.book_new();
// Convert data to worksheet
const worksheet = xlsx.utils.json_to_sheet(formattedData);
// Add the worksheet to the workbook
xlsx.utils.book_append_sheet(workbook, worksheet, 'Test Results');
// Write the workbook to an Excel file
xlsx.writeFile(workbook, 'test-results.xlsx');