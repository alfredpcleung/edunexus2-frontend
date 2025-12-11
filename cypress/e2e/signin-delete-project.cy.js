describe('Sign In and Delete Project', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('should sign in and delete a project', () => {
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
    
    // Get the count of projects before deletion
    cy.get('tbody tr').then(($rows) => {
      const initialCount = $rows.length;
      
      // Find and click the delete button for the first project
      cy.get('button').contains('Delete').first().click();
      
      // Confirm the deletion in the alert
      cy.on('window:alert', (str) => {
        expect(str).to.contain('delete');
      });
      
      // Verify the project was deleted - should have one less row
      cy.get('tbody tr').should('have.length.lessThan', initialCount);
    });
  });
});
