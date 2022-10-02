const mongoose = require('mongoose');

const Error = mongoose.model('Error', {
  message: {
    type: String,
    required: true,
  },
});

module.exports = {
  Error,
};