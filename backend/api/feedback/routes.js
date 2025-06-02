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
      auth: 'jwt', 
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
  {
    method: 'GET',
    path: '/admin/feedback',
    handler: getAllFeedbackAdminHandler,
    options: {
      auth: 'jwt',
    },
  },
];
