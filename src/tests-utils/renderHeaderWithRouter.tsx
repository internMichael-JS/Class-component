import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import Header from '../components/Header/Header';

export function renderHeaderWithRouter() {
  return render(
    <MemoryRouter>
      <Header onSearch={() => {}} />
    </MemoryRouter>
  );
}
