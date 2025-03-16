const express = require('express');
const router = express.Router();
const { getUsers, getUserById, deleteUser } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getUsers);
router.get('/:id', protect, getUserById);
router.delete('/:id', protect, deleteUser);

module.exports = router;