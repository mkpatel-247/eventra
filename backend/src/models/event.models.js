import mongoose from "mongoose";

const eventDateSchema = new mongoose.Schema({
    startDate: {
        type: Date,
        required: [true, "Must provide start date of event"],
    },
    endDate: {
        type: Date,
        required: [true, "Must provide end date of event"],
    },
});

const addressSchema = new mongoose.Schema({
    city: {
        type: String,
        required: [true, "Must provide event city."],
    },
    area: {
        type: String,
        required: [true, "Must provide event area."],
    },
    fullAddress: {
        type: String,
        required: [true, "Must provide event fullAddress."],
    },
});

const eventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            required: [true, "Must provide event title"],
        },
        description: {
            type: String,
            trim: true,
            required: [true, "Must provide event description"],
        },
        eventDate: {
            type: [eventDateSchema],
        },
        address: {
            type: [addressSchema],
        },
        attendeesLimit: {
            type: Number,
        },
    },
    { timestamps: true }
);

const Events = mongoose.model("Events", eventSchema);
export default Events;
