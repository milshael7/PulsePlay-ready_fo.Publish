// backend/src/ai/training/news_analysis.js

function analyzeNews(newsItems = []) {
  return newsItems.map(news => {
    let impactScore = 0;

    if (news.type === "regulation") impactScore -= 0.4;
    if (news.type === "hack") impactScore -= 0.6;
    if (news.type === "adoption") impactScore += 0.5;
    if (news.type === "institutional") impactScore += 0.7;

    return {
      headline: news.headline,
      sector: news.sector || "general",
      impactScore,
      timestamp: Date.now()
    };
  });
}

module.exports = {
  analyzeNews
};