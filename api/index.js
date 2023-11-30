const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const jwt = require('jsonwebtoken')
const userRoutes = require("./routes/user")
const verifyRoutes = require("./routes/verificationemail")
// APP CONNECTION
const app = express();
// DB CONNECTION
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
app.use(
    express.json({
      limit: "50mb",
      parameterLimit: 100000,
      extended: true,
    })
  );
//   app.use(
//     cors({
//       credentials: true,
//       origin: "https://bamwholesalestores.com",
//     })
//   );
// ROUTES
app.use("/register", userRoutes)
app.use("/verify", verifyRoutes)
// LISTEN
  connectDB().then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log("server running, listening for requests");
    });
  });