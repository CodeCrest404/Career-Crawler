import React, { useRef } from 'react';
import Navbar from '../components/Navbar';
import JobCard from '../components/JobCard';
import { JOBS, COMPANIES, QUICK_TAGS } from '../data/mockData';
import styles from './HomePage.module.css';

/* ─── Static data for the features grid ─── */
const FEATURES = [
  {
    icon: '🕸️',
    title: 'Smart Crawling',
    desc: 'Handles both static HTML and JS-rendered career pages. Cheerio for the simple stuff, Puppeteer when things get dynamic.',
    bg: 'rgba(124,58,237,0.15)',
    accent: 'var(--accent)',
  },
  {
    icon: '⚡',
    title: 'Auto-Refresh',
    desc: 'node-cron fires every 6 hours. Batches of 5 concurrent scrapers with 2-second delays to stay under the radar.',
    bg: 'rgba(6,182,212,0.12)',
    accent: 'var(--accent2)',
  },
  {
    icon: '🔍',
    title: 'Instant Filter',
    desc: 'Filter by role, experience level, and location across 1,200+ normalised listings from a single API call.',
    bg: 'rgba(245,158,11,0.12)',
    accent: 'var(--accent3)',
  },
  {
    icon: '🗄️',
    title: 'MongoDB Atlas',
    desc: 'All jobs normalised to a clean schema — company, title, location, skills, experience, direct apply link.',
    bg: 'rgba(52,211,153,0.12)',
    accent: '#34D399',
  },
  {
    icon: '🚀',
    title: 'REST API',
    desc: 'Clean endpoints: GET /api/jobs?role=&exp= — plug it into anything.',
    bg: 'rgba(244,114,182,0.12)',
    accent: '#F472B6',
  },
  {
    icon: '📄',
    title: 'Phase 2: Resume AI',
    desc: 'Skill extraction, gap detection, and match scoring against live job requirements. Coming soon.',
    bg: 'rgba(124,58,237,0.12)',
    accent: 'var(--accent)',
  },
];

/* ─── Stats strip data ─── */
const STATS = [
  { num: '30+',   label: 'Companies Crawled', color: '#A78BFA' },
  { num: '1,200+', label: 'Active Listings',   color: '#67E8F9' },
  { num: '6hr',   label: 'Refresh Cycle',      color: '#FCD34D' },
  { num: '0',     label: 'Ads. Ever.',          color: '#34D399' },
];

export default function HomePage({ onNavigateDashboard }) {
  const roleRef     = useRef(null);
  const locationRef = useRef(null);
  const expRef      = useRef(null);

  const handleSearch = () => {
    onNavigateDashboard({
      role:     roleRef.current?.value     || '',
      location: locationRef.current?.value || '',
      exp:      expRef.current?.value      || '',
    });
  };

  /* Duplicate company list for seamless marquee loop */
  const marqueeItems = [...COMPANIES, ...COMPANIES];

  const COMPANY_COLORS = [
    '#7C3AED','#06B6D4','#F59E0B','#34D399','#F472B6',
    '#A78BFA','#FCD34D','#6EE7B7','#7C3AED','#06B6D4',
    '#F59E0B','#34D399',
  ];

  return (
    <div className={styles.page}>
      {/* Background grid texture */}
      <div className={styles.gridBg} aria-hidden />

      {/* Ambient orbs */}
      <div className={styles.orb1} aria-hidden />
      <div className={styles.orb2} aria-hidden />

      {/* ── NAV ── */}
      <Navbar onGetStarted={onNavigateDashboard} />

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.badge}>
          <span className={styles.pulse} />
          Scraping 30+ career pages every 6 hours
        </div>

        <h1 className={styles.h1}>
          One web.<br />
          <span className={styles.gradient}>Every job.</span>
        </h1>

        <p className={styles.sub}>
          CareerCrawler spiders across 30+ company career pages and aggregates
          fresh listings in one searchable dashboard. No more tab-hopping.
        </p>

        {/* Search bar */}
        <div className={styles.searchBox}>
          <div className={styles.field}>
            <SearchIcon />
            <input ref={roleRef} type="text" placeholder="Role, skill, or keyword..." />
          </div>
          <div className={styles.divider} />
          <div className={styles.field}>
            <PinIcon />
            <input ref={locationRef} type="text" placeholder="Location" />
          </div>
          <div className={styles.divider} />
          <div className={styles.field}>
            <BriefcaseIcon />
            <input ref={expRef} type="text" placeholder="Experience" />
          </div>
          <button className={styles.searchBtn} onClick={handleSearch}>
            <SearchIcon stroke="white" />
            Search
          </button>
        </div>

        {/* Quick tags */}
        <div className={styles.quickTags}>
          {QUICK_TAGS.map((tag) => (
            <button
              key={tag}
              className={styles.qTag}
              onClick={() => {
                if (roleRef.current) roleRef.current.value = tag;
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* ── STATS ── */}
      <div className={styles.statsGrid}>
        {STATS.map((s) => (
          <div key={s.label} className={styles.statCard}>
            <div className={styles.statNum} style={{ color: s.color }}>{s.num}</div>
            <div className={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── MARQUEE ── */}
      <div className={styles.marqueeWrap}>
        <p className={styles.marqueeLabel}>Companies we crawl</p>
        <div className={styles.marqueeTrack}>
          {marqueeItems.map((name, i) => (
            <div key={`${name}-${i}`} className={styles.chip}>
              <span
                className={styles.chipDot}
                style={{ background: COMPANY_COLORS[i % COMPANY_COLORS.length] }}
              />
              {name}
            </div>
          ))}
        </div>
      </div>

      {/* ── FEATURES ── */}
      <section className={styles.section}>
        <div className={styles.sectionLabel}>// WHAT IT DOES</div>
        <h2 className={styles.sectionTitle}>Built different.</h2>

        <div className={styles.featuresGrid}>
          {FEATURES.map((f, i) => (
            <div key={f.title} className={styles.featureCard} style={{ '--accent-color': f.accent }}>
              <div className={styles.featureIcon} style={{ background: f.bg }}>
                {f.icon}
              </div>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── LIVE LISTINGS PREVIEW ── */}
      <section className={styles.section} id="jobs">
        <div className={styles.sectionLabel}>// LIVE LISTINGS</div>
        <h2 className={styles.sectionTitle}>Fresh off the crawler.</h2>

        <div className={styles.jobList}>
          {JOBS.slice(0, 4).map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        <div className={styles.viewAllWrap}>
          <button className={styles.viewAllBtn} onClick={onNavigateDashboard}>
            View All 1,247 Jobs →
          </button>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaBox}>
          <div className={styles.ctaGlow} aria-hidden />
          <h2 className={styles.ctaTitle}>
            Stop hunting.<br />Start applying.
          </h2>
          <p className={styles.ctaSub}>
            Everything you need. One place. Updated every 6 hours.
          </p>
          <div className={styles.ctaActions}>
            <button className={styles.btnPrimary} onClick={onNavigateDashboard}>
              Browse All Jobs →
            </button>
            <button className={styles.btnSecondary}>View API Docs</button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className={styles.footer}>
        <p>© 2026 CareerCrawler 🕷️ — Built with Puppeteer, Cheerio &amp; MongoDB</p>
        <div className={styles.footerLinks}>
          <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
          <a href="#">API</a>
          <a href="#">Privacy</a>
        </div>
      </footer>
    </div>
  );
}

/* ─── Inline SVG icons ─── */
function SearchIcon({ stroke = 'currentColor' }) {
  return (
    <svg width="14" height="14" fill="none" stroke={stroke} strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function BriefcaseIcon() {
  return (
    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}
