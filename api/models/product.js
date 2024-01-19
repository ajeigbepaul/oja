const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  oldPrice: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  carouselImages: [
    {
      type: String,
    },
  ],
  color: {
    type: String,
  },
  size: {
    type: String,
  },
  ratings: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
