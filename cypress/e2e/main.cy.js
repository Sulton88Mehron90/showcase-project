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


// describe('Flashcard Page', () => {
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
// })

describe('Flashcard Page', () => {
    beforeEach(() => {
      cy.intercept('GET', 'https://opentdb.com/api.php*', {
        statusCode: 200,
        fixture: 'flashcardData.json'
      });
  
      cy.intercept('GET', 'https://opentdb.com/api_category.php', {
        statusCode: 200,
        fixture: 'flashcardData.json'
      });
  
      cy.visit('http://localhost:3000/flashcards');
    });
  
    it('should load the page without errors', () => {
      cy.url().should('include', '/flashcards');
    });

    it('should display the form when visiting for the first time', () => {
      cy.get('.container').should('be.visible');
    });
  
    // it('should display flashcards with trivia questions', () => {
    //   cy.get('.flashcard').should('be.visible');
    // });
  
  //   it('should show the correct answer when a flashcard is clicked', () => {
  //     // Replace '.flashcard' and '.answer' with your actual selectors.
  //     cy.get('.flashcard').first().click();
  //     cy.get('.answer').should('be.visible');
  //   });
  
  //   it('should filter questions when a category is selected', () => {
  //     // Mock API response for filtered questions.
  //     cy.intercept('GET', 'https://opentdb.com/api.php*category=Sports*', {
  //       statusCode: 200,
  //       fixture: 'filteredQuestionsData.json'
  //     });
  
  //     // Replace '#category' with the actual selector for your category dropdown.
  //     cy.get('#category').select('Sports'); // Assuming "Sports" is one of the options.
      
  //     // Check that the displayed questions belong to the "Sports" category.
  //     // You can assert the questions' category in the mocked response or check the UI.
  //   });
  
  //   it('should display the specified number of questions', () => {
  //     // Mock API response for the specified number of questions.
  //     cy.intercept('GET', 'https://opentdb.com/api.php*amount=10*', {
  //       statusCode: 200,
  //       fixture: 'specifiedQuestionsData.json'
  //     });
  
  //     // Replace '#amount' with the actual selector for your question amount input.
  //     cy.get('#amount').type('10'); // Ask for 10 questions.
      
  //     // Check that the number of displayed questions matches the specified amount.
  //     cy.get('.flashcard').should('have.length', 10);
  //   });
  });
  