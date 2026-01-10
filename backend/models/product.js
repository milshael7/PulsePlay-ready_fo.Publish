const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String },
  images: [{ type: String }], // URLs for product images
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  sizeOptions: [{ type: String }], // optional, for clothing/blankets/etc
  category: { type: String }, 
  musicPlaylist: [{ type: String }], // optional music for product show
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', ProductSchema);