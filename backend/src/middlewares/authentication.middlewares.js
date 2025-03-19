import Users from "../models/users.models.js";
import { catchAsync } from "../utils/api-error.js";
import { sendResponse } from "../utils/response-handler.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsync(async (req, res, next) => {
  const { accessToken } = req.headers;

  if (!accessToken) {
    return sendResponse(res, 401, "Unauthorized");
  }
  try {
    const decoded = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET_KEY
    );
    const user = await Users.findById(decoded._id).select(
      "-password -refreshToken"
    );
    if (user) {
      req.user = user;
      return next();
    }
    throw new Error();
  } catch (error) {
    return sendResponse(res, 401, "Invalid token");
  }
});
