import React from 'react';
import styles from './Sidebar.module.css'; // Импортируем стили

interface SidebarProps {
  username: string;
}

const Sidebar: React.FC<SidebarProps> = ({ username }) => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <h2 className={styles.title}>Menu</h2>
      </div>
      <div className={styles.sidebarContent}>
        <ul className={styles.menuList}>
          <li className={styles.menuItem}>Dashboard</li>
          <li className={styles.menuItem}>Tasks</li>
          <li className={styles.menuItem}>Projects</li>
          <li className={styles.menuItem}>Reports</li>
          <li className={styles.menuItem}>Settings</li>
        </ul>
      </div>
      <div className={styles.sidebarFooter}>
        <span className={styles.userName}>Hello, {username}</span>
      </div>
    </aside>
  );
};

export default Sidebar;