import { requiredFields } from "../utils/field-validators.js";
import { sendResponse } from "../utils/response-handler.js";

/**
 * This middleware will check the request body for the required fields.
 * If any required fields are not present, it will return a 400 response
 * with a message indicating which fields are missing.
 */
export const validation = (schema) => {
  return (req, res, next) => {
    const fieldSchema = requiredFields[schema];
    const { error } = fieldSchema.validate(req?.body);
    if (error) {
      return sendResponse(res, 400, error.message);
    }
    next();
  };
};
