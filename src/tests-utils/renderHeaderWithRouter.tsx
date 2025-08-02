import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import Header from '../components/Header/Header';
import { Provider } from 'react-redux';
import { store } from '../app/store';

export function renderHeaderWithRouter() {
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <Header onSearch={() => {}} />
      </MemoryRouter>
    </Provider>
  );
}
