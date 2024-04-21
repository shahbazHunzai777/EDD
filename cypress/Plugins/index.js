// const nodemailer = require('nodemailer');
// const fs = require('fs');

// // Create a transporter object using SMTP transport
// let transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'shahbaz.developer.tech@gmail.com',
//     pass: 'Neelambano2016'
//   }
// });

// // Define email content
// let mailOptions = {
//   from: 'shahbaz.developer.tech@gmail.com',
//   to: 'shahbaz.khan@cache-cloud.com',
//   subject: 'Cypress Test Results',
//   text: 'Please find attached Cypress test results.',
//   attachments: [
//     {
//       filename: 'screenshot.png', // Change the filename accordingly
//       content: fs.createReadStream('cypress/screenshots/my-test-case.png') // Change the file path accordingly
//     },
//     // Add more attachments as needed
//   ]
// };

// module.exports = (on, config) => {
//   on('after:run', (results) => {
//     // Send email after all tests have run
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.log('Error occurred:', error);
//       } else {
//         console.log('Email sent:', info.response);
//       }
//     });
//   });
// };
