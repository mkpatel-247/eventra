import express from "express";
import { login } from "../controllers/auth.controller.js";
import { validation } from "../middlewares/field-validation.middlewares.js";

const router = express.Router();

router.post("/login", validation("loginRequiredField"), login);
router.post("/register");

export default router;
