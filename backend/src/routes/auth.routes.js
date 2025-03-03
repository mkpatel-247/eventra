import express from "express";
import { login, registerUser } from "../controllers/auth.controller.js";
import { validateMiddleware } from "../middlewares/field-validation.middlewares.js";
import { validationSchemas } from "../utils/field-validators.js";

const router = express.Router();

router.post("/login", validateMiddleware(validationSchemas.login), login);
router.post(
  "/register",
  validateMiddleware(validationSchemas.registerUser),
  registerUser
);

export default router;
