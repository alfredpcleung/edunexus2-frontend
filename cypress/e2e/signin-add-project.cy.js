describe('Sign In and Add Project', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('should sign in and add a new project', () => {
    // Navigate to login page
    cy.contains('Sign In').click();
    
    // Verify we're on the login page
    cy.url().should('include', '/login');
    cy.contains('Sign In').should('be.visible');
    
    // Fill in the login form
    cy.get('input[name="email"]').type('testuser1765485549462@example.com');
    cy.get('input[name="password"]').type('TestPassword123');
    
    // Submit the form
    cy.contains('button', 'Sign In').click();
    
    // Wait for redirect and navigate to projects
    cy.url().should('include', '/contacts');
    
    // Navigate to projects page
    cy.contains('a', 'Projects').click();
    cy.url().should('include', '/projects');
    
    // Click on "New Project" button
    cy.contains('button', 'New Project').click();
    cy.url().should('include', '/projects/new');
    
    // Fill in the project form
    const timestamp = Date.now();
    cy.get('input[name="title"]').type(`Test Project ${timestamp}`);
    cy.get('textarea[name="description"]').type('This is a test project created via Cypress');
    cy.get('input[name="completion"]').type('2025-12-31');
    
    // Submit the form
    cy.contains('button', 'Create Project').click();
    
    // Verify project was created - should redirect back to projects list
    cy.url().should('include', '/projects');
    cy.contains(`Test Project ${timestamp}`).should('be.visible');
  });
});
