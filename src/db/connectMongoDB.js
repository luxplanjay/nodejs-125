import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    const url = process.env.MONGO_URL;
    await mongoose.connect(url);
    console.log("✅ Connected to DB");
  } catch (error) {
    console.log("❌ Ooops, error connecting to db", error);
    process.exit(1);
  }
};
