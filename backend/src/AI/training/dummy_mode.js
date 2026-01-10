// backend/src/ai/training/dummy_mode.js

const trainingLogs = [];

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function simulateMarketShock() {
  const shocks = [
    -0.35, // crash
    -0.25,
    -0.15,
     0.15,
     0.25,
     0.40  // extreme pump
  ];
  return shocks[Math.floor(Math.random() * shocks.length)];
}

function train(userAction) {
  const marketShock = simulateMarketShock();

  const riskMultiplier = userAction.riskLevel || 1;
  const decisionQuality = randomBetween(-1, 1);

  const profitLoss =
    (decisionQuality + marketShock) * riskMultiplier * 100;

  const result = {
    timestamp: Date.now(),
    action: userAction,
    marketShock,
    profitLoss,
    survived: profitLoss > -300 // brutal failure threshold
  };

  trainingLogs.push(result);

  return result;
}

function getLogs() {
  return trainingLogs;
}

module.exports = {
  train,
  getLogs
};