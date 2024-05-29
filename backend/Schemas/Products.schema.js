import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
  },
  barcode: {
    type: String,
    required: true,
  },
  mfd: {
    type: Date,
    required: true,
  },
  expiry_date: {
    type: Date,
    required: true,
  },
  product_info: {
    type: String,
    required: true,
  },
  id: {
    type: String, // Or whatever type you prefer
    unique: false, // Ensure this is not unique
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
