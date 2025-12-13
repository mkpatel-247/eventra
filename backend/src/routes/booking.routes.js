import express from "express";
import {
    createBooking,
    getUserBookings,
    cancelBooking,
} from "../controllers/booking.controller.js";
import { isAuthenticated } from "../middlewares/authentication.middlewares.js";

const router = express.Router();

// All routes require authentication
router.use(isAuthenticated);

router.post("/", createBooking);
router.get("/", getUserBookings);
router.post("/:bookingId/cancel", cancelBooking);

export default router;
