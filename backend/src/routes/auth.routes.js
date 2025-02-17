import express from "express";
import { login } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", login);
router.post("/register");

export default router;
