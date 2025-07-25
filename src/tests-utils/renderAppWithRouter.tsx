import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';
import type { ReactNode } from 'react';

export const renderWithRouter = (ui?: ReactNode) =>
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={ui || <div>Test outlet</div>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
