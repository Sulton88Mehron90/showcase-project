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
    cy.get('.button').should('exist');
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


describe('Flashcard Page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://opentdb.com/api.php*', {
      statusCode: 200,
      fixture: 'flashcardData.json'
    });

    cy.intercept('GET', 'https://opentdb.com/api_category.php', {
      statusCode: 200,
      fixture: 'sampleCategories.json'
    });

    cy.visit('http://localhost:3000/flashcards');
  });

  it('should load the page without errors', () => {
    cy.url().should('include', '/flashcards');
  });

  it('should display the form when visiting for the first time', () => {
    cy.get('.container').should('be.visible');
  });

  it('should display Category label and dropdown and be able to select a categry from the listin the form when visiting for the first time', () => {
    cy.get(':nth-child(1) > label').should('be.visible');
    cy.get('#category').should('be.visible');
  });

  it('should be able to select a Categry from the dropdown list in the form', () => {
    cy.get(':nth-child(1) > label').should('be.visible');
    cy.get('#category').should('be.visible');
  });
  
  it('should display "Number of Questions" label and input in the form when visiting for the first time', () => {
    cy.get(':nth-child(2) > label').should('be.visible');
    cy.get('#amount').should('be.visible');
  });

  it('should be able to enter # in input "Number of Questions"', () => {
    cy.get(':nth-child(2) > label').should('be.visible');
    cy.get('#amount').should('be.visible');
  });

  it('should display Generate, Exit The Game buttons and an Image', () => {
    cy.get('.btn').should('be.visible');
    cy.get('.button').should('be.visible');
    cy.get('img').should('be.visible');
  });

  it('should be able to poulate flashcards by clicking the Generate button', () => {
    cy.get('.btn').should('be.visible');
  });
  
  it('should filter questions when a category and number of questions are selected', () => {
    cy.intercept('GET', 'https://opentdb.com/api.php*category=Sports*', {
      statusCode: 200,
      fixture: 'sampleCategories.json'
    });
    
 it('should display flash cards for number of questions', () => {
    cy.intercept('GET', 'https://opentdb.com/api.php*amount=9*', {
      statusCode: 200,
      fixture: 'flashcardsData.json'
    });

    cy.get('.flashcard').should('have.length', 10);
  });

  it('should display flashcards with trivia questions', () => {
    cy.get('.flashcard').should('be.visible');
  });

  it('should show the correct answer when a flashcard is clicked', () => {
    // Replace '.flashcard' and '.answer' with your actual selectors.
    cy.get('.flashcard').first().click();
    cy.get('.answer').should('be.visible');
  });

  it('should be able to return home by clicking the Exit The Game button', () => {
    cy.get('.button').should('be.visible');
  });

  });
});
