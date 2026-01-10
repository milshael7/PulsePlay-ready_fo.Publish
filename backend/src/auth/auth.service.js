const users = require('../users/users.service');
const bcrypt = require('bcryptjs'); // for hashing passwords

/**
 * User signup
 */
async function signup({ email, password, referral }) {
  // hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);
  return users.createUser(email, hashedPassword, referral, "User");
}

/**
 * User login
 */
async function login({ email, password }) {
  const user = await users.findUser(email);
  if (!user) {
    return { success: false, message: "Invalid credentials" };
  }

  // compare hashed password
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return { success: false, message: "Invalid credentials" };
  }

  return { success: true, token: "FAKETOKEN" }; // Replace with real JWT if needed
}

/**
 * Create first admin (RUN ONCE)
 * Email & password come from ENV, not hard-coded
 */
async function createFirstAdmin() {
  const adminEmail = process.env.FIRST_ADMIN_EMAIL;
  const adminPassword = process.env.FIRST_ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    throw new Error("Admin credentials not set in environment variables");
  }

  const existingAdmin = await users.findUser(adminEmail);
  if (existingAdmin) {
    return { success: false, message: "Admin already exists" };
  }

  // hash admin password
  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  return users.createUser(adminEmail, hashedPassword, null, "Admin");
}

module.exports = {
  signup,
  login,
  createFirstAdmin
};