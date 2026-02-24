import React from 'react';
import { FiBarChart2, FiCpu, FiHardDrive, FiPlayCircle } from 'react-icons/fi';

const monthlyExports = [22, 30, 28, 35, 40, 52, 47, 58, 62, 66, 74, 82];
const projectActivity = [8, 12, 10, 14, 16, 13, 18];
const templateUsage = [45, 30, 15, 10];

const AnalyticsPanel = () => {
  const maxMonthly = Math.max(...monthlyExports);
  const maxActivity = Math.max(...projectActivity);

  const linePoints = monthlyExports
    .map((value, index) => {
      const x = (index / (monthlyExports.length - 1)) * 100;
      const y = 100 - (value / maxMonthly) * 100;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <section className="cd-section cd-analytics" aria-label="Analytics page">
      <div className="cd-section-head">
        <h2>Analytics Overview</h2>
      </div>

      <div className="cd-analytics-summary">
        <article className="cd-analytics-card">
          <span className="cd-analytics-icon"><FiPlayCircle /></span>
          <p>Total Exports</p>
          <h3>1,248</h3>
        </article>
        <article className="cd-analytics-card">
          <span className="cd-analytics-icon"><FiBarChart2 /></span>
          <p>Total Views</p>
          <h3>248K</h3>
        </article>
        <article className="cd-analytics-card">
          <span className="cd-analytics-icon"><FiCpu /></span>
          <p>AI Usage</p>
          <h3>74%</h3>
        </article>
        <article className="cd-analytics-card">
          <span className="cd-analytics-icon"><FiHardDrive /></span>
          <p>Storage Usage</p>
          <h3>62GB</h3>
        </article>
      </div>

      <div className="cd-charts-grid">
        <article className="cd-chart-card">
          <h3>Monthly Exports</h3>
          <svg viewBox="0 0 100 100" className="cd-line-chart" preserveAspectRatio="none">
            <polyline points="0,100 100,100" className="cd-line-base" />
            <polyline points={linePoints} className="cd-line-path" />
          </svg>
        </article>

        <article className="cd-chart-card">
          <h3>Project Activity</h3>
          <div className="cd-bar-chart">
            {projectActivity.map((value, index) => (
              <div key={`${value}-${index}`} className="cd-bar-wrap">
                <span className="cd-bar" style={{ height: `${(value / maxActivity) * 100}%` }} />
              </div>
            ))}
          </div>
        </article>

        <article className="cd-chart-card">
          <h3>Template Usage</h3>
          <div
            className="cd-pie-chart"
            style={{
              background: `conic-gradient(#667eea 0% ${templateUsage[0]}%, #764ba2 ${templateUsage[0]}% ${templateUsage[0] + templateUsage[1]}%, #a78bfa ${templateUsage[0] + templateUsage[1]}% ${templateUsage[0] + templateUsage[1] + templateUsage[2]}%, #c4b5fd ${templateUsage[0] + templateUsage[1] + templateUsage[2]}% 100%)`,
            }}
          >
            <span>Usage</span>
          </div>
          <ul className="cd-pie-legend">
            <li><span className="dot dot-1" /> Intro</li>
            <li><span className="dot dot-2" /> Social</li>
            <li><span className="dot dot-3" /> Promo</li>
            <li><span className="dot dot-4" /> Others</li>
          </ul>
        </article>

        <article className="cd-chart-card">
          <h3>Storage Usage</h3>
          <div className="cd-storage-progress-wrap">
            <div className="cd-storage-progress-track">
              <span className="cd-storage-progress-fill" style={{ width: '62%' }} />
            </div>
            <p>62GB of 100GB used</p>
          </div>
        </article>
      </div>

      <article className="cd-insights-panel">
        <h3>Insights</h3>
        <ul>
          <li><strong>Most Used Template:</strong> Modern Intro Pack</li>
          <li><strong>Peak Editing Day:</strong> Wednesday</li>
          <li><strong>Average Export Time:</strong> 03m 42s</li>
        </ul>
      </article>
    </section>
  );
};

export default AnalyticsPanel;
