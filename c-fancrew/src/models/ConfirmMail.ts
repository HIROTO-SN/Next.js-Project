import mongoose, { Document } from "mongoose";

export interface ConfirmMail {
  mailNo: number;
  email: string;
  token: string;
}

export interface ConfirmMailDocument extends ConfirmMail, Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

const ConfirmMailSchema = new mongoose.Schema<ConfirmMailDocument>({
  mailNo: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: false,
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
}, { timestamps: true });

export const ConfirmMailModel = mongoose.models.ConfirmMail || mongoose.model<ConfirmMailDocument>('ConfirmMail', ConfirmMailSchema);
