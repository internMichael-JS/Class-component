import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import LikeWindow from './LikeWindow';

import * as downloadUtils from '../../utils/dowloadLikesPokemons';
import { describe, expect, test, vi } from 'vitest';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);
const mockDownload = vi.spyOn(downloadUtils, 'downloadLikesPokemonsV');

const liked = [
  {
    id: 1,
    name: 'pikachu',
    types: 'electric',
    experience: 112,
    img: 'https://example.com/pikachu.png',
  },
];

describe('LikeWindow component', () => {
  test('not displayed if window is hidden', () => {
    const store = mockStore({
      like: { window: false, pokemons: liked },
    });

    render(
      <Provider store={store}>
        <LikeWindow />
      </Provider>
    );

    expect(screen.queryByText(/Save:/)).not.toBeInTheDocument();
  });

  test('displays a window with buttons', () => {
    const store = mockStore({
      like: { window: true, pokemons: liked },
    });

    render(
      <Provider store={store}>
        <LikeWindow />
      </Provider>
    );

    expect(screen.getByText(/Save: 1/)).toBeInTheDocument();
    expect(screen.getByText(/Download/)).toBeInTheDocument();
    expect(screen.getByText(/Unselect all/)).toBeInTheDocument();
  });

  test('calls downloadLikesPokemons when clicking on Download', () => {
    const store = mockStore({
      like: { window: true, pokemons: liked },
    });

    mockDownload.mockImplementation(() => {});

    render(
      <Provider store={store}>
        <LikeWindow />
      </Provider>
    );

    fireEvent.click(screen.getByText(/Download/));
    expect(mockDownload).toHaveBeenCalledWith(liked);
  });
});
