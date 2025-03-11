import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(
            process.env.DATABASE_URL + process.env.DATABASE_NAME
        );
        console.log("MongoDB connected successfully");
        console.log("-----------------------------------");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1);
    }
};
export default connectDB;
