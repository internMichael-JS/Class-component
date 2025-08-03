import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import Header from '../components/Header/Header';
import { AppContext } from '../app/appContext';
import { mockContext } from './mockContext';

export function renderHeaderWithRouter() {
  return render(
    <MemoryRouter>
      <AppContext value={mockContext}>
        <Header onSearch={() => {}} />
      </AppContext>
    </MemoryRouter>
  );
}
