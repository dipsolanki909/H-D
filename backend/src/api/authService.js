// Simple localStorage-backed user store for demo/testing purposes
const STORAGE_KEY = 'video_studio_users_v1';

function readUsers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to read users store', e);
    return [];
  }
}

function writeUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export function getUsers() {
  return readUsers();
}

export function findUserByIdentifier(identifier) {
  const users = readUsers();
  return users.find(u => u.username === identifier || u.email === identifier);
}

export function addUser({ username, email, password, name, role = 'user' }) {
  const users = readUsers();
  const exists = users.find(u => u.email === email || u.username === username);
  if (exists) {
    throw new Error('User already exists');
  }
  const user = {
    id: Date.now().toString(),
    username,
    email,
    password, // Plain text for demo only — do NOT use in production
    name,
    role,
    isPremium: false,
  };
  users.push(user);
  writeUsers(users);
  return user;
}

export function authenticate(identifier, password) {
  const user = findUserByIdentifier(identifier);
  if (!user) return null;
  if (user.password !== password) return null;
  // return user object without password
  const { password: _p, ...rest } = user;
  return rest;
}

export function resetUsers() {
  writeUsers([]);
}
