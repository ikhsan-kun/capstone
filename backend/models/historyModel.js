const db = require("../config/db");

const createHistory = async (userId, food, kalori, protein, lemak, karbo) => {
  const [result] = await db.execute(
    "INSERT INTO history (user_id, food, kalori, protein, lemak, karbo) VALUES (?, ?, ?, ?, ?, ?)",
    [userId, food, kalori, protein, lemak, karbo]
  );
  return result.insertId;
};

const getUserHistory = async (userId) => {
  const [rows] = await db.execute(
    "SELECT * FROM history WHERE user_id = ? ORDER BY detected_at DESC",
    [userId]
  );
  return rows;
};

module.exports = { createHistory, getUserHistory };