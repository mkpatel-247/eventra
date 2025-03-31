import Events from "../models/event.models.js";
import { catchAsync } from "../utils/api-error.js";
import { sendResponse } from "../utils/response-handler.js";

/**
 * Add new event controller
 */
export const addEvent = catchAsync(async (req, res, next) => {
  const { title, description, image, startDate, endDate } = req.body;
  if (!title || !description || !startDate || !endDate) {
    return sendResponse(res, 400, "All fields are required.");
  }
  await Events.create({
    title,
    description,
    image,
    eventDate: {
      startDate,
      endDate,
    },
  });
  return sendResponse(res, 200, "Event added successfully.");
});
