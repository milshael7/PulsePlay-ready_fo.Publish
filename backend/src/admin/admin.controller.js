// backend/src/admin/admin.controller.js
const usersService = require('../users/users.service');
const { setOwnerDailyTradeLimit, executeAITrade, TRADE_PERCENTAGES } = require('../trading/trading.route');

// -----------------------
// Admin: Get all users
// -----------------------
exports.getAllUsers = async () => {
  return usersService.users; // return all user data
};

// -----------------------
// Admin: Override AI Wallet
// -----------------------
exports.overrideAI = async (userId, newAmount) => {
  const updatedUser = await usersService.updateProfile(userId, { aiWallet: newAmount });
  console.log(`[ADMIN DASHBOARD] AI wallet for user ${userId} manually set to $${newAmount}`);
  return updatedUser;
};

// -----------------------
// Admin: Set Owner Daily Trade Limit
// -----------------------
exports.setDailyTradeLimit = (limit) => {
  setOwnerDailyTradeLimit(limit);
  console.log(`[ADMIN DASHBOARD] Owner daily trade limit updated to ${limit} trades`);
};

// -----------------------
// Admin: Execute AI Trade Manually (for review/testing)
// -----------------------
exports.manualAITrade = (userId, selectedPercentage = 30, mode = 'dummy') => {
  if (!TRADE_PERCENTAGES.includes(selectedPercentage)) selectedPercentage = 30;
  executeAITrade(userId, selectedPercentage, mode);
};

// -----------------------
// Admin: Get AI Trade Status for Dashboard
// -----------------------
exports.getAITradeStatus = (userId) => {
  const user = usersService.users.find(u => u.id === userId);
  if (!user) return null;

  const ai = user.aiWallet || {};
  return {
    balance: ai.balance || 0,
    dailyTradeCount: ai.dailyTradeCount || 0,
    tradePercent: ai.tradePercent || 0,
    confidence: ai.confidence || 0,
    lastTradeResult: ai.lastTradeResult || 0
  };
};

// -----------------------
// Admin: Reset AI daily trade count
// -----------------------
exports.resetDailyTradeCount = (userId) => {
  const user = usersService.users.find(u => u.id === userId);
  if (!user || !user.aiWallet) return;
  user.aiWallet.dailyTradeCount = 0;
  console.log(`[ADMIN DASHBOARD] AI daily trade count reset for user ${userId}`);
};