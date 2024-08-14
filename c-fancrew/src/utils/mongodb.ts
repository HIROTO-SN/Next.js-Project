import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const uri = process.env.DB_URI;
    if (!uri) {
      throw new Error('DB_URI環境変数が定義されていません');
    }
    await mongoose.connect(uri);
  } catch (error) {
    console.log("MongoDB接続に失敗しました", error);
    throw new Error("MongoDB接続に失敗しました");
  }
}