import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../Header.module.css';

const HeaderNav: React.FC = () => {
  return (
    <nav className={styles.nav}>
      <Link to="/">Home</Link>
      <Link to="/tasks">Tasks</Link>
      <Link to="/about">About</Link>
    </nav>
  );
};

export default HeaderNav;