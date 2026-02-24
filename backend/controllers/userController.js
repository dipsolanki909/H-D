
let users = [
  { id: 1, name: "John" },
  { id: 2, name: "Sara" }
];

// GET ALL
const getUsers = (req, res) => {
  res.status(200).json({ success: true, data: users });
};

// GET BY ID
const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  res.status(200).json({ success: true, data: user });
};

// CREATE
const createUser = (req, res) => {
  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    name: req.body.name
  };

  users.push(newUser);

  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: newUser
  });
};

// UPDATE
const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  user.name = req.body.name;

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: user
  });
};

// DELETE
const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  users.splice(index, 1);

  res.status(200).json({
    success: true,
    message: "User deleted successfully"
  });
};

// CURRENT USER (ME)
const getMe = (_req, res) => {
  return res.status(200).json({
    success: true,
    data: {
      id: 1,
      fullName: 'Demo User',
      email: 'demo@dhcreatives.com',
      notifications: {
        productUpdates: true,
        billingAlerts: true,
        weeklyReport: false,
        exportFinished: true
      }
    }
  });
};

const updateMe = (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    data: req.body
  });
};

const updateMyPassword = (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ success: false, message: 'currentPassword and newPassword are required' });
  }

  return res.status(200).json({ success: true, message: 'Password changed successfully' });
};

const updateMyNotifications = (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Notification preferences updated',
    data: req.body
  });
};

const deleteMe = (_req, res) => {
  return res.status(200).json({ success: true, message: 'Account deleted successfully' });
};

const getFavoriteTemplates = (_req, res) => {
  return res.status(200).json({ success: true, data: [] });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getMe,
  updateMe,
  updateMyPassword,
  updateMyNotifications,
  deleteMe,
  getFavoriteTemplates
};