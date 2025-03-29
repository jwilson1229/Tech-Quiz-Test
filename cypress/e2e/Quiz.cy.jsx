import Quiz from "../../client/src/components/Quiz";
import { mount } from 'cypress/react';
import React from "react";


describe("Quiz Component", () => {
    beforeEach(() => {
        mount(<Quiz />);
    });

    it('renders the start quiz button on load', () => {
        cy.get('button').contains("Start Quiz").should('be.visible');
    });

    it("starts quiz upon button click", () => {
        cy.intercept('GET', '/api/questions/random', { fixture: 'questions.json' }).as('getQuestions');

        cy.get('button').contains("Start Quiz").should('exist').click();
        cy.wait('@getQuestions');
        cy.get('h2').should('be.visible');
    });

    it('displays the score when the quiz is completed', () => {
        cy.intercept('GET', '/api/questions/random', { fixture: 'questions.json' }).as('getQuestions');

        cy.get('button').contains('Start Quiz').should('exist').click();
        cy.wait('@getQuestions');

        cy.get('button').each(($btn) => {
            cy.wrap($btn).should('be.visible').click();
        });

        cy.get('h2').contains('Quiz Completed').should('exist');
    });
});
