import React, { useState, useEffect } from 'react';
import { FiCheck, FiX, FiArrowRight } from 'react-icons/fi';
import './Pricing.css';
import { getPricing } from '../api/dataService';

export function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState('monthly');
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    setPlans(getPricing());
  }, []);
  // `plans` now populated from data service; transform to expected shape if needed

  const faqs = [
    {
      question: 'Can I change plans anytime?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately for upgrades, and at the end of billing cycle for downgrades.',
    },
    {
      question: 'Do you offer discounts for annual billing?',
      answer: 'Absolutely! Annual plans come with 2 months free compared to monthly billing. Plus, get an extra 20% off with coupon code ANNUAL20.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for Enterprise plans.',
    },
    {
      question: 'Is there a free trial available?',
      answer: 'Yes! Pro and Premium plans include a 7-day free trial with full feature access. No credit card required to start.',
    },
    {
      question: 'What happens if I exceed storage limits?',
      answer: 'You can add extra storage at ₹400 per 100GB anytime. We\'ll notify you before you reach your limit with options to upgrade.',
    },
    {
      question: 'Do you offer refunds?',
      answer: 'We offer a 30-day money-back guarantee for annual plans, and 7-day refund window for monthly subscriptions, no questions asked.',
    },
  ];

  const USD_TO_INR = 83;

  const formatINR = (value) => {
    if (typeof value !== 'number' || Number.isNaN(value)) return value;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value * USD_TO_INR);
  };

  const priceDisplay = (monthlyPrice, annualPrice) => {
    if (typeof monthlyPrice === 'string') return monthlyPrice.replace(/\$/g, '₹');
    if (billingPeriod === 'monthly') {
      return formatINR(monthlyPrice);
    } else {
      return formatINR(annualPrice);
    }
  };

  const billingCycle = billingPeriod === 'monthly' ? '/month' : '/year';

  return (
    <div className="pricing-page">
      {/* Hero Section */}
      <section className="pricing-hero">
        <div className="hero-blob hero-blob-1"></div>
        <div className="hero-blob hero-blob-2"></div>
        <div className="hero-content">
          <h1>Simple, Transparent Pricing</h1>
          <p>
            Choose the perfect plan for your video creation needs. 
            No hidden fees, cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="billing-toggle">
            <button
              className={`toggle-button ${billingPeriod === 'monthly' ? 'active' : ''}`}
              onClick={() => setBillingPeriod('monthly')}
            >
              Monthly
            </button>
            <button
              className={`toggle-button ${billingPeriod === 'annual' ? 'active' : ''}`}
              onClick={() => setBillingPeriod('annual')}
            >
              Annual
              <span className="save-badge">Save 17%</span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pricing-cards-section">
        <div className="pricing-cards-container">
          {plans.map((plan, idx) => {
            const featuresRaw = Array.isArray(plan.features) ? plan.features : [];
            const features = featuresRaw.map((feature) => {
              if (typeof feature === 'string') {
                return { name: feature, included: true };
              }
              return {
                name: feature?.name || '',
                included: typeof feature?.included === 'boolean' ? feature.included : true,
              };
            }).filter((feature) => feature.name);

            const monthlyPrice = typeof plan.price !== 'undefined' ? plan.price : (plan.monthlyPrice ?? 0);
            const planDescription = plan.description || `${plan.name} plan for video creators`;
            const planCta = plan.cta || `Choose ${plan.name}`;

            return (
              <div key={plan.id || idx} className={`pricing-card ${plan.highlighted ? 'highlighted' : ''}`}>
                {plan.badge && <div className="badge">{plan.badge}</div>}
                <div className="card-header">
                  <h2>{plan.name}</h2>
                  <p className="plan-description">{planDescription}</p>
                  <div className="price">
                    <span className="amount">{priceDisplay(monthlyPrice, plan.annualPrice ?? monthlyPrice)}</span>
                    {typeof monthlyPrice !== 'string' && <span className="cycle">{billingCycle}</span>}
                  </div>
                </div>
                <button className={`cta-button ${plan.highlighted ? 'highlighted' : ''}`}>
                  {planCta}
                  <FiArrowRight />
                </button>
                <div className="features-list">
                  <p className="features-title">Includes:</p>
                  {features.map((feature, fidx) => (
                    <div key={fidx} className={`feature ${feature.included ? 'included' : 'excluded'}`}>
                      {feature.included ? <FiCheck /> : <FiX />}
                      <span>{feature.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="comparison-section">
        <h2>Feature Comparison</h2>
        <p className="section-subtitle">Detailed breakdown of features across all plans</p>
        
        <div className="comparison-table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Starter</th>
                <th>Pro</th>
                <th>Premium</th>
                <th>Enterprise</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="feature-name">Max Projects</td>
                <td>10</td>
                <td>100</td>
                <td>Unlimited</td>
                <td>Unlimited</td>
              </tr>
              <tr>
                <td className="feature-name">Export Quality</td>
                <td>480p</td>
                <td>1080p, 4K</td>
                <td>8K</td>
                <td>8K</td>
              </tr>
              <tr>
                <td className="feature-name">Templates</td>
                <td>100</td>
                <td>1000+</td>
                <td>5000+</td>
                <td>5000+</td>
              </tr>
              <tr>
                <td className="feature-name">Cloud Storage</td>
                <td>5GB</td>
                <td>100GB</td>
                <td>500GB</td>
                <td>Unlimited</td>
              </tr>
              <tr>
                <td className="feature-name">AI Features</td>
                <td><FiX className="no-icon" /></td>
                <td><FiCheck className="yes-icon" /></td>
                <td><FiCheck className="yes-icon" /></td>
                <td><FiCheck className="yes-icon" /></td>
              </tr>
              <tr>
                <td className="feature-name">Batch Processing</td>
                <td><FiX className="no-icon" /></td>
                <td><FiX className="no-icon" /></td>
                <td><FiCheck className="yes-icon" /></td>
                <td><FiCheck className="yes-icon" /></td>
              </tr>
              <tr>
                <td className="feature-name">Team Collaboration</td>
                <td><FiX className="no-icon" /></td>
                <td><FiX className="no-icon" /></td>
                <td>5 members</td>
                <td>Unlimited</td>
              </tr>
              <tr>
                <td className="feature-name">Priority Support</td>
                <td><FiX className="no-icon" /></td>
                <td><FiX className="no-icon" /></td>
                <td><FiCheck className="yes-icon" /></td>
                <td><FiCheck className="yes-icon" /></td>
              </tr>
              <tr>
                <td className="feature-name">API Access</td>
                <td><FiX className="no-icon" /></td>
                <td><FiX className="no-icon" /></td>
                <td><FiX className="no-icon" /></td>
                <td><FiCheck className="yes-icon" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="pricing-faq-section">
        <h2>Frequently Asked Questions</h2>
        <p className="section-subtitle">Everything you need to know about our pricing</p>
        
        <div className="faq-grid">
          {faqs.map((faq, idx) => (
            <div key={idx} className="faq-item">
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <h2>Why Choose VideoStudio?</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">✨</div>
            <h3>No Hidden Fees</h3>
            <p>Transparent pricing with no surprises. What you see is what you pay.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🔄</div>
            <h3>Flexible Plans</h3>
            <p>Switch plans anytime. Upgrade instantly or wait until your billing cycle ends.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">💳</div>
            <h3>Easy Payment</h3>
            <p>Multiple payment options including credit cards, PayPal, and bank transfers.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">📞</div>
            <h3>Great Support</h3>
            <p>Dedicated support team ready to help you succeed at every step.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🎁</div>
            <h3>Free Trial</h3>
            <p>Try Pro & Premium fully free for 7 days. No credit card required.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🔒</div>
            <h3>Money Back</h3>
            <p>30-day refund guarantee on annual plans. Zero risk guarantee.</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <h2>Ready to Create Amazing Videos?</h2>
        <p>Join thousands of creators already using VideoStudio</p>
        <div className="cta-buttons">
          <button className="btn-primary">Start Free Trial</button>
          <button className="btn-secondary">View All Features</button>
        </div>
      </section>
    </div>
  );
}
