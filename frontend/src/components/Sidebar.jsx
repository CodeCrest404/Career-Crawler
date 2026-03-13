import React, { useState, useEffect } from 'react';
import styles from './Sidebar.module.css';

const NAV_ITEMS = [
  { icon: '💼', label: 'Job Listings', badge: '1,247', id: 'jobs'      },
  { icon: '🏢', label: 'Companies',    badge: null,    id: 'companies' },
  { icon: '🔖', label: 'Saved',        badge: null,    id: 'saved'     },
];

const SYSTEM_ITEMS = [
  { icon: '⚙️', label: 'Scrapers',  id: 'scrapers'  },
  { icon: '📊', label: 'Analytics', id: 'analytics' },
  { icon: '🔌', label: 'API',       id: 'api'       },
];

export default function Sidebar({ active = 'jobs', onSelect }) {
  const [timeLeft, setTimeLeft] = useState({ h: 3, m: 42 });

  /* Countdown timer — ticks every minute */
  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.m === 0) return { h: prev.h - 1, m: 59 };
        return { ...prev, m: prev.m - 1 };
      });
    }, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <div className={styles.spiderIcon}>🕷️</div>
        CareerCrawler
      </div>

      <nav className={styles.navSection}>
        <div className={styles.navLabel}>Main</div>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`${styles.navItem} ${active === item.id ? styles.activeItem : ''}`}
            onClick={() => onSelect?.(item.id)}
          >
            <span className={styles.navIcon}>{item.icon}</span>
            {item.label}
            {item.badge && (
              <span className={styles.badge}>{item.badge}</span>
            )}
          </button>
        ))}
      </nav>

      <nav className={styles.navSection}>
        <div className={styles.navLabel}>System</div>
        {SYSTEM_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`${styles.navItem} ${active === item.id ? styles.activeItem : ''}`}
            onClick={() => onSelect?.(item.id)}
          >
            <span className={styles.navIcon}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className={styles.bottom}>
        <div className={styles.statusCard}>
          <div className={styles.statusRow}>
            <span className={styles.dotPulse} />
            <span className={styles.statusText}>Crawler Active</span>
          </div>
          <div className={styles.statusSub}>
            Next run in {timeLeft.h}h {String(timeLeft.m).padStart(2, '0')}m
            <br />
            Last: 34 companies ✓
          </div>
        </div>
      </div>
    </aside>
  );
}
