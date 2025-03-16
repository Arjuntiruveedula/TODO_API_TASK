const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  completed: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
