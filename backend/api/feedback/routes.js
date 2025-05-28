const {
  submitFeedbackHandler,
  getUserFeedbackHandler,
} = require('./handler');

module.exports = [
  {
    method: 'POST',
    path: '/feedback',
    handler: submitFeedbackHandler,
    options: {
      auth: 'jwt', // pastikan user login
    },
  },
  {
    method: 'GET',
    path: '/feedback',
    handler: getUserFeedbackHandler,
    options: {
      auth: 'jwt',
    },
  },
];
