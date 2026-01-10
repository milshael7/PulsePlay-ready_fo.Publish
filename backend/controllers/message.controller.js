const Message = require('../models/message');

exports.sendMessage = async (req, res) => {
  const { fromUserId, toUserId, productId, message } = req.body;
  const newMessage = new Message({ fromUserId, toUserId, productId, message });
  await newMessage.save();
  res.json(newMessage);
};

exports.getInbox = async (req, res) => {
  const messages = await Message.find({ toUserId: req.params.userId }).populate('fromUserId productId');
  res.json(messages);
};