const db = require("../config/db");

const getAllFeedbackWithUser = async () => {
  const [rows] = await db.execute(`
    SELECT 
      f.id AS feedback_id,
      f.message,
      f.rating,
      f.created_at,
      u.username
    FROM feedback f
    JOIN users u ON f.user_id = u.id
    ORDER BY f.created_at DESC
  `);
  return rows;
};

const createFeedback = async (userId, message, rating) => {
  const [result] = await db.execute(
    "INSERT INTO feedback (user_id, message, rating) VALUES (?, ?, ?)",
    [userId, message, rating]
  );
  return result.insertId;
};

const getUserFeedback = async (userId) => {
  const [rows] = await db.execute(
    "SELECT * FROM feedback WHERE user_id = ? ORDER BY created_at DESC",
    [userId]
  );
  return rows;
};

module.exports = { createFeedback, getUserFeedback, getAllFeedbackWithUser };
