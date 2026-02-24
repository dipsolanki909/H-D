import React from 'react';

const SubscriptionSection = ({ plan, nextRenewal, onUpgrade, onBilling }) => {
  return (
    <section className="cd-section" aria-label="Subscription and billing">
      <div className="cd-section-head">
        <h2>Subscription & Billing</h2>
      </div>

      <div className="cd-subscription-card">
        <div className="cd-subscription-meta">
          <p className="cd-subscription-label">Current Plan</p>
          <span className="cd-plan-badge">{plan}</span>
          <p className="cd-renewal">Next renewal: {nextRenewal}</p>
        </div>

        <div className="cd-subscription-actions">
          <button type="button" className="cd-btn cd-btn-primary" onClick={onUpgrade}>Upgrade Plan</button>
          <button type="button" className="cd-btn cd-btn-ghost" onClick={onBilling}>Billing History</button>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionSection;
