import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppStore } from '../utils/appStore';
import { useAuth } from '../context/AuthContext';
import { FiCheck, FiArrowRight } from 'react-icons/fi';
import '../components/Payment/Payment.css';

const PLANS = [
  {
    id: 'per-video',
    name: 'Per Video',
    price: 99,
    currency: '₹',
    features: [
      'Remove watermark',
      'HD (1080p) export',
      'MP4 & WebM',
      'Download & share',
      'Valid for 30 days',
    ],
    period: 'one-time',
  },
  {
    id: 'monthly',
    name: 'Monthly Plan',
    price: 299,
    currency: '₹',
    features: [
      'Unlimited videos',
      'Full HD (1080p) export',
      '4K ready',
      'All templates',
      'Priority support',
      'Auto-renew monthly',
    ],
    period: 'monthly',
    popular: true,
  },
  {
    id: 'yearly',
    name: 'Yearly Plan',
    price: 2999,
    currency: '₹',
    features: [
      'All monthly features',
      'Save 17% off monthly',
      'Lifetime updates',
      'Exclusive templates',
      'Email support',
      'Annual billing',
    ],
    period: 'yearly',
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
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cvv: '',
    expiryDate: '',
    name: '',
  });

  const plan = PLANS.find(p => p.id === selectedPlan);

  const handlePaymentMethodSelect = (method) => {
    setSelectedMethod(method);
  };

  const handleBillingInfoChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({ ...prev, [name]: value }));
  };

  const handlePayment = async () => {
    if (!selectedMethod) {
      alert('Please select a payment method');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Update premium status
      store.setPremium(true, selectedPlan);

      // Update user role (in real app, this would be done on backend)
      alert(`✅ Payment successful! You've been upgraded to ${plan.name}`);

      // Redirect based on where they came from
      if (location.state?.templateId) {
        navigate('/templates');
      } else {
        navigate('/export');
      }
    } catch (error) {
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="payment-container">
      <header className="payment-header">
        <button onClick={() => navigate(-1)} className="back-btn">← Back</button>
        <h1>Choose Your Plan</h1>
        <p>Unlock premium features and export quality</p>
      </header>

      <div className="payment-content">
        {/* Plans Section */}
        <section className="plans-section">
          <div className="plans-grid">
            {PLANS.map(p => (
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
          <button
            className="btn-primary-large"
            onClick={handlePayment}
            disabled={!selectedMethod || isProcessing}
          >
            {isProcessing ? 'Processing...' : `Pay ${plan?.currency} ${Math.round(plan?.price * 1.18)}`}
            {!isProcessing && <FiArrowRight size={20} />}
          </button>
        </div>

        {/* Security Info */}
        <div className="security-info">
          <p>🔒 Your payment is secure. We don't store card details.</p>
        </div>
      </div>
    </div>
  );
};
