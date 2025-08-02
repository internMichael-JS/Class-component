import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { router as appRouter } from './router';

import Page404 from '../components/Page404/Page404';
import ErrorBoundary from '../components/common/ErrorBoundary';
import { Provider } from 'react-redux';
import { store } from '../app/store';

describe('App router', () => {
  test('renders Main component on /', async () => {
    const testRouter = createMemoryRouter(appRouter.routes, {
      initialEntries: ['/'],
    });

    render(
      <Provider store={store}>
        <RouterProvider router={testRouter} />
      </Provider>
    );
    expect(await screen.findByText(/search/i)).toBeInTheDocument();
  });

  test('renders About component on /about', async () => {
    const testRouter = createMemoryRouter(appRouter.routes, {
      initialEntries: ['/about'],
    });

    render(
      <Provider store={store}>
        <RouterProvider router={testRouter} />
      </Provider>
    );
    expect(await screen.findByText(/about this project/i)).toBeInTheDocument();
  });

  test('renders Page404 component on unknown route', async () => {
    const testRouter = createMemoryRouter(appRouter.routes, {
      initialEntries: ['/does-not-exist'],
    });

    render(
      <Provider store={store}>
        <RouterProvider router={testRouter} />
      </Provider>
    );
    expect(await screen.findByText(/page not found/i)).toBeInTheDocument();
  });

  test('renders error boundary if App throws', async () => {
    const Broken = () => {
      throw new Error('Boom!');
    };

    const errorRouter = createMemoryRouter(
      [
        {
          path: '/',
          element: (
            <ErrorBoundary>
              <Broken />
            </ErrorBoundary>
          ),
          errorElement: <Page404 />,
        },
      ],
      {
        initialEntries: ['/'],
      }
    );

    render(<RouterProvider router={errorRouter} />);
    expect(
      await screen.findByText(/something went wrong/i)
    ).toBeInTheDocument();
  });
});
