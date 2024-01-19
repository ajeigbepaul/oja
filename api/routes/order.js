const router = require("express").Router();
const User = require("../models/user");
const Order = require("../models/order");

router.post("/", async (req, res) => {
  try {
    const { userId, cartItems, totalPrice, shippingAddress, paymentMethod } =
      req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const products = cartItems.map((item) => ({
      name: item?.title,
      quantity: item?.quantity,
      price: item?.price,
      image: item?.image,
    }));
    const order = new Order({
      user: userId,
      products: products,
      totalPrice: totalPrice,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
    });
    await order.save();
    // Update the user's orders array
    user.orders.push(order._id);
    await user.save();
    res.status(200).json({ message: "Order created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});
router.get("/", (req, res) => {
  res.json({ message: "testing.." });
});
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    
    // Find the user by ID and populate the 'orders' field
    const user = await User.findById(userId).populate('orders');
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const orders = user.orders;

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});


module.exports = router;
