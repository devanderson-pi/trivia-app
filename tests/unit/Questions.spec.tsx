import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import Questions from '@/app/questions/page';

vi.mock('next/navigation');

const sampleTriviaData = [
  {
    type: 'multiple',
    difficulty: 'easy',
    category: 'Entertainment: Comics',
    question:
      'What is the alter-ego of the DC comics character &quot;Superman&quot;?',
    correct_answer: 'Clark Kent',
    incorrect_answers: ['Bruce Wayne', 'Arthur Curry', 'John Jones'],
    answers: ['John Jones', 'Arthur Curry', 'Bruce Wayne', 'Clark Kent'],
    selected_answer: '',
  },
];

describe('', () => {
  afterEach(() => cleanup());
  beforeEach(() => sessionStorage.clear());

  it('should render no questions available message', () => {
    render(<Questions />);

    expect(screen.getByText('No questions available.')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveTextContent(
      'Go back to the homepage'
    );
  });

  it('should render questions if triviaData is available', () => {
    sessionStorage.setItem('triviaData', JSON.stringify(sampleTriviaData));

    render(<Questions />);

    expect(screen.getByText('Trivia Questions')).toBeInTheDocument();
    expect(
      screen.getByText(
        '1. What is the alter-ego of the DC comics character "Superman"?'
      )
    ).toBeInTheDocument();
  });

  it('should display error message if no answer is selected', async () => {
    sessionStorage.setItem('triviaData', JSON.stringify(sampleTriviaData));

    render(<Questions />);

    screen.getByRole('button').click();

    await waitFor(() => {
      expect(screen.getByText('Please select an answer')).toBeInTheDocument();
    });
  });
});
