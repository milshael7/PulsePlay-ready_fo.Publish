// =======================
// trading.routes.digest.js
// =======================

const { aiWallets, fundAI, recordProfit, storehouse } = require('./wallet.service');
const { train } = require('./training/dummy_mode');
const { retrain } = require('./training/retraining');
const jwt = require('jsonwebtoken');
const fs = require('fs');

// -----------------------
// JWT Guard
// -----------------------
function jwtGuard(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1]; // Bearer <token>
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const secret = fs.readFileSync('./security_rules.json', 'utf-8');
    const decoded = jwt.verify(token, JSON.parse(secret).jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token', error: err.message });
  }
}

// -----------------------
// Allowed trade percentages
// -----------------------
const TRADE_PERCENTAGES = [3,5,10,15,20,25,30,35,40,45,50];

// -----------------------
// Owner-set daily trade limits
// -----------------------
let OWNER_DAILY_TRADE_LIMIT = 3; // default 3
function setOwnerDailyTradeLimit(limit) {
  if (limit >= 3 && limit <= 7) {
    OWNER_DAILY_TRADE_LIMIT = limit;
    console.log(`Owner daily trade limit set to ${limit}`);
  } else {
    console.log(`Invalid limit ${limit}. Must be between 3-7`);
  }
}

// -----------------------
// Internal difficulty profiles
// -----------------------
const MODE_CONFIG = {
  dummy: { baseWinRate: 0.42, winMultiplier: 0.04, lossMultiplier: -0.07, crashChance: 0.08, volatilitySpike: true },
  live: { baseWinRate: 0.56, winMultiplier: 0.05, lossMultiplier: -0.03, crashChance: 0.01, volatilitySpike: false }
};

// -----------------------
// Execute AI trade
// -----------------------
function executeAITrade(userId, selectedPercentage = 30, mode = 'dummy') {
  const ai = aiWallets[userId];
  if (!ai) return console.log('AI wallet not initialized');

  if (!TRADE_PERCENTAGES.includes(selectedPercentage)) selectedPercentage = 30;

  // Enforce daily trade limit
  ai.dailyTradeCount = ai.dailyTradeCount || 0;
  if (ai.dailyTradeCount >= OWNER_DAILY_TRADE_LIMIT) {
    console.log(`Daily trade limit reached: ${OWNER_DAILY_TRADE_LIMIT}`);
    return;
  }

  // Fund wallet if needed
  fundAI(userId);

  // Determine trade amount
  let tradeAmount = (selectedPercentage / 100) * ai.balance;
  if (ai.confidence && ai.confidence > 0) tradeAmount = ai.confidence;

  // Simulate market
  const config = MODE_CONFIG[mode] || MODE_CONFIG.dummy;
  let effectiveWinRate = config.baseWinRate;
  if (config.volatilitySpike && Math.random() < 0.25) effectiveWinRate -= 0.1;

  const isCrash = Math.random() < config.crashChance;
  let result = isCrash
    ? tradeAmount * -0.15
    : Math.random() < effectiveWinRate
      ? tradeAmount * config.winMultiplier
      : tradeAmount * config.lossMultiplier;

  // Record profit/loss
  recordProfit(userId, result);
  ai.dailyTradeCount++;
  ai.confidence = tradeAmount;

  // Adjust trade percentage
  if (result < 0) {
    ai.lossCount = (ai.lossCount || 0) + 1;
    if (ai.lossCount >= 2) {
      ai.tradePercent = 3;
      ai.lossCount = 0;
      console.log(`Major loss! TradePercent reset to 3% of wallet.`);
    }
  } else {
    ai.lossCount = 0;
    const maxPercent = Math.min(Math.floor((ai.balance / 10000) * 5) + 30, 50);
    ai.tradePercent = Math.min(ai.tradePercent + 3, maxPercent);
  }

  // Send trade info to AI Training
  train({ userId, tradeAmount, result, selectedPercentage });
  retrain(userId);

  console.log(`[${mode.toUpperCase()}] AI traded ${selectedPercentage}% (Trade ${ai.dailyTradeCount}/${OWNER_DAILY_TRADE_LIMIT})`);
  console.log(`Result: ${result.toFixed(2)} | AI Balance: ${ai.balance.toFixed(2)} | Storehouse: ${storehouse.balance.toFixed(2)}`);

  return result;
}

// -----------------------
// Admin Dashboard hooks
// -----------------------
function getAIDashboard(userId) {
  const ai = aiWallets[userId];
  if (!ai) return null;

  return {
    aiBalance: ai.balance,
    dailyTradeCount: ai.dailyTradeCount || 0,
    tradePercent: ai.tradePercent || 0,
    confidence: ai.confidence || 0,
    ownerDailyLimit: OWNER_DAILY_TRADE_LIMIT,
    storehouseBalance: storehouse.balance
  };
}

function resetDailyTradeCount(userId) {
  const ai = aiWallets[userId];
  if (ai) ai.dailyTradeCount = 0;
}

// -----------------------
// Exports
// -----------------------
module.exports = {
  executeAITrade,
  TRADE_PERCENTAGES,
  setOwnerDailyTradeLimit,
  jwtGuard,
  getAIDashboard,
  resetDailyTradeCount
};