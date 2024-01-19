const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const SALT = 12;
const nodemailer = require("nodemailer");
// Use dynamic import for crypto-random-string
const cryptoRandomStringPromise = import("crypto-random-string");

const sendVerificationEmail = async (email, verificationToken) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "pdave4krist@gmail.com",
      pass: "avkifrdjfecmxkwx",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  const mailOptions = {
    from: "oja.com",
    to: email,
    subject: "Email Verification",
    text: `Please click the following link to verify your email : ${process.env.BASE_URL}verify/${verificationToken}`,
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Error sending Email", error);
  }
};

// Create a user
router.post("/", async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    // check if user already exists
    const isExistUser = await User.findOne({ email });
    if (isExistUser) {
      return res.status(400).json({ message: "Email already registered" });
    }
    const salt = await bcrypt.genSalt(Number(SALT));
    const hashPassword = await bcrypt.hash(password, salt);
    // Create a new user
    const newUser = new User({ fullname, email, password: hashPassword });
    // generate the verificationToken
    // const cryptoRandomString = await cryptoRandomStringPromise;
    const { default: cryptoRandomString } = await cryptoRandomStringPromise;
    newUser.verificationtoken = cryptoRandomString({ length: 20 });
    // save the user
    await newUser.save();
    // send a verification email to the user
    sendVerificationEmail(newUser.email, newUser.verificationtoken);
    res.status(201).json({ message: "User created" });
  } catch (error) {
    // Handle error appropriately
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
// Get User for Profile
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});
module.exports = router;
