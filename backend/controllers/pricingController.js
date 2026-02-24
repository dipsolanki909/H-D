const plans = [
  { id: 'free', name: 'Free', price: 0 },
  { id: 'pro', name: 'Pro', price: 2999 },
  { id: 'enterprise', name: 'Enterprise', price: null }
];

const getPlans = (_req, res) => {
  return res.status(200).json({ success: true, data: plans });
};

module.exports = {
  getPlans
};
