// backend/src/auth/auth.controller.js
const express = require('express');
const router = express.Router();
const AuthService = require('./auth.service');

const authService = new AuthService();

// Signup route
router.post('/signup', (req, res) => {
  const { email, password, referral } = req.body;
  const result = authService.signup(email, password, referral);
  res.json(result);
});

// Login route
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const result = authService.login(email, password);
  res.json(result);
});

module.exports = router;