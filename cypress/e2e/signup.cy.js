describe('Sign Up', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('should successfully sign up a new user', () => {
    // Navigate to signup page
    cy.contains('Get Started').click();
    
    // Verify we're on the signup page
    cy.url().should('include', '/signup');
    cy.contains('Create Account').should('be.visible');
    
    // Fill in the signup form
    const timestamp = Date.now();
    const email = `testuser${timestamp}@example.com`;
    
    cy.get('input[name="firstname"]').type('Test');
    cy.get('input[name="lastname"]').type('User');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type('TestPassword123');
    
    // Submit the form
    cy.contains('button', 'Sign Up').click();
    
    // Wait for redirect (signup has 1 second delay)
    cy.wait(1500);
    
    // Verify successful signup - should redirect to login
    cy.url().should('include', '/login');
    
    // Verify auth token is stored
    cy.window().then((win) => {
      expect(win.localStorage.getItem('authToken')).to.exist;
    });
  });
});
