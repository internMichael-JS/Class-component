import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import ErrorBoundary from '../components/common/ErrorBoundary';
import Page404 from '../components/Page404/Page404';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    ),
    errorElement: <Page404 />,
  },
]);
