// jwt.guard.js
const jwt = require("jsonwebtoken");
const WalletService = require("./wallet.service"); // adjust path if needed

// Secret key for JWT verification
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Initialize WalletService (singleton if needed)
const walletService = new WalletService();

/**
 * Middleware to verify JWT and optionally check realTradeAllowed
 * @param {boolean} checkRealTrade - if true, will also enforce owner switch
 */
function jwtGuard(checkRealTrade = false) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded; // attach user info to request

      // Optional: check realTradeAllowed if route requires it
      if (checkRealTrade) {
        const userId = decoded.id; // assumes JWT payload has user id
        if (!walletService.isRealTradeAllowed(userId)) {
          return res.status(403).json({ message: "Forbidden: Real trading is disabled" });
        }
      }

      next();
    } catch (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  };
}

module.exports = jwtGuard;