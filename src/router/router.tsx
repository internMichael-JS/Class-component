import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import ErrorBoundary from '../components/common/ErrorBoundary';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    ),
    errorElement: <div>Failed to load Pokemons</div>,
  },
]);
