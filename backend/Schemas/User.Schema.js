import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  notificationPeriod: {
    type: String,
    default: "3 days",
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
