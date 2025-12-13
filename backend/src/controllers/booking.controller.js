import Bookings from "../models/booking.model.js";
import Events from "../models/event.models.js";
import { sendResponse } from "../utils/response-handler.js";

/**
 * Create a new booking
 */
export const createBooking = async (req, res) => {
    try {
        const { eventId, ticketType, guestCount, guestDetails, specialRequests } =
            req.body;
        const userId = req.user._id;

        // 1. Check if event exists
        const event = await Events.findById(eventId);
        if (!event) {
            return sendResponse(res, 404, "Event not found");
        }

        // 2. Check if event is published
        if (event.status !== "PUBLISHED") {
            return sendResponse(res, 400, "Cannot book un-published events");
        }

        // 3. Check capacity
        const currentRegistered = event.registeredCount || 0;
        const totalGuests = Number(guestCount) || 1;
        if (currentRegistered + totalGuests > event.capacity) {
            return sendResponse(res, 400, "Event is fully booked or not enough seats");
        }

        // 4. Create booking
        const booking = await Bookings.create({
            user: userId,
            event: eventId,
            bookingId: "BK-" + Math.floor(100000 + Math.random() * 900000),
            ticketType,
            guestCount: totalGuests,
            guestDetails,
            specialRequests,
            status: "CONFIRMED", // Auto-confirm for now
            paymentStatus: "UNPAID",
        });

        // 5. Update event registered count
        event.registeredCount = currentRegistered + totalGuests;
        await event.save();

        return sendResponse(res, 201, "Booking successful", booking);
    } catch (error) {
        console.error("Booking Error:", error);
        return sendResponse(res, 500, error.message);
    }
};

/**
 * Get bookings for the logged-in user
 */
export const getUserBookings = async (req, res) => {
    try {
        const userId = req.user._id;
        const bookings = await Bookings.find({ user: userId })
            .populate("event", "title eventDate address images category status") // Populate event details
            .sort({ createdAt: -1 });

        return sendResponse(res, 200, "User bookings fetched", bookings);
    } catch (error) {
        return sendResponse(res, 500, error.message);
    }
};

/**
 * Cancel a booking
 */
export const cancelBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const userId = req.user._id;

        const booking = await Bookings.findOne({ _id: bookingId, user: userId });
        if (!booking) {
            return sendResponse(res, 404, "Booking not found");
        }

        if (booking.status === "CANCELLED") {
            return sendResponse(res, 400, "Booking already cancelled");
        }

        // Update status
        booking.status = "CANCELLED";
        await booking.save();

        // Decrease event registered count
        const event = await Events.findById(booking.event);
        if (event) {
            event.registeredCount = Math.max(
                0,
                event.registeredCount - booking.guestCount
            );
            await event.save();
        }

        return sendResponse(res, 200, "Booking cancelled successfully");
    } catch (error) {
        return sendResponse(res, 500, error.message);
    }
};
