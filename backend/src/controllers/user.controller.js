import Users from "../models/users.models.js";
import { catchAsync } from "../utils/api-error.js";
import {
  cookiesOptions,
  generateAccessAndRefreshToken,
} from "../utils/common.js";
import { sendResponse } from "../utils/response-handler.js";
import jwt from "jsonwebtoken";

/**
 * Login API controller
 */
export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // Check if user exists
  const user = await Users.findOne({ email });
  if (!user) {
    return sendResponse(res, 400, "User not found.");
  }
  // Check the password through custom method of user model
  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    return sendResponse(res, 401, "Invalid credentials.");
  }
  // Generate access and refresh token
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user?._id
  );

  // Store tokens in cookies
  res
    .cookie("accessToken", accessToken, cookiesOptions)
    .cookie("refreshToken", refreshToken, cookiesOptions);
  // Prepare object to send in response of successful login and token in response
  const data = {
    email: user?.email,
    firstName: user.firstName,
    lastName: user.lastName,
    accessToken,
    refreshToken,
  };
  return sendResponse(res, 201, "User login successfully.", data);
});

/**
 * Register User API controller
 */
export const registerUser = catchAsync(async (req, res, next) => {
  const { email, password, firstName, lastName } = req.body;
  const user = await Users.findOne({ email });
  if (user?._id) {
    return sendResponse(res, 400, "User already exists");
  }
  await Users.create({ email, password, firstName, lastName });
  return sendResponse(res, 201, "User registered successfully.");
});

/**
 * Logout API controller
 */
export const logout = catchAsync(async (req, res, next) => {
  await Users.findByIdAndUpdate(req.user._id, { refreshToken: null });

  res.clearCookie("accessToken", cookiesOptions);
  res.clearCookie("refreshToken", cookiesOptions);

  return sendResponse(res, 200, "User logout successfully.");
});

/**
 * Generate new access & refresh token controller
 */
export const generateNewToken = catchAsync(async (req, res, next) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return sendResponse(res, 401, "Unauthorized");
  }

  let decoded;
  try {
    decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY);
  } catch (error) {
    return sendResponse(res, 403, "Invalid or expired refresh token");
  }

  // Check if user exists and refresh token is valid
  const user = await Users.findOne({ _id: decoded._id, refreshToken });
  if (!user) {
    return sendResponse(res, 401, "Unauthorized");
  }

  const { accessToken, refreshToken: newRefreshToken } =
    await generateAccessAndRefreshToken(user._id);

  res
    .cookie("accessToken", accessToken, cookiesOptions)
    .cookie("refreshToken", newRefreshToken, cookiesOptions);
  return sendResponse(res, 200, "Token refresh successfully.", {
    accessToken: accessToken,
    refreshToken: newRefreshToken,
  });
});
