// Cypress support file for e2e tests
// This file is loaded before the test files run

// Disable uncaught exception handling for network errors
Cypress.on('uncaught:exception', (err, runnable) => {
  // Return false to prevent Cypress from failing the test
  return false;
});

// Add custom commands here if needed
// Example: Cypress.Commands.add('login', (email, password) => { ... })
