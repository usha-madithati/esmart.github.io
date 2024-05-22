const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const userRouter=require('./routes/userRouter')

const app = express();
require("dotenv").config();
app.use(express.json());
app.use(cors());

// const contactModel = require("./models/Contact");

// app.get("/", (req, res) => {
//   res.send("Working");
// });
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then((res) => console.log("Connection successful 🔥🔥🔥🔥"))
//   .catch((error) => console.log(error));

// app.post("/contact", async (req, res) => {
//   const { name, email, message } = req.body;
//   const result = new contactModel({
//     name: name,
//     email: email,
//     message: message,
//   });
//   await result.save();
//   console.log(result);
// });

//Routes
app.use('/users',userRouter)

//Connect to mongoDB
const URI = process.env.MONGO_URI
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`MongoDB Connected : ${conn.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit()
    }
}
connectDB()
//Listening on port
const PORT=process.env.PORT
app.listen(PORT, () => {
  console.log("Server is running on port ",PORT);
});
