const router = require("express").Router();
const Product = require("../models/product");

router.post("/", async (req, res) => {
  try {
    const {
      title,
      oldPrice,
      price,
      image,
      carouselImages,
      color,
      size,
      ratings,
    } = req.body;

    // Create a new product instance
    const newProduct = new Product({
      title,
      oldPrice,
      price,
      image,
      carouselImages,
      color,
      size,
      ratings,
    });

    // Save the product to the database
    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Server Error", error });
  }
});
router.get("/", (req, res) => {
  res.json({ message: "testing.." });
});

module.exports = router;
