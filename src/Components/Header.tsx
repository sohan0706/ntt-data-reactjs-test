import React, { FC } from 'react';

interface HeaderProps {
  title: string;
}

const Header: FC<HeaderProps> = ({ title }) => {
  return (
    <div className='header'>
      <h4>{title}</h4>
    </div>
  );
};

export default Header;