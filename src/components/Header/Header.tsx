import './Header.css';
import pokemon from '../../assets/pokemon.svg';
import React, { useState } from 'react';
import Button from '../../utils/Button';
import { NavLink } from 'react-router-dom';

type HeaderProps = {
  onSearch: (query: string) => void;
};

const Header = (props: HeaderProps) => {
  const [inputValue, setInputValue] = useState(
    localStorage.getItem('searchQuery') || ''
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  return (
    <div>
      <div className="header-text">
        <div className="logo">
          <img src={pokemon} alt="logo" className="logo-img" />
        </div>
        <h1>Find your pokemon</h1>
        <NavLink to="/about" className="about-button">
          About us
        </NavLink>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          value={inputValue}
          onChange={handleChange}
        />
        <Button onClick={() => props.onSearch(inputValue)}>Search</Button>
      </div>
    </div>
  );
};

export default Header;
