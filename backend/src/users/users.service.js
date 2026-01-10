// In-memory users (temporary — replace with DB later)
const users = [];

/**
 * User entity
 */
class User {
  constructor({ email, password, role }) {
    this.id = Date.now(); // simple unique ID
    this.email = email;
    this.password = password; // ⚠️ hash later
    this.role = role || 'User';
    this.createdAt = new Date();

    // Wallet system
    this.aiWallet = {
      balance: 1000,
      maxCap: 10000,
      allowedPercents: [3,5,10,15,20,25,30,35,40,45,50],
      activePercent: 30
    };
    this.storehouse = {
      balance: 50000,
      minimumReserve: 10000
    };
  }
}

/**
 * Create a new user
 */
function createUser(email, password, referral = null, role = "User") {
  if (users.find(u => u.email === email)) {
    return { success: false, message: "User already exists" };
  }

  const newUser = new User({ email, password, role });
  newUser.referral = referral;
  users.push(newUser);
  return { success: true, user: newUser };
}

/**
 * Find user by email
 */
function findUser(email) {
  return users.find(u => u.email === email);
}

/**
 * List all users (admin only)
 */
function listUsers() {
  return users;
}

/**
 * Get wallets for a user
 */
function getWallets(userId) {
  const user = users.find(u => u.id === userId);
  if (!user) return null;

  return {
    aiWallet: user.aiWallet,
    storehouse: user.storehouse
  };
}

/**
 * Create first admin (RUN ONCE)
 */
function createFirstAdmin() {
  const email = process.env.FIRST_ADMIN_EMAIL;
  const password = process.env.FIRST_ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("Admin credentials not set in environment variables");
  }

  if (users.find(u => u.email === email)) {
    return { success: false, message: "Admin already exists" };
  }

  return createUser(email, password, null, "Admin");
}

module.exports = {
  createUser,
  findUser,
  listUsers,
  getWallets,
  createFirstAdmin
};