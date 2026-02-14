import React, { useEffect } from 'react';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import './Layout.css';

export const Layout = ({ children }) => {
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
      <Header />
      <main className="layout-main">
        {children}
      </main>
      <Footer />
    </div>
  );
};
