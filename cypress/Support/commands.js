// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// cypress/support/index.js or cypress/plugins/index.js
module.exports = (on, config) => {
    on('before:browser:launch', (browser = {}, args) => {
      if (browser.name === 'chrome') {
        args.push('--use-fake-ui-for-media-stream');
        args.push('--use-fake-device-for-media-stream');
        args.push('--use-file-for-fake-video-capture=cypress/fixtures/akiyo_cif.y4m'); // Path to the fake video file
      }
      
      return args;
    });
  };
  
  