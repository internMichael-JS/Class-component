import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import { describe, test, expect } from 'vitest';

describe('Footer component', () => {
  test('render the link', () => {
    render(<Footer />);

    expect(screen.getByText(/Developer/i)).toBeInTheDocument();
  });
});
