import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import './Layout.css';

export const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Measure footer height and set CSS variable so pages reserve correct bottom space
  useEffect(() => {
    function updateFooterHeight() {
      const footer = document.querySelector('footer');
      if (!footer) return;
      const height = footer.offsetHeight || 240;
      // add a small extra gap (16px)
      document.documentElement.style.setProperty('--footer-height', `${height + 16}px`);
    }

    updateFooterHeight();
    window.addEventListener('resize', updateFooterHeight);
    // update after fonts/images load
    window.addEventListener('load', updateFooterHeight);
    return () => {
      window.removeEventListener('resize', updateFooterHeight);
      window.removeEventListener('load', updateFooterHeight);
    };
  }, []);

  return (
    <div className="layout">
      {/* Do NOT render AdminNavbar here — Admin pages include their own AdminLayout that provides the sidebar.
          This prevents the duplicate/top admin layout while keeping the bottom admin UI unchanged. */}
      {!isAdminRoute && <Header />}
      <main className="layout-main">
        {children}
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
};
