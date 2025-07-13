import './Header.css';
import pokemon from '../../assets/pokemon.svg';
import React from 'react';

type HeaderProps = {
  onSearch: (query: string) => void;
};
type HeaderState = {
  inputValue: string;
};

class Header extends React.Component<HeaderProps> {
  state: HeaderState = {
    inputValue: '',
  };
  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.target.value });
  };
  render() {
    return (
      <div>
        <div className="header-text">
          <div className="logo">
            <img src={pokemon} alt="logo" className="logo-img" />
          </div>
          <h1>Find your pokemon</h1>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
            value={this.state.inputValue}
            onChange={this.handleChange}
          />
          <button
            onClick={() => this.props.onSearch(this.state.inputValue)}
            className="search-button"
          >
            Search
          </button>
        </div>
      </div>
    );
  }
}

export default Header;
