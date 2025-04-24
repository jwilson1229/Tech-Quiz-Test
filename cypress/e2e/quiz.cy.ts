describe('Quiz End-to-End Tests', () => {
    beforeEach(() => {

        cy.intercept('GET', '/api/questions/random', { fixture: 'questions.json' }).as('getQuestions');
        cy.visit('/');
    });

    it('should allow user to take a complete quiz', () => {

        cy.contains('Start Quiz').click();
        cy.wait('@getQuestions');

        cy.contains('What is the virtual DOM in React?').should('be.visible');

        cy.get('.btn-primary').first().click();

        cy.contains('What is Express.js?').should('be.visible');

        cy.get('.btn-primary').eq(2).click();

        cy.contains('Quiz Completed').should('be.visible');
        cy.contains('Your score: 2/2').should('be.visible');
    });

    it('should handle incorrect answers properly', () => {

        cy.contains('Start Quiz').click();
        cy.wait('@getQuestions');


        cy.get('.btn-primary').eq(1).click();

        cy.get('.btn-primary').eq(0).click();
        cy.contains('Quiz Completed').should('be.visible');
        cy.contains('Your score: 0/2').should('be.visible');
    });

    it('should allow user to take a new quiz after completion', () => {

        cy.contains('Start Quiz').click();
        cy.wait('@getQuestions');
        cy.get('.btn-primary').first().click();
        cy.get('.btn-primary').first().click();

        cy.contains('Take New Quiz').click();
        cy.wait('@getQuestions');


        cy.contains('What is the virtual DOM in React?').should('be.visible');
    });
});