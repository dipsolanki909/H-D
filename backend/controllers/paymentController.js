const Razorpay = require('razorpay');
const crypto = require('crypto');

let subscriptions = [];

const getRazorpayConfig = () => {
  const keyId = (process.env.RAZORPAY_KEY_ID || process.env.key_id || '').trim().replace(/,+$/, '');
  const keySecret = (process.env.RAZORPAY_KEY_SECRET || process.env.key_secret || '').trim();

  return {
    keyId,
    keySecret,
    isConfigured: Boolean(keyId && keySecret)
  };
};

const getRazorpayClient = () => {
  const { keyId, keySecret, isConfigured } = getRazorpayConfig();
  if (!isConfigured) {
    return null;
  }

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret
  });
};

const createOrder = async (req, res) => {
  try {
    const { isConfigured } = getRazorpayConfig();
    if (!isConfigured) {
      return res.status(500).json({
        success: false,
        message: 'Razorpay is not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in environment variables.'
      });
    }

    const { amount, currency = 'INR', notes = {} } = req.body;
    const amountNumber = Number(amount);

    if (!Number.isFinite(amountNumber) || amountNumber <= 0) {
      return res.status(400).json({
        success: false,
        message: 'amount must be a positive number'
      });
    }

    const razorpay = getRazorpayClient();
    const order = await razorpay.orders.create({
      // Razorpay expects amount in the smallest currency unit (paise for INR)
      amount: Math.round(amountNumber * 100),
      currency,
      receipt: `rcpt_${Date.now()}`,
      notes
    });

    return res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to create Razorpay order'
    });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { keySecret, isConfigured } = getRazorpayConfig();
    if (!isConfigured) {
      return res.status(500).json({
        success: false,
        message: 'Razorpay is not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in environment variables.'
      });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'razorpay_order_id, razorpay_payment_id and razorpay_signature are required'
      });
    }

    const payload = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(payload)
      .digest('hex');

    const expectedBuffer = Buffer.from(expectedSignature, 'utf8');
    const receivedBuffer = Buffer.from(String(razorpay_signature), 'utf8');

    if (expectedBuffer.length !== receivedBuffer.length) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment signature'
      });
    }

    const isValid = crypto.timingSafeEqual(expectedBuffer, receivedBuffer);

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment signature'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      data: {
        razorpay_order_id,
        razorpay_payment_id
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to verify payment'
    });
  }
};

const getPublicConfig = (_req, res) => {
  const { keyId, isConfigured } = getRazorpayConfig();

  if (!isConfigured) {
    return res.status(500).json({
      success: false,
      message: 'Razorpay is not configured on server.'
    });
  }

  return res.status(200).json({
    success: true,
    data: {
      keyId
    }
  });
};

// Backward-compatible alias used in existing code paths.
const createPayment = createOrder;

const getSubscriptions = (_req, res) => {
  return res.status(200).json({ success: true, data: subscriptions });
};

const updateSubscription = (req, res) => {
  const id = req.params.id;
  const subscription = subscriptions.find((item) => item.id === id);
  if (!subscription) {
    return res.status(404).json({ success: false, message: 'Subscription not found' });
  }

  subscription.plan = req.body.plan || subscription.plan;
  return res.status(200).json({ success: true, message: 'Subscription updated', data: subscription });
};

const cancelSubscription = (req, res) => {
  const id = req.params.id;
  const index = subscriptions.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Subscription not found' });
  }
  subscriptions.splice(index, 1);
  return res.status(200).json({ success: true, message: 'Subscription cancelled' });
};

const getInvoices = (_req, res) => {
  return res.status(200).json({
    success: true,
    data: [
      { id: 'INV-1001', amount: 2999, status: 'Paid', date: new Date().toISOString() }
    ]
  });
};

module.exports = {
  getPublicConfig,
  createOrder,
  createPayment,
  verifyPayment,
  getSubscriptions,
  updateSubscription,
  cancelSubscription,
  getInvoices
};
