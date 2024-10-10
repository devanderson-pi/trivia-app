import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import Results from '@/app/results/page';

vi.mock('next/navigation');

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

describe('Results Page', () => {
  afterEach(() => cleanup());
  beforeEach(() => sessionStorage.clear());

  it('should display a message if no results are found', () => {
    render(<Results />);

    expect(screen.getByText('No results available.')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveTextContent(
      'Go back to the homepage'
    );
  });

  it("should render the page title and user's score", () => {
    sessionStorage.setItem(
      'latestUserResponses',
      JSON.stringify({ data: sampleLatestUserResponses, score: 1 })
    );

    render(<Results />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Quiz Results'
    );
    expect(screen.getByText('Your score: 1 / 1')).toBeInTheDocument();
  });

  it('should render the question with correct details', () => {
    sessionStorage.setItem(
      'latestUserResponses',
      JSON.stringify({ data: sampleLatestUserResponses, score: 1 })
    );

    render(<Results />);

    const formattedQuestion =
      '1. What is the alter-ego of the DC comics character "Superman"?';
    expect(screen.getByText(formattedQuestion)).toBeInTheDocument();

    expect(screen.getByText('Entertainment: Comics')).toBeInTheDocument();
    expect(screen.getByText('easy')).toBeInTheDocument();

    expect(screen.getByText('Correct! Well done!')).toBeInTheDocument();

    sampleLatestUserResponses[0].answers.forEach(answer => {
      expect(screen.getByText(answer)).toBeInTheDocument();
    });
  });
});
