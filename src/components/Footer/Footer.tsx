import { useState } from 'react';
import './Footer.css';
import Button from '../../utils/Button';

const Footer = () => {
  const [shouldTrow, setShouldTrow] = useState(false);

  const throwError = () => {
    setShouldTrow(true);
  };

  if (shouldTrow) {
    throw new Error('Test error when pressing button');
  }
  return (
    <div className="footer-container">
      <Button onClick={throwError}>Error Button</Button>
    </div>
  );
};

export default Footer;
