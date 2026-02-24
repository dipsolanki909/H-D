import React, { useMemo, useState } from 'react';
import { FiFolder, FiFilm, FiHardDrive, FiZap, FiAward } from 'react-icons/fi';

const ICONS = {
  projects: <FiFolder />,
  videos: <FiFilm />,
  storage: <FiHardDrive />,
  credits: <FiZap />,
  plan: <FiAward />,
};

const StatsCards = ({ stats }) => {
  const [activeStat, setActiveStat] = useState(null);

  const statDetails = useMemo(() => ({
    projects: {
      title: 'Projects Overview',
      items: [
        'Track all active workspace projects in one place.',
        'Monitor draft vs completed progress quickly.',
        'Identify projects that need editing priority today.'
      ]
    },
    videos: {
      title: 'Videos Created Insights',
      items: [
        'Published and draft videos are included in this metric.',
        'Helps you measure monthly content production growth.',
        'Useful for planning upload consistency and campaign goals.'
      ]
    },
    storage: {
      title: 'Storage Usage Details',
      items: [
        'Shows current cloud usage against plan capacity.',
        'Large raw video files and exports consume most storage.',
        'Upgrade plan or clean old assets before reaching limit.'
      ]
    },
    credits: {
      title: 'AI Credits Summary',
      items: [
        'Credits are used for AI tools like subtitles and enhancements.',
        'Remaining balance helps plan upcoming AI-heavy workflows.',
        'Credit cycle resets monthly as per subscribed plan.'
      ]
    },
    plan: {
      title: 'Current Plan Benefits',
      items: [
        'Your active plan defines export quality and feature access.',
        'Includes premium capabilities like advanced AI and 4K exports.',
        'Use this card to validate entitlement before high-end renders.'
      ]
    }
  }), []);

  const selectedDetails = activeStat ? statDetails[activeStat.key] : null;

  return (
    <section className="cd-section" aria-label="Overview stats">
      <div className="cd-overview-grid">
        {stats.map((item) => (
          <article
            key={item.key}
            className="cd-stat-card"
            role="button"
            tabIndex={0}
            style={{ cursor: 'pointer' }}
            onClick={() => setActiveStat(item)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setActiveStat(item);
              }
            }}
          >
            <div className="cd-stat-icon" aria-hidden="true">{ICONS[item.key]}</div>
            <div className="cd-stat-content">
              <p className="cd-stat-label">{item.label}</p>
              <h3 className="cd-stat-value">{item.value}</h3>
              {item.trend && <p className="cd-stat-trend">{item.trend}</p>}
              {typeof item.progress === 'number' && (
                <div className="cd-stat-progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={item.progress}>
                  <span className="cd-stat-progress-fill" style={{ width: `${item.progress}%` }} />
                </div>
              )}
              {item.subtext && <p className="cd-stat-subtext">{item.subtext}</p>}
              <p className="cd-stat-subtext" style={{ marginTop: '6px', fontWeight: 600 }}>Click to view details</p>
            </div>
          </article>
        ))}
      </div>

      {activeStat && (
        <div className="modal-backdrop" onClick={() => setActiveStat(null)}>
          <div className="modal" onClick={(event) => event.stopPropagation()}>
            <h3 style={{ marginBottom: '8px' }}>{activeStat.label}</h3>
            <p style={{ margin: '0 0 12px', color: '#5b6b95', fontWeight: 600 }}>
              {activeStat.value} {activeStat.trend ? `• ${activeStat.trend}` : ''}
            </p>

            <h4 style={{ margin: '0 0 8px', color: '#16224f' }}>{selectedDetails?.title}</h4>
            <ul style={{ margin: '0 0 18px', paddingLeft: '20px', color: '#314278' }}>
              {(selectedDetails?.items || []).map((point) => (
                <li key={point} style={{ marginBottom: '6px' }}>{point}</li>
              ))}
            </ul>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button type="button" className="btn-primary" onClick={() => setActiveStat(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default StatsCards;
