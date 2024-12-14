import express from "express";
import authRoutes from "./auth.routes.js";
import eventRoutes from "./event.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/event", eventRoutes);

export default router;
