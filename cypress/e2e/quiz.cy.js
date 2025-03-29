describe('Tech Quiz', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3001'); 
    });

    it('allows a user to start and complete the quiz', () => {
        cy.intercept('GET', '/api/questions/random', { fixture: 'questions.json' }).as('getQuestions');

        cy.get('button').contains('Start Quiz').click();
        cy.wait('@getQuestions');

        cy.get('h2').should('exist').and('contain', 'Question'); 

        cy.get('button').each(($btn) => {
            cy.wrap($btn).click();
        });

        cy.get('h2').contains('Quiz Completed').should('exist');
        cy.get('.alert-success').should('exist');
    });

    it('allows the user to restart the quiz', () => {
        cy.intercept('GET', '/api/questions/random', { fixture: 'questions.json' }).as('getQuestions');

        cy.get('button').contains('Start Quiz').click();
        cy.wait('@getQuestions');

        cy.get('button').each(($btn) => {
            cy.wrap($btn).click();
        });

        cy.get('button').contains('Take New Quiz').click();
        cy.get('button').contains('Start Quiz').should('exist');
    });
});
  