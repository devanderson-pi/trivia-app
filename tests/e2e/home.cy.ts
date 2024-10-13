const sampleLatestUserResponses = [
  {
    type: 'multiple',
    difficulty: 'easy',
    category: 'Entertainment: Comics',
    question:
      'What is the alter-ego of the DC comics character &quot;Superman&quot;?',
    correct_answer: 'Clark Kent',
    incorrect_answers: ['Bruce Wayne', 'Arthur Curry', 'John Jones'],
    answers: ['John Jones', 'Arthur Curry', 'Bruce Wayne', 'Clark Kent'],
    selected_answer: 'Clark Kent',
  },
];

describe('Home Page', () => {
  beforeEach(() => cy.visit('/'));

  it('displays the form and handles input validation', () => {
    cy.contains('Trivia Time: Bring It On!').should('be.visible');

    cy.get("input[data-testid='amount']").should('exist').and('be.empty');
    cy.get("button[type='submit']").should('not.exist');

    cy.get("input[data-testid='amount']").type('invalid');
    cy.contains('Must be a whole number').should('be.visible');

    cy.get("input[data-testid='amount']").clear().type('-5');
    cy.contains('Must be a positive number').should('be.visible');

    cy.get("input[data-testid='amount']").clear().type('5');
    cy.get("button[type='button']").should('be.visible');
    cy.get("button[type='submit']").should('be.visible');
  });

  it('submits the form and redirects to /questions', () => {
    cy.get("input[data-testid='amount']").type('5');
    cy.get('form').submit();

    cy.url().should('include', '/questions');

    cy.get('h1').contains('Trivia Questions');
  });

  it('displays a link to view previous quiz results if available', () => {
    window.sessionStorage.setItem(
      'latestUserResponses',
      JSON.stringify({ data: sampleLatestUserResponses, score: 1 })
    );

    cy.reload();

    cy.contains('See results from your last quiz').should('be.visible');
    cy.contains('See results from your last quiz').click();
    cy.url().should('include', '/results');
  });
});
