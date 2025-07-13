import React from 'react';
import './Button.css';

type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
};

class Button extends React.Component<ButtonProps> {
  render() {
    const { onClick, children, disabled } = this.props;
    return (
      <button
        onClick={onClick}
        className={`button ${disabled ? 'disabled' : 'active'}`}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
}

export default Button;
