describe('Results Page', () => {
  const mockResponses = {
    data: [
      {
        category: 'Entertainment: Music',
        correct_answer: 'Eleanor Rigby',
        difficulty: 'medium',
        incorrect_answers: ['Loretta Martin', 'Molly Jones', 'Lady Madonna'],
        question:
          'According to a Beatles song, who kept her face in a jar by the door?',
        answers: [
          'Molly Jones',
          'Loretta Martin',
          'Lady Madonna',
          'Eleanor Rigby',
        ],
        selected_answer: 'Lady Madonna',
      },
      {
        category: 'Entertainment: Music',
        correct_answer: 'Only Built 4 Cuban Linx',
        difficulty: 'medium',
        incorrect_answers: [
          'Shaolin vs Wu-Tang',
          'The Wild',
          'The Lex Diamond Story',
        ],
        question: 'What was Raekwon the Chefs debut solo album?',
        answers: [
          'Only Built 4 Cuban Linx',
          'Shaolin vs Wu-Tang',
          'The Lex Diamond Story',
          'The Wild',
        ],
        selected_answer: 'Only Built 4 Cuban Linx',
      },
    ],
    score: 1,
  };

  beforeEach(() =>
    cy.visit('/results', {
      onBeforeLoad(win) {
        win.sessionStorage.setItem(
          'latestUserResponses',
          JSON.stringify(mockResponses)
        );
      },
    })
  );

  it('should show loading state initially', () => {
    cy.contains('Loading...').should('exist');
  });

  it('should show message when no results are available', () => {
    sessionStorage.removeItem('latestUserResponses');

    cy.contains('No results available.').should('exist');
    cy.contains('Go back to the homepage').should('exist');
  });

  it('should display quiz results when data is available', () => {
    cy.contains('Your score: 1 / 2').should('exist');

    cy.contains(
      'According to a Beatles song, who kept her face in a jar by the door?'
    ).should('exist');
    cy.contains('Incorrect. The correct answer is Eleanor Rigby').should(
      'exist'
    );

    cy.contains('What was Raekwon the Chefs debut solo album?').should('exist');
    cy.contains('Correct! Well done!').should('exist');
  });

  it('should allow the user to retake the quiz', () => {
    cy.contains('Take another quiz').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});
