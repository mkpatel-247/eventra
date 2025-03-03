import Users from "../models/users.models.js";
import { catchAsync } from "../utils/api-error.js";
import { sendResponse } from "../utils/response-handler.js";

/**
 * Login API controller
 */
export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email, password });
  if (user?._id) {
    await user.updateOne(
      { $set: { accessToken: "", refreshToken: "" } },
      { _id: user?._id }
    );
    return sendResponse(res, 201, "User login successfully.");
  }
  return sendResponse(res, 400, "User failed to login");
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
