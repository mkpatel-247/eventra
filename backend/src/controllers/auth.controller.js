import Users from "../models/users.models.js";
import { catchAsync } from "../utils/api-error.js";
import { generateAccessAndRefreshToken } from "../utils/common.js";
import { sendResponse } from "../utils/response-handler.js";

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

  const options = {
    httpOnly: true,
    secure: true,
  };
  res
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options);
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
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  return sendResponse(res, 200, "User logout successfully.");
});
