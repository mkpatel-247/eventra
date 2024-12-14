import express from "express";

const router = express.Router();

/** Add/Edit event details. */
router.post("/manage-event/:id?");
/** Get a list of all events. */
router.get("/list");
/** Get details of specific event. */
router.get("/details/:id");

export default router;
