const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

const auth = {
  register: async (request, h) => {
    const { email, username, password } = request.payload;

    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (email, username, password) VALUES (?, ?, ?)';
    
    try {
      await db.query(query, [email, username, hashedPassword]);
      return h.response({ message: 'User registered successfully' }).code(201);
    } catch (error) {
      return h.response({ error: 'User registration fyailed' }).code(500);
    }
  },

  login: async (request, h) => {
    const { email, password } = request.payload;
    const query = 'SELECT * FROM users WHERE email = ?';

    try {
      const [user] = await db.query(query, [email]);

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return h.response({ error: 'Invalid email or password' }).code(401);
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return { token };
    } catch (error) {
      return h.response({ error: 'Login failed' }).code(500);
    }
  }
};

function validateUserRegistration(payload) {
  if (!payload.email || typeof payload.email !== 'string' || !payload.email.includes('@')) {
    return 'Email harus diisi dengan format yang benar';
  }
  if (!payload.username || typeof payload.username !== 'string' || payload.username.length < 3) {
    return 'Username harus diisi minimal 3 karakter';
  }
  if (!payload.password || typeof payload.password !== 'string' || payload.password.length < 6) {
    return 'Password harus diisi minimal 6 karakter';
  }
  return null;
}

function validateUserLogin(payload) {
  if (!payload.email || typeof payload.email !== 'string' || !payload.email.includes('@')) {
    return 'Email harus diisi dengan format yang benar';
  }
  if (!payload.password || typeof payload.password !== 'string') {
    return 'Password harus diisi';
  }
  return null;
}

module.exports = {
  auth,
  validateUserRegistration,
  validateUserLogin,
};