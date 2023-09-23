describe('Home Page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://opentdb.com/api.php?amount=10&type=multiple&encode=url3986', {
      statusCode: 200,
      fixture: 'flashcardData.json'
    });

    cy.intercept('GET', 'https://opentdb.com/api_category.php', {
      statusCode: 200,
      fixture: 'sampleCategories.json'
    });

    cy.visit('http://localhost:3000');
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
    cy.get('.container > :nth-child(7)').should('contain', 'On a separate note, I used flashcards to entertain my grandson during long-distance video calls in the COVID era. Flashcards can be a versatile and engaging tool for all ages.')
  });

  it('should navigate to the flashcards page on button click', () => {
    cy.get('.goBackButton').click();
    cy.url().should('eq', 'http://localhost:3000/flashcards');
  });

});

describe('Home Page - Sad Path', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://opentdb.com/api.php*', {
      statusCode: 200,
      fixture: 'flashcardData.json'
    });

    cy.intercept('GET', 'https://opentdb.com/api_category.php', {
      statusCode: 200,
      fixture: 'sampleCategories.json'
    });

    cy.visit('http://localhost:3000');
  });

  it('should display an error message if the main image fails to load', () => {
    cy.intercept('GET', '**/ibnSino2.png', { statusCode: 404 });
    cy.reload();
    cy.get('img[alt="Ibn Sino"]').should('be.visible');
});

  it('should handle non-existent routes gracefully', () => {
    cy.visit('http://localhost:3000/non-existent-route');
    cy.url().should('eq', 'http://localhost:3000/404');
    cy.contains('404 - Page Not Found').should('be.visible');
  });

  it('Should navigate to error page when a 500 error occurs', () => {
    cy.intercept('GET', 'https://opentdb.com/api_category.php', {
      statusCode: 500
    });
    
    cy.visit('http://localhost:3000');
    cy.url().should('include', '/500');
  });

  it('Should display appropriate error message at /error', () => {
    cy.visit('http://localhost:3000/error');
    cy.get('img').should('be.visible'); 
    cy.get('h1').should('be.visible'); 
  });

});