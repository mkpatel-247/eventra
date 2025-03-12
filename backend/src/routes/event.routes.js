import express from "express";
import { isAuthenticated } from "../middlewares/authenticatioin.middlewares";

const router = express.Router();

/** Add/Edit event details. */
router.post("/manage-event/:id?", isAuthenticated);
/** Get a list of all events. */
router.get("/list", isAuthenticated, (req, res, next) => {
  return res.send({ status: 200, message: "Get event list." });
});
/** Get details of specific event. */
router.get("/details/:id", isAuthenticated);

export default router;
