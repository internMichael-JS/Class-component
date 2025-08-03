import React from 'react';
import './Button.css';

type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
};

const Button = (props: ButtonProps) => {
  const { onClick, children, disabled } = props;
  return (
    <button
      onClick={onClick}
      className={`button ${disabled ? 'disabled' : 'active'}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
