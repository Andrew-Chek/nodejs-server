const mongoose = require('mongoose');

const Credential = mongoose.model('Credential', {
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = {
  Credential,
};
