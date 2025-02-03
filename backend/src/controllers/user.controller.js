import { catchAsync } from "../utils/apiError";

export const register = catchAsync((req, res, next) => {
    const { email, password } = req.body;
});
