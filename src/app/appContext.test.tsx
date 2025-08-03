import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { AppContext, useAppContext } from './appContext';
import type { AppContextProps } from '../utils/interfaces';

const mockContext: AppContextProps = {
  theme: 'light',
  toggleTheme: vi.fn(),
  loadPage: vi.fn(),
  handleNext: vi.fn(),
  handlePrevious: vi.fn(),
};

const TestComponent = () => {
  const context = useAppContext();
  return (
    <>
      <div>Theme: {context.theme}</div>
      <button onClick={context.toggleTheme}>Toggle</button>
      <button onClick={context.handleNext}>Next</button>
      <button onClick={context.handlePrevious}>Prev</button>
    </>
  );
};

describe('AppContext (updated)', () => {
  test('renders correctly with provided context', () => {
    render(
      <AppContext.Provider value={mockContext}>
        <TestComponent />
      </AppContext.Provider>
    );

    expect(screen.getByText(/Theme: light/)).toBeInTheDocument();
  });

  test('throws error when used outside AppProvider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow(
      'useAppContext must be used within AppProvider'
    );

    spy.mockRestore();
  });
});
