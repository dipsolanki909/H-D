const tools = [
  { id: 'bg-remove', name: 'Background Remover', creditCost: 40 },
  { id: 'subtitle-gen', name: 'AI Subtitle Generator', creditCost: 25 },
  { id: 'script-writer', name: 'AI Script Writer', creditCost: 30 }
];

const getTools = (_req, res) => {
  return res.status(200).json({ success: true, data: tools });
};

const runTool = (req, res) => {
  const { toolId } = req.params;
  return res.status(200).json({
    success: true,
    message: 'AI tool execution started',
    data: { toolId, jobId: `ai-job-${Date.now()}` }
  });
};

const getCredits = (_req, res) => {
  return res.status(200).json({
    success: true,
    data: {
      total: 5000,
      used: 1620,
      remaining: 3380
    }
  });
};

module.exports = {
  getTools,
  runTool,
  getCredits
};
