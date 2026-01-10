// backend/src/ai/training/retraining.js

const { train, getLogs } = require("./dummy_mode");
const { analyzeNews } = require("./news_analysis");

function retrain(userActions = [], newsItems = []) {
  const tradeResults = userActions.map(action => train(action));
  const newsInsights = analyzeNews(newsItems);

  return {
    retrainedAt: Date.now(),
    tradeResults,
    newsInsights,
    totalLogs: getLogs().length
  };
}

module.exports = {
  retrain
};