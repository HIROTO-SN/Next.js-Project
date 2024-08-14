import mongoose, { Document } from "mongoose";

export interface User {
  email: string;
  password: string;
}

export interface UserDocument extends User, Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema<UserDocument>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
}, { timestamps: true });

export const UserModel = mongoose.models.User || mongoose.model<UserDocument>('User', UserSchema);