// backend/src/main.js

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const authController = require('./auth/auth.controller');
const usersService = require('./users/users.service');
const { createFirstAdmin } = require('./auth/auth.service');

const app = express();

// Middleware
app.use(bodyParser.json());

// --------------------
// ROUTES
// --------------------

// Auth routes
app.post('/signup', async (req, res) => {
  const result = await authController.signup(req.body);
  res.json(result);
});

app.post('/login', async (req, res) => {
  const result = await authController.login(req.body);
  res.json(result);
});

// Users (example)
app.get('/users', async (req, res) => {
  const allUsers = await usersService.getAllUsers();
  res.json(allUsers);
});

// --------------------
// SERVER STARTUP
// --------------------

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Create first admin safely (runs once)
    await createFirstAdmin();

    app.listen(PORT, () => {
      console.log(`✅ Backend running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Startup error:', err.message);
  }
}

startServer();