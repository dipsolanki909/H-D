import React, { useEffect, useRef, useState } from 'react';
import { getPricing, addPricing, updatePricing, deletePricing } from '../../api/dataService';
import { FiBarChart2, FiCheckCircle, FiCreditCard, FiEdit, FiHardDrive, FiPlus, FiTrash, FiTrendingDown, FiTrendingUp, FiZap } from 'react-icons/fi';
import AdminLayout from '../../components/Admin/AdminLayout';
import '../../components/Admin/Admin.css';

export const AdminPricing = () => {
  const [plans, setPlans] = useState([]);
  const [editing, setEditing] = useState(null);
  const [formResetKey, setFormResetKey] = useState(0);
  const formSectionRef = useRef(null);

  useEffect(() => { setPlans(getPricing()); }, []);

  const openAdd = () => {
    setEditing(null);
    setFormResetKey((prev) => prev + 1);
    setTimeout(() => {
      formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  };
  const openEdit = (plan) => setEditing(plan);

  const handleDelete = (id) => {
    if (!window.confirm('Delete this plan?')) return;
    deletePricing(id);
    setPlans(getPricing());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const parsedFeatures = (form.features.value || '')
      .split('\n')
      .map((entry) => entry.trim())
      .filter(Boolean);

    const plan = {
      name: form.name.value,
      monthlyPrice: Number(form.monthlyPrice.value || 0),
      annualPrice: Number(form.annualPrice.value || 0),
      features: parsedFeatures,
      aiCreditLimit: Number(form.aiCreditLimit.value || 0),
      storageLimit: form.storageLimit.value,
      price: Number(form.monthlyPrice.value || 0),
    };

    if (editing) updatePricing(editing.id, plan); else addPricing(plan);
    setPlans(getPricing());
    setEditing(null);
    form.reset();
  };

  const normalizedPlans = plans.map((plan) => ({
    ...plan,
    monthlyPrice: Number(plan.monthlyPrice ?? plan.price ?? 0),
    annualPrice: Number(plan.annualPrice ?? (Number(plan.price ?? 0) * 10)),
    aiCreditLimit: Number(plan.aiCreditLimit ?? (plan.name?.toLowerCase() === 'free' ? 200 : plan.name?.toLowerCase() === 'basic' ? 1200 : 5000)),
    storageLimit: plan.storageLimit || (plan.name?.toLowerCase() === 'free' ? '5 GB' : plan.name?.toLowerCase() === 'basic' ? '100 GB' : '1 TB'),
  }));

  const mockRevenue = [
    { month: 'Jan', amount: 128000 },
    { month: 'Feb', amount: 141000 },
    { month: 'Mar', amount: 152000 },
    { month: 'Apr', amount: 164000 },
    { month: 'May', amount: 171000 },
    { month: 'Jun', amount: 189000 },
  ];

  const peakRevenue = Math.max(...mockRevenue.map((entry) => entry.amount));
  const activeSubscriptions = 2784;
  const churnRate = 3.1;

  return (
    <AdminLayout>
      <section className="admin-plan-page">
        <header className="admin-plan-header">
          <div>
            <h1>Plan Management</h1>
            <p>Create, update and monitor subscription plans for D &amp; H Creatives.</p>
          </div>
          <button className="admin-plan-add-btn" onClick={openAdd}>
            <FiPlus /> Add New Plan
          </button>
        </header>

        <article className="admin-plan-section">
          <div className="admin-plan-title-row">
            <h2>Existing Plans</h2>
            <span>{normalizedPlans.length} plans configured</span>
          </div>

          <div className="admin-plan-cards-grid">
            {normalizedPlans.map((plan) => (
              <div className="admin-plan-card" key={plan.id}>
                <div className="admin-plan-card-top">
                  <h3>{plan.name}</h3>
                  <p>₹{plan.monthlyPrice.toLocaleString()} <small>/month</small></p>
                </div>

                <div className="admin-plan-meta">
                  <div><FiCreditCard /> Annual: ₹{plan.annualPrice.toLocaleString()}</div>
                  <div><FiZap /> AI Credits: {plan.aiCreditLimit.toLocaleString()}</div>
                  <div><FiHardDrive /> Storage: {plan.storageLimit}</div>
                </div>

                <ul>
                  {(plan.features || []).map((feature, index) => (
                    <li key={`${plan.id}-f-${index}`}><FiCheckCircle /> {feature}</li>
                  ))}
                </ul>

                <div className="admin-plan-actions">
                  <button type="button" className="btn-ghost" onClick={() => openEdit(plan)}><FiEdit /> Edit</button>
                  <button type="button" className="btn-danger" onClick={() => handleDelete(plan.id)}><FiTrash /> Delete</button>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article ref={formSectionRef} className="admin-plan-section admin-plan-form-wrap">
          <div className="admin-plan-title-row">
            <h2>{editing ? 'Edit Plan' : 'Add New Plan'}</h2>
            <span>Plan configuration</span>
          </div>

          <form onSubmit={handleSubmit} className="admin-plan-form" key={`${editing?.id || 'new-plan'}-${formResetKey}`}>
            <label>
              Plan name
              <input name="name" defaultValue={editing?.name || ''} placeholder="e.g. Pro Plus" required />
            </label>

            <label>
              Monthly price
              <input name="monthlyPrice" type="number" step="0.01" min="0" defaultValue={editing?.monthlyPrice ?? editing?.price ?? 0} required />
            </label>

            <label>
              Annual price
              <input name="annualPrice" type="number" step="0.01" min="0" defaultValue={editing?.annualPrice ?? ((editing?.monthlyPrice ?? editing?.price ?? 0) * 10)} required />
            </label>

            <label>
              Features list
              <textarea name="features" rows={4} defaultValue={(editing?.features || []).join('\n')} placeholder="One feature per line" />
            </label>

            <label>
              AI credit limit
              <input name="aiCreditLimit" type="number" min="0" defaultValue={editing?.aiCreditLimit ?? 0} required />
            </label>

            <label>
              Storage limit
              <input name="storageLimit" defaultValue={editing?.storageLimit || ''} placeholder="e.g. 500 GB" required />
            </label>

            <div className="admin-plan-form-actions">
              {editing && (
                <button type="button" className="btn-ghost" onClick={openAdd}>Cancel Edit</button>
              )}
              <button type="submit" className="btn-primary">{editing ? 'Update Plan' : 'Create Plan'}</button>
            </div>
          </form>
        </article>

        <article className="admin-plan-section">
          <div className="admin-plan-title-row">
            <h2>Revenue Analytics</h2>
            <span>Subscription performance</span>
          </div>

          <div className="admin-revenue-grid">
            <div className="admin-revenue-chart-card">
              <h3><FiBarChart2 /> Monthly Revenue Chart</h3>
              <div className="admin-revenue-bars">
                {mockRevenue.map((entry) => (
                  <div className="admin-revenue-bar-item" key={entry.month}>
                    <div
                      className="admin-revenue-bar"
                      style={{ height: `${Math.max(18, Math.round((entry.amount / peakRevenue) * 100))}%` }}
                      title={`₹${entry.amount.toLocaleString()}`}
                    />
                    <span>{entry.month}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="admin-revenue-metrics">
              <div className="admin-revenue-metric-card">
                <p>Active Subscriptions Count</p>
                <h4>{activeSubscriptions.toLocaleString()}</h4>
                <span><FiTrendingUp /> +6.8% from last month</span>
              </div>

              <div className="admin-revenue-metric-card danger">
                <p>Churn Rate</p>
                <h4>{churnRate}%</h4>
                <span><FiTrendingDown /> -0.4% from last month</span>
              </div>
            </div>
          </div>
        </article>
      </section>
    </AdminLayout>
  );
};
