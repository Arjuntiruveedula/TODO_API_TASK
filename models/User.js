const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  user_fname: {
    type: String,
    required: [true, 'First name is required']
  },
  user_lname: {
    type: String,
    required: [true, 'Last name is required']
  },

  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to check password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User= mongoose.model('User', userSchema);

module.exports = User;