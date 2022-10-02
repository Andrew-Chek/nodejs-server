const mongoose = require('mongoose');

const User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    unique: true,
  },
  created_date: {
    type: String,
    required: true,
  }
});

module.exports = {
  User,
};
