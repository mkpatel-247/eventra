/**
 * Sends a standardized API response.
 *
 * @param {Object} res - Express response object.
 * @param {number} statusCode - HTTP status code for the response.
 * @param {string} message - Message describing the result or outcome.
 * @param {Object} data - Optional data payload to include in the response.
 * @returns {Object} The JSON response with status code and message, and data if provided.
 */
export const sendResponse = (res, statusCode, message, data = null) => {
    const response = { statusCode, message };
    if (data) response["data"] = data;
    return res.status(statusCode || 500).send(response);
};
