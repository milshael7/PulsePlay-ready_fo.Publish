const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Get all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find().populate('relatedProducts');
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;