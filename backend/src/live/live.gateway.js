// backend/src/live/live.gateway.js
const liveSessions = {};

exports.startLive = (userId) => {
  liveSessions[userId] = { viewers:[], status:'live' };
  return liveSessions[userId];
};

exports.joinLive = (userId, targetId) => {
  if(liveSessions[targetId]){
    liveSessions[targetId].viewers.push(userId);
  }
  return liveSessions[targetId];
};