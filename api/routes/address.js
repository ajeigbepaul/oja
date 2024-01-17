const router = require("express").Router();
const User = require("../models/user");

router.post("/", async (req, res) => {
  try {
    const { userId, addressData } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    user.addresses.push(addressData);
    await user.save();
    res.status(200).json({ message: "Address created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Address not added" });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const useraddresses = user.addresses;
    res.status(200).json({ useraddresses });
  } catch (error) {
    res.status(500).json({ message: "Could not fetch addresses" });
  }
});

module.exports = router;
