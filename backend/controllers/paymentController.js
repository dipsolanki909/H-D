let subscriptions = [];

const createPayment = (req, res) => {
  const { amount, plan } = req.body;
  if (!amount || !plan) {
    return res.status(400).json({ success: false, message: 'amount and plan are required' });
  }

  return res.status(201).json({
    success: true,
    message: 'Payment created',
    data: { orderId: `order-${Date.now()}`, amount, plan }
  });
};

const verifyPayment = (req, res) => {
  const { paymentId, signature } = req.body;
  if (!paymentId || !signature) {
    return res.status(400).json({ success: false, message: 'paymentId and signature are required' });
  }
  return res.status(200).json({ success: true, message: 'Payment verified' });
};

const getSubscriptions = (_req, res) => {
  return res.status(200).json({ success: true, data: subscriptions });
};

const updateSubscription = (req, res) => {
  const id = Number(req.params.id);
  const subscription = subscriptions.find((item) => item.id === id);
  if (!subscription) {
    return res.status(404).json({ success: false, message: 'Subscription not found' });
  }

  subscription.plan = req.body.plan || subscription.plan;
  return res.status(200).json({ success: true, message: 'Subscription updated', data: subscription });
};

const cancelSubscription = (req, res) => {
  const id = Number(req.params.id);
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
  createPayment,
  verifyPayment,
  getSubscriptions,
  updateSubscription,
  cancelSubscription,
  getInvoices
};
