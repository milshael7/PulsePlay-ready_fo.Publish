// backend/routes/message.routes.js

const express = require('express');
const Message = require('../models/message');
const router = express.Router();

// Send a message
router.post('/send', async (req, res) => {
  try {
    const { fromUserId, toUserId, productId, message } = req.body;
    const newMessage = new Message({ fromUserId, toUserId, productId, message });
    await newMessage.save();
    res.json(newMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get inbox messages for a user
router.get('/inbox/:userId', async (req, res) => {
  try {
    const messages = await Message.find({ toUserId: req.params.userId })
      .populate('fromUserId', 'name')   // include sender name
      .populate('productId', 'name');   // include product name
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;