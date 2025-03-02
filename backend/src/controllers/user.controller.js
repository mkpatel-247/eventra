import { catchAsync } from "../utils/api-error.js";

export const register = catchAsync((req, res, next) => {
  const { email, password } = req.body;
});
