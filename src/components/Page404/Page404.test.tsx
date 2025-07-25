import { beforeEach, describe, expect, test } from 'vitest';
import Page404 from './Page404';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

describe('Page404 component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Page404 />
      </MemoryRouter>
    );
  });
  test('renders the title and text', () => {
    expect(screen.getByText(/404 - Page Not Found/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Oops! The page you’re looking for doesn’t exist or has been moved./i
      )
    ).toBeInTheDocument();
  });

  test('renders the navigation link to search page', () => {
    const navLink = screen.getByRole('link', { name: /Go to Search page/i });
    expect(navLink).toBeInTheDocument();
    expect(navLink).toHaveAttribute('href', '/');
  });
});
