describe('Trivia Questions Page', () => {
  const mockTriviaData = [
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
      selected_answer: '',
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
      selected_answer: '',
    },
  ];

  beforeEach(() => {
    cy.visit('/questions', {
      onBeforeLoad(win) {
        win.sessionStorage.setItem(
          'triviaData',
          JSON.stringify(mockTriviaData)
        );
      },
    });
  });

  it('should show loading state initially', () => {
    cy.contains('Loading...').should('exist');
  });

  it('should show message when no results are available', () => {
    sessionStorage.removeItem('triviaData');

    cy.contains('No questions available.').should('exist');
    cy.contains('Go back to the homepage').should('exist');
  });

  it('should display trivia questions', () => {
    cy.get('h1').contains('Trivia Questions');

    mockTriviaData.forEach(question => {
      cy.get('legend').should('exist').contains(question.question);
    });

    cy.get('form').within(() => {
      cy.get("input[type='radio']").should(
        'have.length',
        mockTriviaData.length * 4
      );
    });
  });

  it('should allow selecting answers and submit', () => {
    cy.get("input[id='question-0-answer-Lady Madonna']").click();
    cy.get("input[id='question-1-answer-Only Built 4 Cuban Linx']").click();

    cy.get("button[type='submit']").click();

    cy.url().should('include', '/results');
  });

  it('should show validation errors if no answer is selected', () => {
    cy.get("button[type='submit']").click();

    cy.contains('Please select an answer').should('exist');
  });
});
