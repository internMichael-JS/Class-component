import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header';
import { beforeEach, describe, expect, test } from 'vitest';

describe('Header component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('Renders search input and search button', () => {
    render(<Header onSearch={() => {}} />);
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  test('Displays previously saved search term from localStorage on mount', () => {
    localStorage.setItem('searchQuery', 'pikachu');
    render(<Header onSearch={() => {}} />);
    expect(screen.getByDisplayValue('pikachu')).toBeInTheDocument();
  });

  test('Shows empty input when no saved term exists', () => {
    render(<Header onSearch={() => {}} />);
    expect(screen.getByPlaceholderText(/search/i)).toHaveValue('');
  });

  test('Updates input value when user types', async () => {
    render(<Header onSearch={() => {}} />);
    const input = screen.getByPlaceholderText(/search/i);
    await userEvent.type(input, 'charizard');
    expect(input).toHaveValue('charizard');
  });
});
