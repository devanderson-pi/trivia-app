import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import Home from '@/app/page';

vi.mock('next/navigation');

describe('Home Page', () => {
  afterEach(() => cleanup());

  it('should render the page title', () => {
    render(<Home />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Trivia Time: Bring It On!'
    );
  });

  it('should render the page description', () => {
    render(<Home />);

    expect(
      screen.getByText(
        "Choose how many questions you want and let's see how you do!"
      )
    ).toBeInTheDocument();
  });

  it('should render the number of questions input field', () => {
    render(<Home />);

    expect(screen.getByTestId('amount')).toBeInTheDocument();
  });

  it('should not display error messages initially', () => {
    render(<Home />);

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('should not render the cancel button initially', () => {
    render(<Home />);

    expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
  });

  it('should not render the submit button initially', () => {
    render(<Home />);

    expect(screen.queryByText('Get Trivia Questions')).not.toBeInTheDocument();
  });

  it('should not render the results link if sessionStorage is empty', () => {
    render(<Home />);

    expect(
      screen.queryByText('See results from your last quiz')
    ).not.toBeInTheDocument();
  });

  it('should render the results link if sessionStorage contains quiz results', () => {
    sessionStorage.setItem(
      'latestUserResponses',
      JSON.stringify({ data: [], score: 0 })
    );

    render(<Home />);

    expect(
      screen.getByText('See results from your last quiz')
    ).toBeInTheDocument();
  });
});
