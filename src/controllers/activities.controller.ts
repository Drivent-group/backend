import { AuthenticatedRequest } from "@/middlewares";
import activitiesService from "@/services/activities-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function postSubscriptionController(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { activityId } = req.body;
    
  if(!activityId) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
  try{
    const result = await activitiesService.postSubscription(userId, Number(activityId));

    return res.status(httpStatus.OK).send({
      result
    });
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
