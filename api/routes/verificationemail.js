const User = require("../models/user");

const router = require("express").Router();
// verification
router.get("/:token", async (req, res) => {
    try {
      const token = req.params.token;
      const user = await User.findOne({ verificationToken: token });
      if (!user) {
        return res.status(404).json({ message: "Invalid verification token" });
      }
      user.verified = true;
      user.verificationtoken = undefined;
  
      await user.save()
      res.status(200).json({message:"Email verified successfully"})
    } catch (error) {
      res.status(500).json({ message: "Email Verification failed" });
    }
  });

  module.exports = router;