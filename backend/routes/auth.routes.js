const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';
const JWT_EXPIRES = '7d';

// Register
router.post('/register', async (req,res) => {
  const { name, email, password, role } = req.body;
  try {
    const existing = await User.findOne({ email });
    if(existing) return res.status(400).json({ error: 'Email already exists' });

    const user = new User({ name, email, password, role });
    await user.save();

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
    res.json({ user, token });
  } catch(err){
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req,res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if(!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
    res.json({ user, token });
  } catch(err){
    res.status(500).json({ error: err.message });
  }
});

// Get current user
const authMiddleware = require('../middleware/auth.middleware');
router.get('/me', authMiddleware, async (req,res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
});

module.exports = router;