// Schemas/Products.schema.js
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
  },
  barcode: {
    type: String,
    required: true,
    unique: true,
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
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  notificationPeriod: {
    type: Number,
    required: true,
  },
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;
