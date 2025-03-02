import Users from "../models/users.models.js";
import { catchAsync } from "../utils/api-error.js";
import { sendResponse } from "../utils/response-handler.js";

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
