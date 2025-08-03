import { render, screen, fireEvent } from '@testing-library/react';
import ThemeButton from './ThemeButton';
import { AppContext } from '../../app/appContext';
import { beforeEach, describe, expect, test, vi } from 'vitest';

describe('ThemeButton', () => {
  const toggleThemeMock = vi.fn();

  const renderWithContext = (theme: 'light' | 'dark') => {
    render(
      <AppContext.Provider
        value={{
          theme,
          toggleTheme: toggleThemeMock,
          loadPage: vi.fn(),
          handleNext: vi.fn(),
          handlePrevious: vi.fn(),
        }}
      >
        <ThemeButton />
      </AppContext.Provider>
    );
  };

  beforeEach(() => {
    toggleThemeMock.mockClear();
  });

  test('renders moon icon when theme is light', () => {
    renderWithContext('light');
    const icon = screen.getByRole('button').querySelector('svg');
    expect(icon).toHaveAttribute('data-icon', 'moon');
  });

  test('renders sun icon when theme is dark', () => {
    renderWithContext('dark');
    const icon = screen.getByRole('button').querySelector('svg');
    expect(icon).toHaveAttribute('data-icon', 'sun');
  });

  test('calls toggleTheme when clicked', () => {
    renderWithContext('light');
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(toggleThemeMock).toHaveBeenCalledTimes(1);
  });
});
