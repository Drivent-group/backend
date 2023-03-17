import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { postSubscriptionController } from "@/controllers/activities.controller";

const activitiesRouter = Router();

activitiesRouter
  .all("/*", authenticateToken)
  .get("/")
  .get("/", postSubscriptionController)
  .post("/subscription")
  .put("/");

export { activitiesRouter };
