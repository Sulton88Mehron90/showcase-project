describe('Error Handling', () => {
  it('Should navigate to error page when a 500 error occurs', () => {
    cy.intercept('GET', 'https://opentdb.com/api_category.php', {
      statusCode: 500
    });
    cy.visit('http://localhost:3000/flashcards');
    cy.url().should('include', '/500');
  });

  it('should display a 404 error message when the page is not found', () => {
    cy.visit('http://localhost:3000/nonexistentpage');
    cy.viewport(650, 750)
    cy.contains('404 - Page Not Found').should('be.visible');
    cy.contains("Sorry! That page doesn't seem to exist. Try going back to the home page.").should('be.visible');
    cy.url().should('include', '/404')
    cy.get('.error404-go-home-button').should('be.visible');
    cy.get('.fun-fact').should('be.visible');
  });

  it('Should display appropriate error message at /error', () => {
    cy.visit('http://localhost:3000/error');
    cy.viewport(550, 750) 
    cy.get('img').should('be.visible'); 
    cy.get('h1').should('be.visible'); 
    cy.get('.errors-go-home-button').should('be.visible');
  });

});
