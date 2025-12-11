describe('Sign In and Edit Project', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('should sign in and edit an existing project', () => {
    // Navigate to login page
    cy.contains('Sign In').click();
    
    // Verify we're on the login page
    cy.url().should('include', '/login');
    
    // Fill in the login form
    cy.get('input[name="email"]').type('testuser1765485549462@example.com');
    cy.get('input[name="password"]').type('TestPassword123');
    
    // Submit the form
    cy.contains('button', 'Sign In').click();
    
    // Wait for redirect and navigate to projects
    cy.url().should('include', '/contacts');
    cy.contains('a', 'Projects').click();
    cy.url().should('include', '/projects');
    
    // Find and click the edit button for the first project
    cy.get('button').contains('Edit').first().click();
    cy.url().should('include', '/projects/');
    
    // Verify we're on the edit page
    cy.contains('Edit Project').should('be.visible');
    
    // Update the project details
    const timestamp = Date.now();
    cy.get('input[name="title"]').first()
      .clear()
      .type(`Updated Project ${timestamp}`);
    
    cy.get('textarea[name="description"]').first()
      .clear()
      .type('This project was updated via Cypress automation');
    
    // Submit the form
    cy.contains('button', 'Update Project').click();
    
    // Wait for the redirect and API response
    cy.wait(1000);
    cy.url().should('include', '/projects');
    
    // Verify project was updated - should see it in the table
    cy.contains('td', `Updated Project ${timestamp}`).should('be.visible');
  });
});
