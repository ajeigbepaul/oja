const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  products: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
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
    },
  ],
  totalprice: {
    type: Number,
    required: true,
  },
  shippingaddress: {
    name: String,
    mobilenos: String,
    housenos: String,
    street: String,
    city: String,
    country: String,
    postalcode: String,
  },
  paymentmethod: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }, 
});
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
