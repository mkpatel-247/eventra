import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connString = process.env.DATABASE_URL + process.env.DATABASE_NAME;
        await mongoose.connect(connString);
        console.log("MongoDB connected successfully");
        console.log("-----------------------------------");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1);
    }
};
export default connectDB;
