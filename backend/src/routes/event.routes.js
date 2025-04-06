import express from "express";
import { isAuthenticated } from "../middlewares/authentication.middlewares.js";
import { addEvent, getEvents } from "../controllers/event.controller.js";

const router = express.Router();

/** Add/Edit event details. */
router.post("/manage-event/:id?", isAuthenticated, addEvent);
/** Get a list of all events. */
router.get("/list", isAuthenticated, getEvents);

/** Get details of specific event. */
router.get("/details/:id", isAuthenticated);

export default router;
