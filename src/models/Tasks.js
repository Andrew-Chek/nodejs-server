const mongoose = require('mongoose');

const Task = mongoose.model('Task', {
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['To do', 'In progress', 'Done']
  },
  isArchived: {
    type: Boolean,
    required: true,
  },
  comments: {
    type: [
      {
        title: String,
        message: String,
        created_date: String,
      }
    ]
  },
  board_id: {
    type: String,
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
    Task,
};