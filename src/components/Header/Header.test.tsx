import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, test } from 'vitest';
import { renderHeaderWithRouter } from '../../tests-utils/renderHeaderWithRouter';

describe('Header component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('Renders search input and search button', () => {
    renderHeaderWithRouter();
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  test('Displays previously saved search term from localStorage on mount', () => {
    localStorage.setItem('searchQuery', 'pikachu');
    renderHeaderWithRouter();
    expect(screen.getByDisplayValue('pikachu')).toBeInTheDocument();
  });

  test('Shows empty input when no saved term exists', () => {
    renderHeaderWithRouter();
    expect(screen.getByPlaceholderText(/search/i)).toHaveValue('');
  });

  test('Updates input value when user types', async () => {
    renderHeaderWithRouter();
    const input = screen.getByPlaceholderText(/search/i);
    await userEvent.type(input, 'charizard');
    expect(input).toHaveValue('charizard');
  });
});
