describe('Home Page', () => {

  beforeEach(() => {
      cy.visit('http://localhost:3000/');
  });

  it('should load the home page', () => {
      cy.url().should('eq', 'http://localhost:3000/');
      cy.contains('Avicenna Method!'); 
  });

  it('should display the main elements', () => {
      cy.get('h1').should('contain', 'Avicenna Method!');
      cy.get('.img-container img').should('be.visible');
      cy.get('.goBackButton').should('exist');
      cy.get('.button').should('exist');
  });

  it('should navigate to the flashcards page on button click', () => {
      cy.get('.goBackButton').click();
      cy.url().should('eq', 'http://localhost:3000/flashcards');
  });

});

// describe('Home Page - Sad Path', () => {

//   beforeEach(() => {
//       cy.visit('http://localhost:3000/'); 
//   });

//   it('should display an error message if the main image fails to load', () => {
//       cy.intercept('GET', '**/ibnSino2.png', { statusCode: 500 });
//       cy.reload();
      
//       // You might show an error message or alternative text when the image fails to load.
//       // This is a hypothetical example.
//       cy.contains('Image failed to load').should('be.visible');
//   });

//   it('should handle non-existent routes gracefully', () => {
//       cy.visit('http://localhost:3000/non-existent-route');
      
//       // Check for a 404 message or a redirect to the home page.
//       // This depends on how your app handles this scenario.
//       cy.contains('Page not found').should('be.visible');
//       // OR
//       // cy.url().should('eq', 'http://localhost:3000/'); 
//   });

// });


// describe('HomePage Tests', () => {
//   beforeEach(() => {
//     cy.intercept('GET', 'https://opentdb.com/api.php*', {
//       statusCode: 200,
//       fixture: 'flashcardData.json'
//     });
//     cy.intercept('GET', 'https://opentdb.com/api_category.php', {
//       statusCode: 200,
//       fixture: 'flashcardData.json'
//     });

//     cy.visit('http://localhost:3000/');
//   });
