import { render, screen } from '@testing-library/react';
import { describe, expect, vi, test } from 'vitest';
import { AppContext, useAppContext } from './appContext';
import type { AppContextProps } from '../utils/interfaces';

const mockContext: AppContextProps = {
  pokemons: [],
  isLoading: false,
  error: null,
  next: null,
  prev: null,
  loadPage: vi.fn(),
  handleNext: vi.fn(),
  handlePrevious: vi.fn(),
};
const TestComponent = () => {
  const context = useAppContext();
  return (
    <>
      <div>{context.isLoading ? 'Loading' : 'Not Loading'}</div>
      <div>{context.error ? 'Error' : 'No Error'}</div>
    </>
  );
};

describe('AppContext', () => {
  test('renders with provided context values', () => {
    render(
      <AppContext.Provider value={mockContext}>
        <TestComponent />
      </AppContext.Provider>
    );

    expect(screen.getByText('Not Loading')).toBeInTheDocument();
    expect(screen.getByText('No Error')).toBeInTheDocument();
  });

  test('throws error when used outside provider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow(
      'useAppContext must be used within AppProvider'
    );

    spy.mockRestore();
  });
});
