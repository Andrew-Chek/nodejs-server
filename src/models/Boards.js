const mongoose = require('mongoose');

const Board = mongoose.model('Board', {
  name: {
    type: String,
    required: true,
  },
  description: {
    type: Number,
    required: true,
  },
  assigned_to: {
    type: String,
    required: true,
  },
  created_date: {
    type: String,
    required: true,
  }
});

module.exports = {
  Board,
};