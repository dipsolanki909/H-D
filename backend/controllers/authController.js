const users = [];

const register = (req, res) => {
  const { email, password, fullName } = req.body;

  if (!email || !password || !fullName) {
    return res.status(400).json({ success: false, message: 'email, password, fullName are required' });
  }

  const exists = users.find((item) => item.email === email);
  if (exists) {
    return res.status(400).json({ success: false, message: 'User already exists' });
  }

  const user = {
    id: users.length + 1,
    email,
    fullName,
    role: req.body.role || 'user'
  };

  users.push({ ...user, password });

  return res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: user
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'email and password are required' });
  }

  const user = users.find((item) => item.email === email && item.password === password);
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  return res.status(200).json({
    success: true,
    message: 'Login successful',
    token: `demo-token-${user.id}`
  });
};

const logout = (_req, res) => {
  return res.status(200).json({ success: true, message: 'Logout successful' });
};

const refresh = (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ success: false, message: 'refreshToken is required' });
  }

  return res.status(200).json({
    success: true,
    message: 'Token refreshed',
    token: 'demo-refreshed-token'
  });
};

const me = (_req, res) => {
  return res.status(200).json({
    success: true,
    data: {
      id: 1,
      email: 'demo@dhcreatives.com',
      fullName: 'Demo User',
      role: 'user'
    }
  });
};

const forgotPassword = (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, message: 'email is required' });
  }

  return res.status(200).json({
    success: true,
    message: 'Password reset link sent'
  });
};

const resetPassword = (req, res) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) {
    return res.status(400).json({ success: false, message: 'token and newPassword are required' });
  }

  return res.status(200).json({
    success: true,
    message: 'Password reset successful'
  });
};

module.exports = {
  register,
  login,
  logout,
  refresh,
  me,
  forgotPassword,
  resetPassword
};
