import React from 'react';

const RecentActivityPanel = ({ activities }) => {
  return (
    <section className="cd-section" aria-label="Recent activity panel">
      <div className="cd-section-head">
        <h2>Recent Activity</h2>
      </div>

      <div className="cd-activity-timeline">
        {activities.map((item) => (
          <article className="cd-activity-item" key={item.id}>
            <div className="cd-activity-marker" aria-hidden="true">{item.icon}</div>
            <div className="cd-activity-content">
              <p className="cd-activity-title">{item.title}</p>
              <span className="cd-activity-time">{item.time}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default RecentActivityPanel;
