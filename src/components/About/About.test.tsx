import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import About from './About';
import { beforeEach, describe, expect, test } from 'vitest';
import { AppContext } from '../../app/appContext';
import { mockContext } from '../../tests-utils/mockContext';

describe('About component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <AppContext value={mockContext}>
          <About />
        </AppContext>
      </MemoryRouter>
    );
  });

  test('renders the main title', () => {
    expect(screen.getByText(/About This Project/i)).toBeInTheDocument();
  });

  test('renders the project description section', () => {
    expect(screen.getByText(/Project Description/i)).toBeInTheDocument();
    expect(
      screen.getByText(/This project is a Pokemon search app/i)
    ).toBeInTheDocument();
  });

  test('renders the course link', () => {
    const link = screen.getByRole('link', {
      name: /RS School React 2025 Course/i,
    });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
  });

  test('renders the developer section and image', () => {
    expect(screen.getByText(/Developer/)).toBeInTheDocument();
    expect(
      screen.getByText(/Hi! My name is Michael, I am a front-end developer/i)
    ).toBeInTheDocument();
  });

  test('renders GitHub link', () => {
    const githubLink = screen.getByRole('link', {
      name: /github.com\/internMichael-JS/i,
    });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/internMichael-JS'
    );
  });

  test('renders the navigation link to search page', () => {
    const navLink = screen.getByRole('link', { name: /Go to Search page/i });
    expect(navLink).toBeInTheDocument();
    expect(navLink).toHaveAttribute('href', '/');
  });
});
