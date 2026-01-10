// ad.ai.js
// AI system to select ads based on engagement and user behavior

const adPool = [
  { id: 1, content: "Buy our premium course!", score: 0 },
  { id: 2, content: "Get 20% off today!", score: 0 },
  { id: 3, content: "Check out our new product!", score: 0 },
  { id: 4, content: "Join our community!", score: 0 }
];

// Update scores based on user behavior
function updateAdScores(userBehavior) {
  // Example behavior: clicks, time spent, previous views
  adPool.forEach(ad => {
    const engagement = userBehavior[ad.id] || 0;
    ad.score = engagement; 
  });
}

// Select the ad with the highest engagement score for given userBehavior
function selectBestAd(userBehavior = {}) {
  updateAdScores(userBehavior);
  adPool.sort((a, b) => b.score - a.score);
  return adPool[0]; // Top scored ad
}

module.exports = { adPool, updateAdScores, selectBestAd };