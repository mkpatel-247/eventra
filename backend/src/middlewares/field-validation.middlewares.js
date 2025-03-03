import { sendResponse } from "../utils/response-handler.js";

/**
 * This middleware will check the request body for the required fields.
 * If any required fields are not present, it will return a 400 response
 * with a message indicating which fields are missing.
 */
export const validateMiddleware = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return sendResponse(res, 400, error.message);
  }
  next();
};
