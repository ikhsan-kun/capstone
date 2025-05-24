const db = require('../config/db');

const createUser = async (email, username, password) => {
  const [result] = await db.execute(
    'INSERT INTO users (email, username, password) VALUES (?, ?, ?)',
    [email, username, password]
  );
  return result.insertId;
};

const findUserByEmail = async (email) => {
  const [rows] = await db.execute(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );
  return rows[0];
};
