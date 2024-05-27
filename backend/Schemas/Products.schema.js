import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
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
});

const Product = mongoose.model("Product", productSchema);

export default Product;
