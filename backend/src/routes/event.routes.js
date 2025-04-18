import express from "express";
import { isAuthenticated } from "../middlewares/authentication.middlewares.js";
import {
  addEvent,
  deleteEvents,
  getEvents,
  getSpecificEvents,
} from "../controllers/event.controller.js";

const router = express.Router();

/** Get a list of all events. */
router.get("/list", isAuthenticated, getEvents);
/**
 * Add, Edit, Delete Event
 */
router
  .route("/manage-event/:id?")
  .post(isAuthenticated, addEvent)
  .get(isAuthenticated, getSpecificEvents)
  .delete(isAuthenticated, deleteEvents);

/** Get details of specific event. */
router.get("/details/:id", isAuthenticated);

export default router;
