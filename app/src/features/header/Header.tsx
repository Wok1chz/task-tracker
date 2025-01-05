import React from 'react';
import styles from './Header.module.css';
import { HeaderProps } from './types/headerTypes';

const Header: React.FC<HeaderProps> = ({ username }) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <h1 className={styles.headerTitle}>Task Tracker</h1>
        <div className={styles.userInfo}>
          <span className={styles.greeting}>Hello, {username}!</span>
        </div>
      </div>
    </header>
  );
};

export default Header;