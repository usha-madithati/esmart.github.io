// server.js
import express from "express";
import dotenv from "dotenv";
import dbConnect from "./db/datbase.js";
import Product from "./Schemas/Products.schema.js";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "./Schemas/User.Schema.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to the database
dbConnect();

// API for displaying products
app.get("/products/:barcode", async (req, res) => {
  const { barcode } = req.params;
  try {
    const product = await Product.findOne({ barcode });
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send({
      message: "Error occurred when fetching product.",
      error: error.message,
    });
    console.log(error);
  }
});

// Route to handle form submissions via API (POST request)
app.post("/add-product", async (req, res) => {
  const { product_name, barcode, mfd, expiry_date, product_info, id } =
    req.body;

  if (!product_name || !barcode || !mfd || !expiry_date || !product_info) {
    return res.status(400).send({ message: "All fields are required" });
  }

  const isValidDate = (date) => !isNaN(Date.parse(date));

  if (!isValidDate(mfd) || !isValidDate(expiry_date)) {
    return res
      .status(400)
      .send({ message: "Invalid date format. Use YYYY-MM-DD." });
  }

  if (new Date(expiry_date) <= new Date(mfd)) {
    return res
      .status(400)
      .send({ message: "Expiry date must be after the manufacturing date." });
  }

  const newProduct = new Product({
    product_name,
    barcode,
    mfd: new Date(mfd),
    expiry_date: new Date(expiry_date),
    product_info,
    id: id || undefined, // Include id if provided, otherwise let MongoDB handle it
  });

  try {
    await newProduct.save();
    res.status(201).send({
      message: "Product added successfully!",
      success: true,
      product: newProduct,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error adding product",
      success: false,
      error: error.message,
    });
  }
});

// Route to handle scanning and storing product
app.post("/scan-product", async (req, res) => {
  const { barcode } = req.body;

  if (!barcode) {
    return res.status(400).send({ message: "Barcode is required" });
  }

  try {
    let product = await Product.findOne({ barcode });

    if (!product) {
      // If the product is not found, you can return an error or handle as needed
      return res.status(404).send({ message: "Product not found" });
    }

    res.status(200).send({
      message: "Product scanned successfully",
      product: product,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error scanning product",
      error: error.message,
    });
  }
});

// Signup Route API
app.post("/signup", async (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !phone || !password) {
    return res.status(400).send({ message: "All fields are required" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).send({ message: "Email already in use" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, phone, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).send({ message: "User registered successfully!" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error registering user", error: error.message });
  }
});

// Login Route API
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).send({ success: true, message: "Login successful", token });
  } catch (error) {
    res.status(500).send({ message: "Error logging in", error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
