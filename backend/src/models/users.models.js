import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, "Must provide first name."],
      lowercase: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, "Must provide last name."],
      lowercase: true,
    },
    email: {
      type: String,
      trim: true,
      unique: [true, "Already exists"],
      lowercase: true,
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
    accessToken: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

/**
 * Generate a unique access token
 * @returns unique string
 */
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this.id,
      email: this.email,
      isDelete: this.isDeleted,
    },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

/**
 * Generate a refresh token
 * @returns unique string
 */
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this.id,
    },
    process.env.REFRESH_TOKEN_SECRET_KEY,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

const Users = mongoose.model("Users", userSchema);
export default Users;
