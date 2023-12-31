const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
// const generateSecret = require("../utils/generateSecret")
const cryptoRandomStringPromise = import("crypto-random-string");
// router.get("/",(req,res)=>{
//     secretKey = generateSecret(20)
//     res.send({message:"This is the secret key gen", secretKey})
// })
const generateSecret = async () => {
  // const cryptoRandomString = await cryptoRandomStringPromise;
  const { default: cryptoRandomString } = await cryptoRandomStringPromise;
  const secret = cryptoRandomString({ length: 20 });
  return secret;
};

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid Email" });
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(401).json({ message: "Invalid Password" });
    }
    // Generate token
    const secretKey = await generateSecret()
    const token = jwt.sign({ userId: user?._id }, secretKey);
    res.status(200).json({token})
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
