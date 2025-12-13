import Events from "../models/event.models.js";
import { catchAsync } from "../utils/api-error.js";
import { sendResponse } from "../utils/response-handler.js";

/**
 * Add new event controller
 */
export const addEvent = catchAsync(async (req, res, next) => {
  const {
    title,
    description,
    startDate,
    endDate,
    capacity,
    category,
    price,
    tags,
    images,
    address,
  } = req.body;

  // Required field validation
  if (!title || !description || !startDate || !endDate || !capacity) {
    return sendResponse(
      res,
      400,
      "Title, description, dates, and capacity are required."
    );
  }

  // Create event with all fields
  const eventData = {
    title,
    description,
    eventDate: {
      startDate,
      endDate,
    },
    capacity: Number(capacity),
    category: category || "Other",
    price: Number(price) || 0,
    tags: tags || [],
    images: images || [],
    address: address || [],
  };

  const newEvent = await Events.create(eventData);
  return sendResponse(res, 201, "Event added successfully.", newEvent);
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
 * Update event
 */
export const updateEvent = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const {
    title,
    description,
    startDate,
    endDate,
    capacity,
    category,
    price,
    tags,
    images,
    address,
  } = req.body;

  const updateData = {
    title,
    description,
    eventDate: {
      startDate,
      endDate,
    },
    capacity: Number(capacity),
    category,
    price: Number(price),
    tags,
    images,
    address,
  };

  const updatedEvent = await Events.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!updatedEvent) {
    return sendResponse(res, 404, "Event not found.");
  }

  return sendResponse(res, 200, "Event updated successfully.", updatedEvent);
});

/**
 * Delete event
 */
export const deleteEvents = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  await Events.findByIdAndUpdate(id, { isDeleted: true });
  return sendResponse(res, 200, "Event deleted successfully.");
});
