import React, { useState } from 'react';
import './styles/global.css';
import HomePage      from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  const [page,    setPage]    = useState('home');   // 'home' | 'dashboard'
  const [filters, setFilters] = useState({});

  const goToDashboard = (f = {}) => {
    setFilters(f);
    setPage('dashboard');
  };

  const goToHome = () => setPage('home');

  if (page === 'dashboard') {
    return (
      <DashboardPage
        initialFilters={filters}
        onNavigateHome={goToHome}
      />
    );
  }

  return (
    <HomePage onNavigateDashboard={goToDashboard} />
  );
}
