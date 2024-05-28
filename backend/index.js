import express from "express";
import dotenv from "dotenv";
import dbConnect from "./db/datbase.js";
import Product from "./Schemas/Products.schema.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and form data
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to the database
dbConnect();

// API for displaying products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({
      message: "Error occurred when fetching products.",
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
