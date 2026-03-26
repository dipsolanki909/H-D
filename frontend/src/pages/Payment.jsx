import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppStore } from '../utils/appStore';
import { pricingAPI } from '../api/client';
import { FiCheck, FiArrowRight } from 'react-icons/fi';
import { RazorpayPaymentButton } from '../components/Payment/RazorpayPaymentButton';
import '../components/Payment/Payment.css';

const FALLBACK_PLANS = [
  {
    id: 'per-video',
    name: 'Per Video',
    price: 99,
    currency: 'Rs',
    features: ['Remove watermark', 'HD export', 'One-time payment'],
    period: 'one-time',
    popular: false,
  },
  {
    id: 'monthly',
    name: 'Monthly Plan',
    price: 299,
    currency: 'Rs',
    features: ['Unlimited edits', 'Priority support', 'HD export'],
    period: 'monthly',
    popular: true,
  },
  {
    id: 'yearly',
    name: 'Yearly Plan',
    price: 2999,
    currency: 'Rs',
    features: ['Best value', 'All premium features', 'Priority support'],
    period: 'yearly',
    popular: false,
  },
];

const PAYMENT_METHODS = [
  { id: 'upi', name: 'UPI', icon: '📱', description: 'Google Pay, PhonePe, BHIM' },
  { id: 'card', name: 'Card', icon: '💳', description: 'Credit/Debit Card' },
  { id: 'netbanking', name: 'Net Banking', icon: '🏦', description: 'All major banks' },
];

export const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const store = useAppStore();
  const [plans, setPlans] = useState([]);
  const [plansLoading, setPlansLoading] = useState(true);
  const [plansError, setPlansError] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [paymentError, setPaymentError] = useState('');
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cvv: '',
    expiryDate: '',
    name: '',
  });

  const plan = useMemo(() => plans.find((p) => p.id === selectedPlan), [plans, selectedPlan]);

  useEffect(() => {
    const fetchPlans = async () => {
      setPlansLoading(true);
      setPlansError('');

      try {
        const response = await pricingAPI.getPlans();
        const incoming = Array.isArray(response?.data?.data) ? response.data.data : [];

        const mappedPlans = incoming
          .filter((item) => item?.price !== null && item?.price !== undefined)
          .map((item, index) => ({
            id: String(item.id),
            name: item.name || `Plan ${index + 1}`,
            price: Number(item.price) || 0,
            currency: '₹',
            features: Array.isArray(item.features) && item.features.length > 0
              ? item.features
              : ['Premium access', 'High-quality export', 'Priority processing'],
            period: item.id === 'yearly' ? 'yearly' : item.id === 'monthly' ? 'monthly' : 'one-time',
            popular: item.id === 'pro' || item.id === 'monthly',
          }));

        const usablePlans = mappedPlans.length > 0 ? mappedPlans : FALLBACK_PLANS;
        setPlans(usablePlans);
        setSelectedPlan((prev) => prev || usablePlans[0]?.id || '');
      } catch (error) {
        setPlans(FALLBACK_PLANS);
        setSelectedPlan((prev) => prev || FALLBACK_PLANS[0].id);
        setPlansError('Pricing API unavailable. Using default plans.');
      } finally {
        setPlansLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handlePaymentMethodSelect = (method) => {
    setSelectedMethod(method);
  };

  const handleBillingInfoChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentSuccess = () => {
    if (!plan) {
      return;
    }

    store.setPremium(true, selectedPlan);
    alert(`Payment successful! You have been upgraded to ${plan.name}.`);

    if (location.state?.templateId) {
      navigate('/templates');
      return;
    }

    navigate('/export');
  };

  const handlePaymentFailure = (error) => {
    setPaymentError(error?.message || 'Payment failed. Please try again.');
  };

  return (
    <div className="payment-container">
      <header className="payment-header">
        <button onClick={() => navigate(-1)} className="back-btn">← Back</button>
        <h1>Choose Your Plan</h1>
        <p>Unlock premium features and export quality</p>
      </header>

      <div className="payment-content">
        <div className="main-content">
          {/* Plans Section */}
          <section className="plans-section">
            {plansLoading && <p>Loading plans...</p>}
            {plansError && <p>{plansError}</p>}
            <div className="plans-grid">
              {plans.map(p => (
                <div
                  key={p.id}
                  className={`plan-card ${selectedPlan === p.id ? 'selected' : ''} ${p.popular ? 'popular' : ''}`}
                  onClick={() => setSelectedPlan(p.id)}
                >
                  {p.popular && <span className="popular-badge">Most Popular</span>}

                  <h3>{p.name}</h3>
                  <div className="price">
                    <span className="currency">{p.currency}</span>
                    <span className="amount">{p.price}</span>
                    <span className="period">
                      {p.period === 'one-time' ? 'one-time' : `/${p.period}`}
                    </span>
                  </div>

                  <ul className="features-list">
                    {p.features.map((feature, idx) => (
                      <li key={idx}>
                        <FiCheck size={18} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button className={`btn-select ${selectedPlan === p.id ? 'selected' : ''}`}>
                    {selectedPlan === p.id ? '✓ Selected' : 'Select Plan'}
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Payment Methods */}
          {selectedPlan && (
            <section className="payment-methods-section">
              <h2>Payment Method</h2>
              <div className="methods-grid">
                {PAYMENT_METHODS.map(method => (
                  <button
                    key={method.id}
                    className={`method-card ${selectedMethod === method.id ? 'selected' : ''}`}
                    onClick={() => handlePaymentMethodSelect(method.id)}
                  >
                    <span className="method-icon">{method.icon}</span>
                    <h4>{method.name}</h4>
                    <p>{method.description}</p>
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Billing Information */}
          {selectedMethod === 'card' && (
            <section className="billing-section">
              <h2>Card Details</h2>
              <form className="billing-form">
                <div className="form-group">
                  <label>Cardholder Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={paymentData.name}
                    onChange={handleBillingInfoChange}
                  />
                </div>

                <div className="form-group">
                  <label>Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={paymentData.cardNumber}
                    onChange={handleBillingInfoChange}
                    maxLength="19"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input
                      type="text"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={paymentData.expiryDate}
                      onChange={handleBillingInfoChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input
                      type="password"
                      name="cvv"
                      placeholder="***"
                      value={paymentData.cvv}
                      onChange={handleBillingInfoChange}
                      maxLength="3"
                    />
                  </div>
                </div>
              </form>
            </section>
          )}
        </div>

        <div className="sidebar-content">
          {/* Order Summary */}
          <section className="summary-section">
            <h2>Order Summary</h2>
            <div className="summary-details">
              <div className="summary-row">
                <span>Plan:</span>
                <strong>{plan?.name}</strong>
              </div>
              <div className="summary-row">
                <span>Price:</span>
                <strong>{plan?.currency} {plan?.price}</strong>
              </div>
              <div className="summary-row">
                <span>Tax:</span>
                <strong>{plan?.currency} {Math.round(plan?.price * 0.18)}</strong>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <strong>{plan?.currency} {Math.round(plan?.price * 1.18)}</strong>
              </div>
            </div>
          </section>

          {/* Action Buttons */}
          <div className="payment-actions">
            {paymentError && <p>{paymentError}</p>}
            <RazorpayPaymentButton
              amount={plan ? Math.round(plan.price * 1.18) : 0}
              planId={plan?.id}
              userName={localStorage.getItem('name') || ''}
              userEmail={localStorage.getItem('email') || ''}
              disabled={!selectedMethod || !plan || plansLoading}
              className="btn-primary-large"
              onPaymentSuccess={handlePaymentSuccess}
              onPaymentFailure={handlePaymentFailure}
            />
            {!plansLoading && plan && <FiArrowRight size={20} />}
          </div>

          {/* Security Info */}
          <div className="security-info">
            <p>🔒 Your payment is secure. We don't store card details.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
