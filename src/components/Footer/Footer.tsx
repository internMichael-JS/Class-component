import React from 'react';
import './Footer.css';
import Button from '../../utils/Button';
class Footer extends React.Component {
  throwError = () => {
    throw new Error('Test error when pressing button');
  };
  render() {
    return (
      <div className="footer-container">
        <Button onClick={this.throwError}>Error Button</Button>
      </div>
    );
  }
}

export default Footer;
