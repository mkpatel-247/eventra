import mongoose from "mongoose";

const guestDetailSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Guest name is required"],
    },
    age: {
        type: Number,
    },
});

const bookingSchema = new mongoose.Schema(
    {
        bookingId: {
            type: String,
            unique: true,
            required: true,
            default: () => "BK-" + Math.floor(100000 + Math.random() * 900000), // Simple random ID generation
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: [true, "Booking must belong to a user"],
        },
        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Events",
            required: [true, "Booking must be for an event"],
        },
        status: {
            type: String,
            enum: ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED", "CHECKED_IN"],
            default: "CONFIRMED", // Default to confirmed for now until payment gateway is added
        },
        paymentStatus: {
            type: String,
            enum: ["UNPAID", "PAID", "REFUNDED"],
            default: "UNPAID",
        },
        ticketType: {
            type: String,
            default: "General",
        },
        guestDetails: {
            type: [guestDetailSchema],
            default: [],
        },
        guestCount: {
            type: Number,
            default: 1,
        },
        specialRequests: {
            type: String,
        },
        cancellationReason: {
            type: String,
        },
    },
    { timestamps: true }
);

const Bookings = mongoose.model("Bookings", bookingSchema);
export default Bookings;
