import React from 'react';
import styles from './Navbar.module.css';

export default function Navbar({ onGetStarted }) {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <div className={styles.spiderIcon}>🕷️</div>
        CareerCrawler <span className={styles.version}>/ v1.0</span>
      </div>

      <ul className={styles.links}>
        <li><a href="#jobs">Jobs</a></li>
        <li><a href="#companies">Companies</a></li>
        <li><a href="#api">API</a></li>
        <li><a href="#docs">Docs</a></li>
      </ul>

      <button className={styles.btn} onClick={onGetStarted}>
        Get Started →
      </button>
    </nav>
  );
}
