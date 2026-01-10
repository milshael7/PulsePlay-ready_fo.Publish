// =======================
// admin.routes.js
// =======================

const express = require('express');
const router = express.Router();
const { jwtGuard } = require('./trading.route');
const adminController = require('./admin.controller');

// -----------------------
// Get AI dashboard info
// -----------------------
router.get('/ai/:userId', jwtGuard, (req, res) => {
  const userId = req.params.userId;
  const dashboard = adminController.getAITradeStatus(userId);
  if (!dashboard) return res.status(404).json({ message: 'AI wallet not found' });
  res.json(dashboard);
});

// -----------------------
// Reset AI daily trades
// -----------------------
router.post('/ai/:userId/reset-trades', jwtGuard, (req, res) => {
  const userId = req.params.userId;
  adminController.resetDailyTradeCount(userId);
  res.json({ message: `AI daily trade count reset for user ${userId}` });
});

// -----------------------
// Update owner daily trade limit
// -----------------------
router.post('/ai/set-daily-limit', jwtGuard, (req, res) => {
  const { limit } = req.body;
  adminController.setDailyTradeLimit(limit);
  res.json({ message: `Owner daily trade limit updated to ${limit}` });
});

// -----------------------
// Export router
// -----------------------
module.exports = router;