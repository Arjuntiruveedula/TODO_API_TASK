const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

//  Register a new user
//  POST /api/auth/register

const registerUser = async (req, res) => {
  try {
    const { user_fname, user_lname, user_id, email, password } = req.body;
    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // Create user
    const user = await User.create({
      user_fname,
      user_lname,
      user_id,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        user_fname: user.user_fname,
        user_lname: user.user_lname,
        user_id: user.user_id,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

//   Auth user & get token
//   POST /api/auth/login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        user_fname: user.user_fname,
        user_lname: user.user_lname,
        user_id: user.user_id,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

//  Get user profile
//  GET /api/auth/profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');

    if (user) {
      res.json({
        _id: user._id,
        user_fname: user.user_fname,
        user_lname: user.user_lname,
        user_id: user.user_id,
        email: user.email,
        created_at: user.created_at,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { registerUser, loginUser, getUserProfile };