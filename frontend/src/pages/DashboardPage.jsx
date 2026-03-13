import React, { useState, useMemo } from 'react';
import Sidebar from '../components/Sidebar';
import JobCard from '../components/JobCard';
import { JOBS, CATEGORIES, LOCATIONS, EXPERIENCE } from '../data/mockData';
import styles from './DashboardPage.module.css';

const STATS = [
  { icon: '💼', num: '1,247', label: 'Active Jobs',   color: '#A78BFA', bg: 'rgba(124,58,237,0.15)' },
  { icon: '🏢', num: '34',    label: 'Companies',     color: '#67E8F9', bg: 'rgba(6,182,212,0.12)'  },
  { icon: '🕒', num: '3:42',  label: 'Next Scrape',   color: '#6EE7B7', bg: 'rgba(52,211,153,0.12)' },
  { icon: '✨', num: '2m 18s', label: 'Last Run Time', color: '#FCD34D', bg: 'rgba(245,158,11,0.12)' },
];

export default function DashboardPage({ initialFilters = {}, onNavigateHome }) {
  const [activeNav,    setActiveNav]    = useState('jobs');
  const [search,       setSearch]       = useState(initialFilters.role     || '');
  const [location,     setLocation]     = useState(initialFilters.location || 'All Locations');
  const [experience,   setExperience]   = useState(initialFilters.exp      || 'Experience: All');
  const [category,     setCategory]     = useState('All');
  const [sortBy,       setSortBy]       = useState('Newest');
  const [isScraping,   setIsScraping]   = useState(false);
  const [scrapeMsg,    setScrapeMsg]    = useState('');

  /* ─── Filtered jobs ─── */
  const filtered = useMemo(() => {
    return JOBS.filter((job) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.skills.some((s) => s.toLowerCase().includes(q));

      const matchLocation =
        location === 'All Locations' ||
        job.location.toLowerCase() === location.toLowerCase();

      const matchCategory =
        category === 'All' ||
        job.title.toLowerCase().includes(category.toLowerCase()) ||
        job.skills.some((s) => s.toLowerCase().includes(category.toLowerCase()));

      return matchSearch && matchLocation && matchCategory;
    });
  }, [search, location, category]);

  /* ─── Manual scrape trigger ─── */
  const handleScrape = () => {
    setIsScraping(true);
    setScrapeMsg('Scraping in progress…');
    setTimeout(() => {
      setIsScraping(false);
      setScrapeMsg('✓ Scrape complete — 34 companies updated');
      setTimeout(() => setScrapeMsg(''), 4000);
    }, 2500);
  };

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <Sidebar active={activeNav} onSelect={setActiveNav} />

      {/* Main content */}
      <div className={styles.main}>
        {/* Top bar */}
        <header className={styles.topbar}>
          <button className={styles.backBtn} onClick={onNavigateHome} title="Back to home">
            ← Home
          </button>

          <div className={styles.searchWrap}>
            <svg width="14" height="14" fill="none" stroke="var(--muted)" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search roles, skills, companies…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className={styles.selectWrap}>
            <select
              className={styles.select}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              {LOCATIONS.map((l) => <option key={l}>{l}</option>)}
            </select>
            <span className={styles.chevron}>▾</span>
          </div>

          <div className={styles.selectWrap}>
            <select
              className={styles.select}
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            >
              {EXPERIENCE.map((e) => <option key={e}>{e}</option>)}
            </select>
            <span className={styles.chevron}>▾</span>
          </div>

          <button
            className={`${styles.scrapeBtn} ${isScraping ? styles.scraping : ''}`}
            onClick={handleScrape}
            disabled={isScraping}
          >
            {isScraping ? '⏳ Scraping…' : '⚡ Run Scraper'}
          </button>
        </header>

        {/* Scrape message banner */}
        {scrapeMsg && (
          <div className={styles.scrapeBanner}>{scrapeMsg}</div>
        )}

        {/* Content */}
        <div className={styles.content}>
          {/* Stat strip */}
          <div className={styles.statStrip}>
            {STATS.map((s) => (
              <div key={s.label} className={styles.statTile}>
                <div className={styles.statIcon} style={{ background: s.bg }}>{s.icon}</div>
                <div>
                  <div className={styles.statNum} style={{ color: s.color }}>{s.num}</div>
                  <div className={styles.statLabel}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Category pills + sort */}
          <div className={styles.filterRow}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`${styles.pill} ${category === cat ? styles.pillOn : ''}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
            <div className={styles.sortGroup}>
              <button
                className={`${styles.sortChip} ${sortBy === 'Newest' ? styles.sortActive : ''}`}
                onClick={() => setSortBy('Newest')}
              >
                🗂 Newest
              </button>
              <button
                className={`${styles.sortChip} ${sortBy === 'Experience' ? styles.sortActive : ''}`}
                onClick={() => setSortBy('Experience')}
              >
                🏷 Experience
              </button>
            </div>
          </div>

          {/* List header */}
          <div className={styles.listHeader}>
            <span className={styles.listCount}>
              <strong>{filtered.length.toLocaleString()}</strong> jobs found
            </span>
          </div>

          {/* Job list */}
          {filtered.length > 0 ? (
            <div className={styles.jobList}>
              {filtered.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className={styles.empty}>
              <span>🕸️</span>
              <p>No jobs found. Try adjusting your filters.</p>
            </div>
          )}

          {/* Pagination */}
          <div className={styles.pagination}>
            <button className={styles.pageBtn}>←</button>
            {[1, 2, 3].map((n) => (
              <button key={n} className={`${styles.pageBtn} ${n === 1 ? styles.pageBtnActive : ''}`}>
                {n}
              </button>
            ))}
            <span className={styles.pageDots}>…</span>
            <button className={styles.pageBtn}>47</button>
            <button className={styles.pageBtn}>→</button>
          </div>
        </div>
      </div>
    </div>
  );
}
