import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Must provide name."],
      unique: true,
      lowercase: true, 
      index: true
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      lowecase: true,
      required: [true, "Must provide email"],
    },
    avatar: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Must provide password"],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
