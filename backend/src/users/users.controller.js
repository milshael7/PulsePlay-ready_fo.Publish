// backend/src/users/user.controller.js
const express = require('express');
const router = express.Router();
const usersService = require('./user.service');

// Create a new user (signup)
router.post('/signup', async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const user = await usersService.createUser(email, password, null, role);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all users (for admin)
router.get('/', async (req, res) => {
  try {
    const users = usersService.listUsers(); // <-- fixed function name
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Find one user by email
router.get('/:email', async (req, res) => {
  try {
    const user = usersService.findUser(req.params.email);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;