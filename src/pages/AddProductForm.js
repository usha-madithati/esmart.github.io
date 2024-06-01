// src/pages/AddProductForm.jsx
import React, { useState } from "react";
import axios from "axios";

function AddProductForm() {
  const [formData, setFormData] = useState({
    product_name: "",
    barcode: "",
    mfd: "",
    expiry_date: "",
    product_info: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:6352/add-product",
        formData
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="product_name"
        value={formData.product_name}
        onChange={handleChange}
        placeholder="Product Name"
        className="border rounded px-4 py-2 w-full"
      />
      <input
        type="text"
        name="barcode"
        value={formData.barcode}
        onChange={handleChange}
        placeholder="Barcode"
        className="border rounded px-4 py-2 w-full"
      />
      <input
        type="date"
        name="mfd"
        value={formData.mfd}
        onChange={handleChange}
        placeholder="Manufacturing Date"
        className="border rounded px-4 py-2 w-full"
      />
      <input
        type="date"
        name="expiry_date"
        value={formData.expiry_date}
        onChange={handleChange}
        placeholder="Expiry Date"
        className="border rounded px-4 py-2 w-full"
      />
      <textarea
        name="product_info"
        value={formData.product_info}
        onChange={handleChange}
        placeholder="Product Info"
        className="border rounded px-4 py-2 w-full"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Product
      </button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default AddProductForm;
