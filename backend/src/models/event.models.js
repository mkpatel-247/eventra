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
    images: {
      type: [String], // Array of image URLs
      default: [],
    },
    category: {
      type: String,
      enum: ["Music", "Tech", "Sports", "Workshop", "Social", "Other"],
      default: "Other",
    },
    tags: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["DRAFT", "PUBLISHED", "CANCELLED"],
      default: "PUBLISHED",
    },
    price: {
      type: Number,
      default: 0,
    },
    capacity: {
      type: Number,
      required: [true, "Must provide event capacity"],
      min: [1, "Capacity must be at least 1"],
    },
    registeredCount: {
      type: Number,
      default: 0,
    },
    eventDate: {
      type: eventDateSchema,
    },
    address: {
      type: [addressSchema],
    },
    // attendeesLimit: { type: Number }, // Deprecated in favor of 'capacity'
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Events = mongoose.model("Events", eventSchema);
export default Events;
