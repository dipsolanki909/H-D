const getOverview = (_req, res) => {
  return res.status(200).json({
    success: true,
    data: {
      totalExports: 1248,
      totalViews: 248000,
      aiUsagePercent: 74,
      storageUsedGB: 62
    }
  });
};

const getUsageHistory = (_req, res) => {
  return res.status(200).json({ success: true, data: [] });
};

module.exports = {
  getOverview,
  getUsageHistory
};
