import { useState } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const loadRazorpayScript = () => {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(true));
      existingScript.addEventListener('error', () => reject(new Error('Failed to load Razorpay SDK.')));
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error('Failed to load Razorpay SDK.'));
    document.body.appendChild(script);
  });
};

export const RazorpayPaymentButton = ({
  amount,
  planId,
  userName,
  userEmail,
  disabled = false,
  className = '',
  onPaymentSuccess,
  onPaymentFailure,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const resolveRazorpayKeyId = async () => {
    const envKeyId = process.env.REACT_APP_RAZORPAY_KEY_ID;
    if (envKeyId) {
      return envKeyId;
    }

    const response = await fetch(`${API_BASE_URL}/payment/config`);
    const data = await response.json();

    if (!response.ok || !data?.success || !data?.data?.keyId) {
      throw new Error('Missing REACT_APP_RAZORPAY_KEY_ID in frontend environment.');
    }

    return data.data.keyId;
  };

  const createOrder = async () => {
    const response = await fetch(`${API_BASE_URL}/payment/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        currency: 'INR',
        notes: {
          planId,
        },
      }),
    });

    const data = await response.json();
    if (!response.ok || !data?.success || !data?.data?.id) {
      throw new Error(data?.message || 'Unable to create payment order.');
    }

    return data.data;
  };

  const verifyPayment = async (paymentResponse) => {
    const response = await fetch(`${API_BASE_URL}/payment/verify-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentResponse),
    });

    const data = await response.json();
    if (!response.ok || !data?.success) {
      throw new Error(data?.message || 'Payment verification failed.');
    }

    return data;
  };

  const handleClick = async () => {
    try {
      if (!window.Razorpay) {
        await loadRazorpayScript();
      }

      const keyId = await resolveRazorpayKeyId();

      setIsProcessing(true);
      const order = await createOrder();

      const options = {
        key: keyId,
        amount: order.amount,
        currency: order.currency,
        name: 'H-D Creatives',
        description: `Subscription: ${planId}`,
        order_id: order.id,
        prefill: {
          name: userName || '',
          email: userEmail || '',
        },
        handler: async (response) => {
          try {
            await verifyPayment(response);
            alert('Payment successful and verified.');
            if (onPaymentSuccess) {
              onPaymentSuccess(response);
            }
          } catch (error) {
            alert(error.message || 'Payment verification failed.');
            if (onPaymentFailure) {
              onPaymentFailure(error);
            }
          } finally {
            setIsProcessing(false);
          }
        },
        modal: {
          ondismiss: () => {
            alert('Payment popup closed before completing payment.');
            if (onPaymentFailure) {
              onPaymentFailure(new Error('Payment cancelled by user.'));
            }
            setIsProcessing(false);
          },
        },
        theme: {
          color: '#0D9488',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on('payment.failed', (response) => {
        const message = response?.error?.description || 'Payment failed. Please try again.';
        alert(message);
        if (onPaymentFailure) {
          onPaymentFailure(new Error(message));
        }
        setIsProcessing(false);
      });

      razorpay.open();
    } catch (error) {
      alert(error.message || 'Unable to initialize payment.');
      if (onPaymentFailure) {
        onPaymentFailure(error);
      }
      setIsProcessing(false);
    }
  };

  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
      disabled={disabled || isProcessing || !amount}
    >
      {isProcessing ? 'Processing...' : `Pay Rs ${amount}`}
    </button>
  );
};
