const selectedCategory = 'Sports';
const numberOfQuestions = 10;

// https://opentdb.com/api.php?amount=50&type=multiple&encode=url3986

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

  it('should load the page without errors and display form, buttons, and image', () => {
    cy.url().should('include', '/flashcards');
    cy.get('.container').should('be.visible');
    cy.get('.btn').should('be.visible');
    cy.get('.button').should('be.visible');
    cy.get('img').should('be.visible');
  });

  it('should display Category label and dropdown, select a category, choose the number of questions, and display flashcards with questions after clicking the Generate button', () => {
    cy.get(':nth-child(1) > label').should('be.visible');
    cy.get('#category').should('be.visible');
    cy.get('#category').select(selectedCategory);
    cy.get(':nth-child(2) > label').should('be.visible');
    cy.get('#amount').should('be.visible');
    cy.get('#amount').clear();
    cy.get('#amount').type(`${numberOfQuestions}{enter}`);
    cy.get('#amount').should('have.value', numberOfQuestions);
    cy.get('.btn').click();
    cy.get('.card-grid').should('be.visible');
  });

  it('should show the correct answer when a flashcard is clicked', () => {
    cy.get('.btn').click();
    cy.get(':nth-child(1) > .front').first().click();
    cy.get('.flip').should('be.visible');
  });

  it('should be able to return home by clicking the Exit The Game button', () => {
    cy.get('.button').should('be.visible');
    cy.get('.button').click();
  });
});

describe('Flashcard Page - Sad Path', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://opentdb.com/api_category.php', {
      statusCode: 200,
      fixture: 'sampleCategories.json'
    });
    cy.visit('http://localhost:3000/flashcards');
  });

  it('should show a warning message for an invalid number of questions', () => {
    cy.get('#amount').clear();
    cy.get('#amount').type('60');
    cy.get('.btn').click();
    cy.get('#amount').invoke('prop', 'validationMessage').should('include', 'Value must be less than or equal to 50.');
  });

  it('Should navigate to error page when a 500 error occurs', () => {
    cy.intercept('GET', 'https://opentdb.com/api.php?amount=50&type=multiple&encode=url3986', {
      statusCode: 500
    });
    cy.visit('http://localhost:3000/flashcards');
    cy.url().should('include', '/500');
    cy.get('.error-message', { timeout: 10000 }).should('be.visible');
    cy.contains('500 - Internal Server Error').should('be.visible');
  });
});
