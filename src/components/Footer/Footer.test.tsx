import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Footer from './Footer';
import ErrorBoundary from '../common/ErrorBoundary';
import { describe, test, expect, vi } from 'vitest';

describe('Footer component', () => {
  test('renders button', () => {
    render(<Footer />);
    expect(
      screen.getByRole('button', { name: /error button/i })
    ).toBeInTheDocument();
  });

  test('throws error when button is clicked and is caught by ErrorBoundary', async () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>
    );

    await userEvent.click(
      screen.getByRole('button', { name: /error button/i })
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    consoleErrorSpy.mockRestore();
  });
});
