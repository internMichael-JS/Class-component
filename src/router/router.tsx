import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import ErrorBoundary from '../components/common/ErrorBoundary';
import Page404 from '../components/Page404/Page404';
import About from '../components/About/About';
import Main from '../components/Main/Main';
import { MemoizedPokemonList } from '../components/Main/PokemonList/PokemonList';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    ),
    errorElement: <Page404 />,
    children: [
      {
        path: '/',
        element: <Main />,
        children: [
          { index: true, element: <MemoizedPokemonList /> },
          {
            path: '/pokemon/:id',
            element: <MemoizedPokemonList />,
          },
        ],
      },
      { path: '/about', element: <About /> },
    ],
  },
]);
