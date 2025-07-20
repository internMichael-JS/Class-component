import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loader from './Loader';
import { describe, expect, test } from 'vitest';

describe('Loader component', () => {
  test('renders spinner and text', () => {
    render(<Loader />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('has proper aria attributes for accessibility', () => {
    render(<Loader />);
    const loader = screen.getByText(/loading/i).closest('.loader-wrapper');
    expect(loader).toHaveAttribute('aria-label', 'Loading...');
    expect(loader).toHaveAttribute('role', 'status');
  });
});
