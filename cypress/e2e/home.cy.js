describe('Home Page', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('should load the home page', () => {
    cy.url().should('eq', 'http://localhost:3000/');
    cy.contains('Avicenna Method!');
  });

  it('should display the main elements and correct writing', () => {
    cy.get('h1').should('contain', 'Avicenna Method!');
    cy.get('.img-container img').should('be.visible');
    cy.get('.goBackButton').should('exist');
    cy.get('.button').should('exist');
    cy.get('.button').should('exist');
    cy.get(':nth-child(7) > a').should('exist');
    cy.get('h2').should('contain', 'Why the Avicenna Method as a Brain Relaxer?');
    cy.get('.container > :nth-child(4)').should('contain', "This app is inspired by one of my countrymen, Avicenna, and his method of switching from one subject to another when he felt tired or stuck. It's a great way to take a break while still engaging your brain!");
    cy.get('.container > :nth-child(7)').should('contain','On a separate note, I used flashcards to entertain my grandson during long-distance video calls in the COVID era. Flashcards can be a versatile and engaging tool for all ages.')
  });
 
  it('should navigate to the flashcards page on button click', () => {
    cy.get('.goBackButton').click();
    cy.url().should('eq', 'http://localhost:3000/flashcards');
  });

});

// describe('Home Page - Sad Path', () => {
//   beforeEach(() => {
//     cy.visit('http://localhost:3000/');
//   });

//   it('should display an error message if the main image fails to load', () => {
//     cy.intercept('GET', '**/ibnSino2.png', { statusCode: 500 });
//     cy.reload();

//     // You might show an error message or alternative text when the image fails to load.
//     // This is a hypothetical example.
//     cy.contains('Image failed to load').should('be.visible');
//   });

//   it('should handle non-existent routes gracefully', () => {
//     // Visit a non-existent route.
//     cy.visit('http://localhost:3000/non-existent-route');

//     // Check that the application redirects to the home page.
//     cy.url().should('eq', 'http://localhost:3000/');

//     // Optionally, you can also check for a specific message on the home page indicating the 404 error.
//     cy.contains('Page not found').should('be.visible');
//   });
// });
