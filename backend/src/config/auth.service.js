const users = require('../users/users.service');
const config = require('../../config/default_config.json');

// Setup first admin account if it doesn't exist
async function setupFirstAdmin() {
  const { email, password } = config.firstAdmin;

  const existingAdmin = await users.findUser(email);
  if (!existingAdmin) {
    await users.createUser(email, password, null, 'Admin');
    console.log('First admin account created:', email);
  } else {
    console.log('First admin already exists.');
  }
}

// Signup function for new users
async function signup({ email, password, referral }) {
  return users.createUser(email, password, referral);
}

// Login function for users/admin
async function login({ email, password }) {
  const user = await users.findUser(email);
  if (!user || user.password !== password) {
    return { success: false, message: "Invalid credentials" };
  }
  return { success: true, token: "FAKETOKEN" };
}

module.exports = { setupFirstAdmin, signup, login };