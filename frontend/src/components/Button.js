import React from 'react';

const Button = ({ children, variant = 'primary', onClick }) => {
  const className = `btn-${variant}`;
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;