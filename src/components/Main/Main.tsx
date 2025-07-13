import React from 'react';
import Loader from './Loader/Loader';
import './Main.css';

class Main extends React.Component {
  render() {
    return (
      <div className="main-container">
        <Loader />
      </div>
    );
  }
}

export default Main;
