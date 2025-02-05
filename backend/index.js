import express from "express";
import connectDB from "./src/config/db-connect.js";
import authRoutes from "./src/routes/auth.routes.js";
import eventRoutes from "./src/routes/event.routes.js";
import dotenv from "dotenv";
dotenv.config();

dotenv.config(); //.env file configuration.

const PORT = 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();

app.use("/auth", authRoutes);
app.use("/event", eventRoutes);

app.listen(process.env.PORT || PORT, () => {
  console.log(
    `Server is running on port ${
      process.env.PORT || PORT
    } \nPress ctrl + click on http://localhost:${process.env.PORT || PORT}/`
  );
  console.log("-----------------------------------");
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  console.log("Uncaught exception...", err);
  sendApiResponse(res, 500, "Something went wrong.");
});
