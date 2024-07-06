import express from "express";
import dotenv from "dotenv";
import dbConnect from "./db/datbase.js";
import Product from "./Schemas/Products.schema.js";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "./Schemas/User.Schema.js";
import client from "./twilioConfig.js";
import crypto from "crypto"; // Add this line
import nodemailer from "nodemailer"; // Add this line
import Review from "./Schemas/Review.schema.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to the database
dbConnect();

// Middleware to authenticate user
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Authorization token is required" });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid authorization token. Login Again" });
  }
};

// TEST API
app.get("/", (req, res) => {
  res.status(200).send("Server started.");
});

// API to delete user account
app.delete("/delete", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.userId;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
});

// API FOR NOTIFICATION SETTINGS

// Ensure the phone number is in E.164 format
const formatPhoneNumber = (phoneNumber) => {
  if (phoneNumber.startsWith("+")) {
    return phoneNumber;
  }
  // Assuming all phone numbers are from India for this example
  const countryCode = "+91";
  return countryCode + phoneNumber;
};

// API FOR NOTIFICATION SETTINGS
app.put("/update-notification", authenticateUser, async (req, res) => {
  const userId = req.user.userId;
  const { notificationPeriod } = req.body;

  if (!notificationPeriod) {
    return res.status(400).json({ message: "Notification period is required" });
  }

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { notificationPeriod },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Ensure the phone number is correctly formatted
    const formattedPhoneNumber = formatPhoneNumber(user.phone);

    // Send SMS to the user's phone number
    const message = `You have selected to receive notifications every ${notificationPeriod}.`;
    await client.messages.create({
      body: message,
      from: process.env.PNUMB,
      to: formattedPhoneNumber,
    });

    return res.status(200).json({
      message: "Notification period updated and SMS sent successfully",
      user,
    });
  } catch (error) {
    console.error("Error updating notification period or sending SMS:", error);
    if (error.code === 21408) {
      return res.status(400).json({
        message:
          "SMS permissions not enabled for this region. Please check your Twilio settings.",
      });
    }
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});

// ANNOUNCEMENT APIS
// API to get announcements
app.post("/announcements", async (req, res) => {
  // reqyest taken from the frontend connection
  const { title, message } = req.body;
  const users = await User.find({}, "email");
  const emailList = users.map((user) => user.email);

  // Set up Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: emailList,
    subject: title,
    text: message,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    res
      .status(200)
      .json({ message: "Announcement posted and email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error posting announcement" });
  }
});

// get all users
app.get("/getallusers", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// get all products info
app.get("/getallproducts", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// APIs
app.get("/users", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({
      message: "Error occurred when fetching user details.",
      error: error.message,
    });
  }
});

app.get("/products", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.userId;
    const products = await Product.find({ addedBy: userId });
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({
      message: "Error occurred when fetching products.",
      error: error.message,
    });
  }
});

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

app.post("/add-product", authenticateUser, async (req, res) => {
  const { product_name, barcode, mfd, expiry_date, product_info } = req.body;
  const userId = req.user.userId;

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
    addedBy: userId,
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

app.post("/scan-product", async (req, res) => {
  const { barcode } = req.body;

  if (!barcode) {
    return res.status(400).send({ message: "Barcode is required" });
  }

  try {
    let product = await Product.findOne({ barcode });

    if (!product) {
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

    const adminEmail = process.env.ADMINMAIL;
    if (email === adminEmail) {
      user.role = 1;
      await user.save();
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).send({ success: true, message: "Login successful", token });
  } catch (error) {
    res.status(500).send({ message: "Error logging in", error: error.message });
  }
});
// Configure nodemailer for email sending
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Route to handle forgot password
app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = crypto.randomBytes(20).toString("hex");

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    const resetURL = `http://localhost:3000/user/reset-password/${token}`;

    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL,
      subject: "Password Reset",
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        ${resetURL}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        console.error("There was an error: ", err);
        res.status(500).json({ message: "Error sending email", error: err });
      } else {
        res.status(200).json({
          success: true,
          message: "Password reset email sent successfully",
        });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Route to handle reset password
app.post("/user/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Password reset token is invalid or has expired." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful!",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
app.put('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).send();
    }
    res.send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});
app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product.", error });
  }
});
// Review Backend


// API to submit a review
app.post("/reviews", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newReview = new Review({ name, email, message });

  try {
    await newReview.save();
    res.status(201).json({
      message: "Review submitted successfully!",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error submitting review",
      success: false,
      error: error.message,
    });
  }
});

// API to get all reviews
app.get("/reviews", async (req, res) => {
  try {
    const reviews = await Review.find({});
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error: error.message });
  }
});



// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
export { server };
