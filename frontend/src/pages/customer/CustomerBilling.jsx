import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiDownload, FiCreditCard, FiZap } from 'react-icons/fi';
import CustomerDashboardLayout from '../../components/CustomerDashboard/CustomerDashboardLayout';
import './CustomerBilling.css';

const invoices = [
  { id: 'INV-2026-001', date: '23 Feb 2026', amount: '₹1,499', status: 'Paid' },
  { id: 'INV-2026-002', date: '23 Jan 2026', amount: '₹1,499', status: 'Paid' },
  { id: 'INV-2025-012', date: '23 Dec 2025', amount: '₹999', status: 'Pending' },
];

const plans = [
  {
    name: 'Starter',
    price: '₹0/mo',
    features: ['720p Export', 'Basic Templates', 'Community Support'],
  },
  {
    name: 'Pro',
    price: '₹1,499/mo',
    features: ['4K Export', 'All Templates', 'Priority Support', 'AI Tools Pack'],
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: ['Unlimited Exports', 'Team Access', 'Dedicated Manager'],
  },
];

export const CustomerBilling = () => {
  const navigate = useNavigate();

  const handleUpgradePlan = () => {
    navigate('/payment');
  };

  const handleInvoiceDownload = (invoice) => {
    const content = [
      `Invoice ID: ${invoice.id}`,
      `Date: ${invoice.date}`,
      `Amount: ${invoice.amount}`,
      `Status: ${invoice.status}`,
      'Generated from demo billing view'
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${invoice.id}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <CustomerDashboardLayout>
      <div className="customer-billing-page">
        <header className="billing-header glass-card">
          <h1>Subscription & Billing</h1>
          <p>Manage your plan, credits, and payment history in one place.</p>
        </header>

        <section className="glass-card current-plan-card" aria-label="Current plan">
          <div className="plan-head">
            <div>
              <h2>Current Plan: Pro</h2>
              <p>Renewal Date: 23 Mar 2026</p>
            </div>
            <button type="button" className="billing-primary-btn" onClick={handleUpgradePlan}>Upgrade Plan</button>
          </div>

          <ul className="plan-features">
            <li><FiCheckCircle /> 4K exports and unlimited templates</li>
            <li><FiCheckCircle /> Premium AI tools bundle access</li>
            <li><FiCheckCircle /> Priority render queue</li>
            <li><FiCheckCircle /> Priority support</li>
          </ul>
        </section>

        <section className="glass-card credit-meter" aria-label="AI credit usage">
          <div className="section-title-row">
            <h3><FiZap /> AI Credit Usage</h3>
            <span>3,380 / 5,000 remaining</span>
          </div>
          <div className="credit-track">
            <span className="credit-fill" style={{ width: '32.4%' }} />
          </div>
        </section>

        <section className="glass-card billing-history" aria-label="Billing history">
          <div className="section-title-row">
            <h3><FiCreditCard /> Billing History</h3>
          </div>

          <div className="billing-table-wrap">
            <table className="billing-table">
              <thead>
                <tr>
                  <th>Invoice ID</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td>{invoice.id}</td>
                    <td>{invoice.date}</td>
                    <td>{invoice.amount}</td>
                    <td>
                      <span className={`invoice-status ${invoice.status.toLowerCase()}`}>{invoice.status}</span>
                    </td>
                    <td>
                      <button type="button" className="download-btn" onClick={() => handleInvoiceDownload(invoice)}>
                        <FiDownload /> PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="glass-card plan-comparison" aria-label="Plan comparison">
          <div className="section-title-row">
            <h3>Plan Comparison</h3>
          </div>

          <div className="plans-grid">
            {plans.map((plan) => (
              <article className={`plan-card ${plan.featured ? 'featured' : ''}`} key={plan.name}>
                <h4>{plan.name}</h4>
                <p className="plan-price">{plan.price}</p>
                <ul>
                  {plan.features.map((feature) => (
                    <li key={feature}><FiCheckCircle /> {feature}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </div>
    </CustomerDashboardLayout>
  );
};
