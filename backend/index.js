import express from "express";
import connectDB from "./src/config/db-connect.js";
import userRoutes from "./src/routes/user.routes.js";
import eventRoutes from "./src/routes/event.routes.js";
import bookingRoutes from "./src/routes/booking.routes.js";
import dotenv from "dotenv";
import { sendResponse } from "./src/utils/response-handler.js";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();

dotenv.config(); //.env file configuration.

const PORT = 3000;
const app = express();

app.use(cors({
  origin: "*", // Allow all origins for initial scaling/testing. Change to specific domains in production.
  credentials: true
}));
app.use(express.static("public"));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

await connectDB();

app.use((req, _, next) => {
  console.log("Request URL:", req.url);
  next();
});

app.use("/user", userRoutes);
app.use("/event", eventRoutes);
app.use("/booking", bookingRoutes);

app.listen(process.env.PORT || PORT, () => {
  console.log(
    `Server is running on port ${process.env.PORT || PORT
    } \nPress ctrl + click on http://localhost:${process.env.PORT || PORT}/`
  );
  console.log("-----------------------------------");
});

app.use(function (err, req, res, next) {
  // res.status(err.status || 500);
  console.log(
    "-----------------------------------------------------------------------"
  );
  console.log("Uncaught exception...", err);
  sendResponse(res, 500, "Something went wrong.");
  console.log(
    "-----------------------------------------------------------------------"
  );
});
