import mongoose, { Document } from "mongoose";

export interface SmsConfirm {
  sessionId: string;
  otp: string;
}

export interface SmsConfirmDocument extends SmsConfirm, Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

const SmsConfirmSchema = new mongoose.Schema<SmsConfirmDocument>({
  sessionId: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  }
}, { timestamps: true });

export const SmsConfirmlModel = mongoose.models.SmsConfirm || mongoose.model<SmsConfirmDocument>('SmsConfirm', SmsConfirmSchema);
