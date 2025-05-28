const { createFeedback, getUserFeedback } = require('../models/feedbackModel');

const addFeedback = async (userId, message, rating) => {
  return await createFeedback(userId, message, rating);
};

const fetchUserFeedback = async (userId) => {
  return await getUserFeedback(userId);
};

module.exports = { addFeedback, fetchUserFeedback };
