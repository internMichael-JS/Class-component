import React from 'react';
import './Footer.css';
import Button from '../../utils/Button';
class Footer extends React.Component {
  state = { shouldTrow: false };
  throwError = () => {
    this.setState({ shouldTrow: true });
  };
  render() {
    if (this.state.shouldTrow) {
      throw new Error('Test error when pressing button');
    }
    return (
      <div className="footer-container">
        <Button onClick={this.throwError}>Error Button</Button>
      </div>
    );
  }
}

export default Footer;
