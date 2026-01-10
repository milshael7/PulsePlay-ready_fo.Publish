const express = require('express');
const Product = require('../models/product');
const router = express.Router();

// =======================
// GET all store items
// =======================
router.get('/items', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =======================
// GET products by owner (Dashboard)
// =======================
router.get('/owner/:userId', async (req, res) => {
  try {
    const products = await Product.find({ ownerId: req.params.userId });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =======================
// PURCHASE product (Checkout)
// =======================
router.post('/purchase', async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.stock <= 0) {
      return res.status(400).json({ message: 'Out of stock' });
    }

    product.stock -= 1;
    await product.save();

    res.json({ message: 'Purchase successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;