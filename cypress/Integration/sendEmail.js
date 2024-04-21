
// const nodemailer = require('nodemailer');

// // Function to send email
// function sendEmail() {
//     const transporter = nodemailer.createTransport({
//         host: 'localhost', // Localhost
//         port: 1025, // Port for local testing (e.g., MailDev)
//         ignoreTLS: true // For testing, ignore TLS certificate
//     });

//     const mailOptions = {
//         from: 'your-email@example.com', // Sender address
//         to: 'recipient@example.com', // List of recipients
//         subject: 'Cypress Test Report', // Email subject
//         text: 'Here is the test report from Cypress.' // Plain text body
//     };

//     transporter.sendMail(mailOptions, function(error, info) {
//         if (error) {
//             console.error('Error:', error);
//         } else {
//             console.log('Email sent:', info.response);
//         }
//     });
// }

// // Export the function to be used as a custom Cypress command
// module.exports = sendEmail;