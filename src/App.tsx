import React from 'react';
import './App.css';
import Footer from './components/Footer/Footer.tsx';
import Header from './components/Header/Header.tsx';
import Main from './components/Main/Main.tsx';
import { fetchPokemonByName } from './api/getOnePokemon.ts';
import { fetchAllPokemonsFromUrl } from './api/getAllPokemons.ts';
import type { OnePokemon, PokemonTypeSlot, State } from './utils/interfaces.ts';

class App extends React.Component {
  state: State = {
    pokemons: [],
    isLoading: false,
    error: null,
    next: null,
    prev: null,
  };

  loadPage = async (url: string) => {
    this.setState({ isLoading: true, error: null });

    try {
      const data = await fetchAllPokemonsFromUrl(url);

      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon: { name: string; url: string }) => {
          const response = await fetch(pokemon.url);
          const details = await response.json();

          return {
            name: details.name,
            id: details.id,
            img: details.sprites.front_default,
            types: details.types
              .map((t: PokemonTypeSlot) => t.type.name)
              .join(', '),
            experience: details.base_experience,
          };
        })
      );

      this.setState({
        pokemons: detailedPokemons,
        next: data.next,
        prev: data.previous,
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
      this.setState({ error: 'Failed to load pokemons', isLoading: false });
    }
  };

  componentDidMount() {
    if (localStorage.getItem('searchQuery')) {
      this.handleSearch(`${localStorage.getItem('searchQuery')}`);
    } else {
      this.loadPage('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
    }
  }

  handleNext = () => {
    if (this.state.next) {
      this.loadPage(this.state.next);
    }
  };

  handlePrevious = () => {
    if (this.state.prev) {
      this.loadPage(this.state.prev);
    }
  };

  mapToPokemonCard = (details: OnePokemon) => ({
    name: details.name,
    id: details.id,
    img: details.sprites.front_default,
    types: details.types.map((t: PokemonTypeSlot) => t.type.name).join(', '),
    experience: details.base_experience,
  });

  handleSearch = async (name: string) => {
    this.setState({ isLoading: true, error: null });

    try {
      const details = await fetchPokemonByName(name);
      console.log(details);
      const pokemonCard = this.mapToPokemonCard(details);

      this.setState({
        pokemons: [pokemonCard],
        next: null,
        prev: null,
        isLoading: false,
      });

      localStorage.setItem('searchQuery', name.trim());
      console.log(details);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unexpected error';

      this.setState({ error: errorMessage, pokemons: [], isLoading: false });
    }
  };

  render() {
    return (
      <div className="app-container">
        <div className="item-container">
          <header>
            <Header onSearch={this.handleSearch} />
          </header>

          <main className="main">
            <Main
              pokemons={this.state.pokemons}
              isLoading={this.state.isLoading}
              error={this.state.error}
              next={this.state.next}
              prev={this.state.prev}
              loadPage={this.loadPage}
              handlePrevious={this.handlePrevious}
              handleNext={this.handleNext}
            />
          </main>

          <footer>
            <Footer />
          </footer>
        </div>
      </div>
    );
  }
}

export default App;
