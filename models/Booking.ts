import mongoose, { Schema, models } from "mongoose";

const BookingSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    customerName: {
      type: String,
      required: true,
    },

    customerEmail: {
      type: String,
      required: true,
    },

    customerPhone: {
      type: String,
      required: true,
    },

    serviceName: {
      type: String,
      required: true,
    },

    servicePrice: {
      type: String,
      required: true,
    },

    serviceDuration: {
      type: String,
      required: true,
    },

    barberName: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    note: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Booking =
  models.Booking || mongoose.model("Booking", BookingSchema);

export default Booking;