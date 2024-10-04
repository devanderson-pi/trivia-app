import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import Home from '@/app/page';

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
});
