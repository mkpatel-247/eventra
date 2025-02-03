import Users from "../models/users.models";
import { catchAsync } from "../utils/apiError";
import { sendResponse } from "../utils/responseHandler";

export const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (email && password) {
        const user = await Users.findOne({ email, password });
        if (user?._id) {
            await user.updateOne(
                { $set: { accessToken: "", refreshToken: "" } },
                { _id: user?._id }
            );
        }
    }
    return sendResponse(res, 201, "User register successfully.");
});
