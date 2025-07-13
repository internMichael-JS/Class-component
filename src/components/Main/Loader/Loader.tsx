import React from 'react';
import './Loader.css';

class Loader extends React.Component {
  render() {
    return (
      <div className="loader-wrapper">
        <div className="spinner-ring" />
        <div className="loader-text">Loading...</div>
      </div>
    );
  }
}

export default Loader;
