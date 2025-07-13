import React from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import { fetchPokemonByName } from './api/api';

class App extends React.Component {
  handleSearch = async (name: string) => {
    try {
      const result = await fetchPokemonByName(name);
      this.setState({ pokemon: result, error: null });
      localStorage.setItem('searchQuery', name.trim());
      console.log(result);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unexpected error';
      this.setState({ error: errorMessage, pokemon: null });
      console.error(error);
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
            <Main />
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
