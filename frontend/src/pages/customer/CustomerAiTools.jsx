import React, { useMemo } from 'react';
import CustomerDashboardLayout from '../../components/CustomerDashboard/CustomerDashboardLayout';
import {
  FiImage,
  FiMessageSquare,
  FiEdit3,
  FiCamera,
  FiMic,
  FiPlay,
  FiClock,
} from 'react-icons/fi';
import './CustomerAiTools.css';

const tools = [
  {
    id: 'bg-remove',
    title: 'Background Remover',
    description: 'Remove and replace backgrounds instantly with studio-quality edges.',
    credits: 40,
    icon: <FiImage />,
  },
  {
    id: 'subtitle-gen',
    title: 'AI Subtitle Generator',
    description: 'Generate accurate subtitles with automatic timing and styling.',
    credits: 25,
    icon: <FiMessageSquare />,
  },
  {
    id: 'script-writer',
    title: 'AI Script Writer',
    description: 'Generate engaging script ideas tailored to your video goal.',
    credits: 30,
    icon: <FiEdit3 />,
  },
  {
    id: 'thumbnail-gen',
    title: 'AI Thumbnail Generator',
    description: 'Create click-worthy thumbnail variations for higher reach.',
    credits: 20,
    icon: <FiCamera />,
  },
  {
    id: 'voice-over',
    title: 'AI Voice Over',
    description: 'Convert script to natural voice-over with multilingual accents.',
    credits: 35,
    icon: <FiMic />,
  },
];

const usageHistory = [
  { id: 1, tool: 'AI Subtitle Generator', action: 'Used for Wedding Reel', credits: '-25', time: 'Today, 10:35 AM' },
  { id: 2, tool: 'Background Remover', action: 'Used for Product Promo', credits: '-40', time: 'Yesterday, 06:14 PM' },
  { id: 3, tool: 'AI Thumbnail Generator', action: 'Generated 3 thumbnails', credits: '-20', time: 'Yesterday, 01:08 PM' },
  { id: 4, tool: 'AI Voice Over', action: 'Narration in English', credits: '-35', time: '2 days ago' },
];

export const CustomerAiTools = () => {
  const creditStats = useMemo(() => {
    const totalCredits = 5000;
    const usedCredits = 1620;
    const remainingCredits = totalCredits - usedCredits;
    const usagePercent = Math.round((usedCredits / totalCredits) * 100);
    return { totalCredits, usedCredits, remainingCredits, usagePercent };
  }, []);

  const handleStartTool = (tool) => {
    window.alert(`${tool.title} started successfully. ${tool.credits} credits will be used after completion.`);
  };

  return (
    <CustomerDashboardLayout>
      <div className="customer-ai-tools-page">
        <header className="ai-page-header glass-card">
          <div>
            <h1>AI Tools Hub</h1>
            <p>Boost your editing workflow with smart AI-powered creative tools.</p>
          </div>
        </header>

        <section className="ai-credits-card glass-card" aria-label="AI credit usage">
          <div className="ai-credits-top">
            <h2>AI Credit Usage</h2>
            <span className="credits-pill">{creditStats.remainingCredits} credits left</span>
          </div>

          <div className="ai-progress-wrap">
            <div className="ai-progress-track">
              <span className="ai-progress-fill" style={{ width: `${creditStats.usagePercent}%` }} />
            </div>
            <div className="ai-progress-meta">
              <span>{creditStats.usedCredits} used</span>
              <span>{creditStats.totalCredits} total</span>
            </div>
          </div>
        </section>

        <section className="ai-tools-grid" aria-label="AI tools">
          {tools.map((tool, index) => (
            <article className="ai-tool-card glass-card" key={tool.id} style={{ animationDelay: `${index * 70}ms` }}>
              <div className="tool-icon">{tool.icon}</div>
              <h3>{tool.title}</h3>
              <p>{tool.description}</p>
              <div className="tool-card-footer">
                <span className="tool-credit-cost">{tool.credits} Credits</span>
                <button type="button" className="start-btn" onClick={() => handleStartTool(tool)}>
                  <FiPlay /> Start
                </button>
              </div>
            </article>
          ))}
        </section>

        <section className="usage-history glass-card" aria-label="Usage history">
          <div className="history-head">
            <h2>Usage History</h2>
          </div>

          <div className="history-list">
            {usageHistory.map((item) => (
              <article className="history-item" key={item.id}>
                <div className="history-icon"><FiClock /></div>
                <div className="history-content">
                  <h4>{item.tool}</h4>
                  <p>{item.action}</p>
                </div>
                <div className="history-meta">
                  <span className="history-credits">{item.credits}</span>
                  <small>{item.time}</small>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </CustomerDashboardLayout>
  );
};
