import mongoose, { Schema, models } from "mongoose";

const PasswordResetOtpSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PasswordResetOtp =
  models.PasswordResetOtp ||
  mongoose.model("PasswordResetOtp", PasswordResetOtpSchema);

export default PasswordResetOtp;