// import mongoose from "mongoose";
// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import dbConnect from "./db/datbase.js";

// // database connection started
// dbConnect();

// dotenv.config();

// const app = express();

// app.use(cors());

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Server running on ${PORT}`);
// });

import express from "express";
import dotenv from "dotenv";
import dbConnect from "./db/datbase.js";
import Product from "./Schemas/Products.schema.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to the database
dbConnect();

// Example route to add the products to the database
app.get("/add-products", async (req, res) => {
  const products = [
    {
      id: 1,
      product_name: "Dabur Honey",
      barcode: "8901207005527",
      mfd: new Date("2023-04-05"),
      expiry_date: new Date("2024-04-04"),
    },
    {
      id: 2,
      product_name: "Aashirvaad Tumeric Powder",
      barcode: "8901725125370",
      mfd: new Date("2024-04-24"),
      expiry_date: new Date("2025-01-23"),
    },
    {
      id: 3,
      product_name: "Red label Natural Care",
      barcode: "8901030876981",
      mfd: new Date("2023-11-15"),
      expiry_date: new Date("2024-11-14"),
    },
    {
      id: 4,
      product_name: "Saffola Oats",
      barcode: "8901088071277",
      mfd: new Date("2024-03-11"),
      expiry_date: new Date("2025-03-11"),
    },
    {
      id: 5,
      product_name: "Kelloggs CHOCOS",
      barcode: "8901499010704",
      mfd: new Date("2023-12-18"),
      expiry_date: new Date("2024-09-13"),
    },
    {
      id: 6,
      product_name: "Sunfeast Yippee",
      barcode: "8901725005900",
      mfd: new Date("2024-04-25"),
      expiry_date: new Date("2025-01-19"),
    },
    {
      id: 7,
      product_name: "Freedom Refined Sunflower Oil",
      barcode: "8906035030055",
      mfd: new Date("2024-05-06"),
      expiry_date: new Date("2025-02-05"),
    },
    {
      id: 8,
      product_name: "BRITANNIA Marie Gold",
      barcode: "8901063023901",
      mfd: new Date("2024-04-22"),
      expiry_date: new Date("2024-10-21"),
    },
    {
      id: 9,
      product_name: "BRU Instant Coffee",
      barcode: "8901030904554",
      mfd: new Date("2022-09-29"),
      expiry_date: new Date("2024-03-28"),
    },
    {
      id: 10,
      product_name: "Aashirvaad Whole Wheat Atta",
      barcode: "8901725121747",
      mfd: new Date("2024-04-08"),
      expiry_date: new Date("2024-07-06"),
    },
  ];

  try {
    await Product.insertMany(products);
    res.send({
      message: "Sample products added successfully.",
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error occured in sampling of product.",
      success: false,
      error,
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
