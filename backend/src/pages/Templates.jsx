import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlay, FiDownload, FiFilter, FiLock, FiSearch } from 'react-icons/fi';
import './Templates.css';
import { getTemplates } from '../api/dataService';

// Now reading templates from dataService (localStorage)

const CATEGORIES = [
  'All',
  'YouTube',
  'Instagram Reels',
  'Wedding',
  'Birthday',
  'Business Promo',
  'Education',
];

export const Templates = () => {
  const navigate = useNavigate();
  const [templatesData, setTemplatesData] = useState([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [preview, setPreview] = useState(null);

  useEffect(() => setTemplatesData(getTemplates()), []);

  const categories = React.useMemo(() => {
    const s = new Set(['All']);
    templatesData.forEach(t => s.add(t.category || 'Uncategorized'));
    return Array.from(s);
  }, [templatesData]);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return templatesData.filter(t => {
      if (category !== 'All' && t.category !== category) return false;
      if (!q) return true;
      return (
        (t.name || '').toLowerCase().includes(q) ||
        (t.description || '').toLowerCase().includes(q) ||
        (t.category || '').toLowerCase().includes(q)
      );
    });
  }, [templatesData, query, category]);

  const onUse = (t) => {
    if (t.type === 'premium') return navigate('/payment');
    navigate('/editor', { state: { templateId: t.id } });
  };

  return (
    <div className="templates-page modern">
      <header className="tp-header">
        <div className="tp-hero">
          <div className="tp-hero-left">
            <h1>Create stunning videos from templates</h1>
            <p className="subtitle">Professionally-designed templates for every use — social, promo, events and more.</p>

            <div className="search-row">
              <div className="search-input-wrap">
                <FiSearch className="search-icon" />
                <input
                  aria-label="Search templates"
                  className="search-input"
                  placeholder="Search templates, categories or keywords"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                />
              </div>

              <div className="cta-actions">
                <button className="btn-outline" onClick={() => { setQuery(''); setCategory('All'); }}>Reset</button>
                <button className="btn-primary" onClick={() => navigate('/upload')}>Start from scratch</button>
              </div>
            </div>

            <nav className="category-tabs" role="tablist" aria-label="Template categories">
              {categories.map(cat => (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={category === cat}
                  className={`tab ${category === cat ? 'active' : ''}`}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </nav>
          </div>

          <div className="tp-hero-right">
            <div className="hero-card">
              <div className="hero-img" />
              <div className="hero-stats">
                <div><strong>24</strong><span>Featured</span></div>
                <div><strong>100+</strong><span>Templates</span></div>
                <div><strong>Free + Premium</strong><span>Options</span></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="tp-main">
        <section className="grid-wrap">
          {filtered.length === 0 ? (
            <div className="no-results-card">
              <h3>No templates match your search</h3>
              <p>Try different keywords or clear filters.</p>
              <button className="btn-primary" onClick={() => { setQuery(''); setCategory('All'); }}>Show all templates</button>
            </div>
          ) : (
            <div className="templates-grid">
              {filtered.map(t => (
                <article key={t.id} className="template-card" aria-label={t.name}>
                  <div className="media-wrap">
                    {t.image ? (
                      <img src={t.image} alt={t.name} className="thumb" />
                    ) : (
                      <div className="thumb-fallback">{t.name.charAt(0)}</div>
                    )}

                    {t.type === 'premium' && (
                      <div className="lock-overlay" title="Premium template"><FiLock /></div>
                    )}

                    <button className="preview-circle" onClick={() => setPreview(t)} aria-label={`Preview ${t.name}`}>
                      <FiPlay />
                    </button>
                  </div>

                  <div className="card-body">
                    <div className="meta-row">
                      <div className="title">{t.name}</div>
                      <div className={`badge ${t.type}`}>{t.type === 'free' ? 'Free' : 'Premium'}</div>
                    </div>
                    <div className="sub">{t.category} • {t.duration}</div>
                    <p className="desc">{t.description}</p>
                  </div>

                  <div className="card-actions">
                    <button className="btn-ghost" onClick={() => setPreview(t)}><FiPlay /> Preview</button>
                    <button className={`btn-cta ${t.type === 'premium' ? 'locked' : ''}`} onClick={() => onUse(t)}>
                      <FiDownload /> {t.type === 'premium' ? 'Upgrade' : 'Use template'}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      {preview && (
        <div className="preview-modal" role="dialog" aria-modal="true">
          <div className="preview-card">
            <header>
              <h3>{preview.name}</h3>
              <button className="close" onClick={() => setPreview(null)}>✕</button>
            </header>
            <div className="preview-content">
              {preview.image ? <img src={preview.image} alt={preview.name} /> : <div className="preview-fallback">No preview</div>}
              <div className="preview-meta">
                <p><strong>Category:</strong> {preview.category}</p>
                <p><strong>Duration:</strong> {preview.duration}</p>
                <p>{preview.description}</p>
              </div>
            </div>
            <footer>
              <button className="btn-ghost" onClick={() => setPreview(null)}>Close</button>
              <button className="btn-primary" onClick={() => { setPreview(null); onUse(preview); }}>{preview.type === 'premium' ? 'Upgrade' : 'Use template'}</button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};
