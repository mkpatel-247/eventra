import Events from "../models/event.models.js";
import { catchAsync } from "../utils/api-error.js";
import { sendResponse } from "../utils/response-handler.js";

/**
 * Add new event controller
 */
export const addEvent = catchAsync(async (req, res, next) => {
  const { title, description, startDate, endDate } = req.body;
  if (!title || !description || !startDate || !endDate) {
    return sendResponse(res, 400, "All fields are required.");
  }
  await Events.create({
    title,
    description,
    eventDate: {
      startDate,
      endDate,
    },
  });
  return sendResponse(res, 200, "Event added successfully.");
});

/**
 * Get Events
 */
export const getEvents = catchAsync(async (req, res, next) => {
  const events = await Events.find({ isDeleted: false });
  return sendResponse(res, 200, "Get event list.", {
    list: events,
    count: events.length,
  });
});

/**
 * Get specific details of event
 */
export const getSpecificEvents = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const event = await Events.findById(id);
  return sendResponse(res, 200, "Get event details.", event);
});

/**
 * Delete event
 */
export const deleteEvents = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  await Events.findByIdAndUpdate(id, { isDeleted: true });
  return sendResponse(res, 200, "Event deleted successfully.");
});
