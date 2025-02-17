import { sendResponse } from "./responseHandler.js";

/**
 * Centralize the error handling use this function.
 * use this function and pass any function into it.
 * If any error occur from here it will throw.
 * @param {*} fn - callback function
 * @returns - send API response.
 */
export const catchAsync = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (error) {
        return sendResponse(res, error.statusCode, error.message);
    }
};
