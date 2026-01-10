const { retrain } = require("../ai/training/retraining");
const { train } = require("../ai/training/dummy_mode");
const { analyzeNews } = require("../ai/training/news_analysis");

// Helper: fetch latest news (dummy placeholder)
function getLatestNews() {
  return ["market news 1", "market news 2"];
}

class WalletService {
  constructor() {
    // Central storehouse
    this.storehouse = { balance: 50000, minThreshold: 1000 };

    // AI wallet for real money
    this.aiWallet = { balance: 0, maxLimit: 50000, tradePercent: 30, lossCount: 0, confidence: 0 };

    // AI wallet for dummy money
    this.aiDummyWallet = { balance: 1000, maxLimit: Infinity, tradePercent: 30, totalGains: 0, confidence: 0 };

    // Per-user settings
    this.aiWallets = {};
    this.aiDummyWallets = {};
    this.realTradeAllowed = {}; // owner-controlled switch

    this.defaultPercent = 30;
  }

  /* ------------------ OWNER CONTROL ------------------ */
  setRealTradeAllowed(userId, allowed) {
    this.realTradeAllowed[userId] = allowed;
  }

  isRealTradeAllowed(userId) {
    const wallet = this.getAIWalletForUser(userId);
    return this.realTradeAllowed[userId] !== false && wallet.balance > 0;
  }

  /* ------------------ AI AUTOMATIC TRADING ------------------ */
  autoFundAIWallet(ai) {
    if (ai.balance < 500 && this.storehouse.balance > this.storehouse.minThreshold) {
      const transferAmount = Math.min(1000 - ai.balance, this.storehouse.balance - this.storehouse.minThreshold);
      ai.balance += transferAmount;
      this.storehouse.balance -= transferAmount;
      ai.tradePercent = 30; // reset to 30% for small top-ups
      ai.confidence = 0;    // reset confidence
      console.log(`AI wallet funded $${transferAmount} from storehouse. TradePercent reset to 30%`);
    }
  }

  executeAITradeForUser(userId) {
    const ai = this.getAIWalletForUser(userId);

    // Owner switched off real trading? Fallback to dummy
    if (!this.isRealTradeAllowed(userId)) {
      console.log("Real money trading disabled or no funds. Running dummy mode.");
      return this.runDummyMode(userId);
    }

    this.autoFundAIWallet(ai);

    // Determine trade amount
    let tradeAmount = (ai.tradePercent / 100) * ai.balance;

    // Apply confidence: maintain same amount if confident
    if (ai.confidence > 0) tradeAmount = ai.confidence;

    console.log(`AI trades $${tradeAmount} from real wallet with ${ai.tradePercent}% allocation.`);

    // Simulate trade
    const result = Math.random() < 0.55 ? tradeAmount * 0.05 : -tradeAmount * 0.03;
    ai.balance += result;

    // Update confidence for next trade
    ai.confidence = tradeAmount;

    // Max limit handling
    if (ai.balance > ai.maxLimit) {
      const excess = ai.balance - ai.maxLimit;
      this.storehouse.balance += excess;
      ai.balance = ai.maxLimit;
    }

    // Adjust trade percent and losses
    if (result < 0) {
      ai.lossCount++;
      if (ai.lossCount >= 2) {
        ai.tradePercent = 3; // major loss: reset to 3% of current wallet
        ai.lossCount = 0;
        ai.confidence = 0;
        console.log(`Major loss! TradePercent reset to 3% of wallet.`);
      }
    } else {
      ai.lossCount = 0;
      const maxPercent = Math.min(Math.floor((ai.balance / 10000) * 5) + 30, 50);
      ai.tradePercent = Math.min(ai.tradePercent + 3, maxPercent);
    }

    // --- RETRAINING LOGIC ---
    retrain({ tradeAmount, result, tradePercent: ai.tradePercent }, analyzeNews(getLatestNews()));

    console.log(`AI wallet: $${ai.balance}, tradePercent: ${ai.tradePercent}%, confidence: ${ai.confidence}`);
    console.log(`Storehouse balance: $${this.storehouse.balance}`);

    return result;
  }

  /* ------------------ DUMMY MODE ------------------ */
  runDummyMode(userId) {
    const dummy = this.getAIDummyWalletForUser(userId);

    if (dummy.balance <= 0) {
      dummy.balance = 1000;
      dummy.tradePercent = 30;
      dummy.totalGains = 0;
      dummy.confidence = 0;
      console.log("Dummy wallet reset to $1000, tradePercent reset to 30%");
    }

    let tradeAmount = (dummy.tradePercent / 100) * dummy.balance;

    // Confidence tracking
    if (dummy.confidence > 0) tradeAmount = dummy.confidence;

    train({ tradeAmount, selectedPercentage: dummy.tradePercent });

    const result = Math.random() < 0.55 ? tradeAmount * 0.05 : -tradeAmount * 0.03;
    dummy.balance += result;

    dummy.confidence = tradeAmount;

    if (result > 0) {
      dummy.totalGains += result;
      const increments = Math.floor(dummy.totalGains / 5000);
      dummy.tradePercent = 30 + increments * 3;
    }

    console.log(`Dummy mode: $${tradeAmount} trade. Dummy wallet: $${dummy.balance}, tradePercent: ${dummy.tradePercent}%, confidence: ${dummy.confidence}`);
    return result;
  }

  /* ------------------ MANUAL TRADING ------------------ */
  manualTrade(user, amount, profitMultiplier = 0.05) {
    if (user.balance >= amount) {
      const result = Math.random() > 0.5 ? amount * profitMultiplier : -amount * profitMultiplier;
      user.balance += result;
      return result;
    }
    return 0;
  }

  /* ------------------ AI WALLETS ------------------ */
  getAIWalletForUser(userId) {
    if (!this.aiWallets[userId]) {
      this.aiWallets[userId] = {
        balance: this.aiWallet.balance,
        maxLimit: this.aiWallet.maxLimit,
        tradePercent: this.aiWallet.tradePercent,
        lossCount: 0,
        confidence: 0
      };
    }
    return this.aiWallets[userId];
  }

  getAIDummyWalletForUser(userId) {
    if (!this.aiDummyWallets[userId]) {
      this.aiDummyWallets[userId] = {
        balance: this.aiDummyWallet.balance,
        tradePercent: this.aiDummyWallet.tradePercent,
        totalGains: this.aiDummyWallet.totalGains,
        confidence: 0
      };
    }
    return this.aiDummyWallets[userId];
  }

  /* ------------------ OWNER ACTION ------------------ */
  resetDummyWallet(userId) {
    const dummy = this.getAIDummyWalletForUser(userId);
    dummy.balance = 1000;
    dummy.tradePercent = 30;
    dummy.totalGains = 0;
    dummy.confidence = 0;
    console.log(`Owner reset dummy wallet for user ${userId} to $1000 and tradePercent to 30%`);
  }
}

module.exports = WalletService;