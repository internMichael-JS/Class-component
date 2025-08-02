import { MemoryRouter, Routes, Route } from 'react-router-dom';
import App from '../App';
import type { ReactNode } from 'react';
import { renderWithStore } from './renderWithStore';

export const renderWithRouter = (ui?: ReactNode) =>
  renderWithStore(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={ui || <div>Test outlet</div>} />
        </Route>
      </Routes>
    </MemoryRouter>,
    {
      load: {
        pokemons: [],
        isLoading: false,
        error: null,
        next: null,
        prev: null,
      },
    }
  );
