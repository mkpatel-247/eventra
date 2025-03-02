import express from "express";
import { login } from "../controllers/auth.controller.js";
import { requiredFields } from "../middlewares/field-validation.middlewares.js";
import { loginRequiredField } from "../utils/field-validators.js";

const router = express.Router();

router.post("/login", requiredFields(loginRequiredField), login);
router.post("/register");

export default router;
