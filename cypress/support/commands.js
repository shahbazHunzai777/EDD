// //const sendEmail = require('../Integration/sendEmail');
// import { sendEmail} from '../Integration/sendEmail'

// // Custom Cypress command to send email
// Cypress.Commands.add('sendEmail', () => {
//     sendEmail();
// });

Cypress.Commands.add('loginSession', (email, password) => {
    cy.visit('https://sdioextpp1.edd.ca.gov')
});