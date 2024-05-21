const express = require("express");
const cors = require("cors");
const app = express();
const contactModel=require("./models/Contact")
app.use(express.json());
require("dotenv").config();
const mongoose = require("mongoose");
app.use(cors());



app.get("/", (req, res) => {
  res.send("Working");
});
mongoose
  .connect(process.env.MONGO_URI)
  .then((res) => console.log("Connection successful 🔥🔥🔥🔥"))
  .catch((error) => console.log(error));


app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;
  const result = new contactModel({
    name: name,
    email: email,
    message: message,
  });
  await result.save();
  console.log(result);
})

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
