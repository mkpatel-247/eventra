import { catchAsync } from "../utils/apiError";
import { sendResponse } from "../utils/response-handler.js";

export const isAuthenticated = catchAsync((req, res, next) => {
  const { accessToken } = req.cookies;
  if (!accessToken || req.header("Authorization") !== accessToken) {
    return sendResponse(res, 401, "Unauthorized");
  }

  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET_KEY,
    (err, decoded) => {
      if (err) {
        return sendResponse(res, 401, "Invalid token");
      }
      req.user = decoded;
      next();
    }
  );
});
