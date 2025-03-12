import express from "express";
import { login, logout, registerUser } from "../controllers/auth.controller.js";
import { validateMiddleware } from "../middlewares/field-validation.middlewares.js";
import { validationSchemas } from "../utils/field-validators.js";
import { isAuthenticated } from "../middlewares/authenticatioin.middlewares.js";

const router = express.Router();

router.post("/login", validateMiddleware(validationSchemas.login), login);
router.post(
  "/register",
  validateMiddleware(validationSchemas.registerUser),
  registerUser
);
router.post("/logout", isAuthenticated, logout);

export default router;
