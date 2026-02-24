const submitInquiry = (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, message: 'name, email, subject, message are required' });
  }

  return res.status(201).json({
    success: true,
    message: 'Inquiry submitted successfully'
  });
};

module.exports = {
  submitInquiry
};
