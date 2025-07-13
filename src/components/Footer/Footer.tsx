import React from 'react';
import './Footer.css';
import Button from '../../utils/Button';
class Footer extends React.Component {
  render() {
    return (
      <div className="footer-container">
        <Button onClick={() => console.log('Error1')}>Error Button</Button>{' '}
      </div>
    );
  }
}

export default Footer;
