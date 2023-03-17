import { notFoundError, requestError } from "@/errors";
import activitiesRepository from "@/repositories/activities-repository.ts";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";

async function postSubscription(userId: number, activityId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  
  if (!enrollment) {
    throw notFoundError();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  
  if (!ticket || ticket.status === "RESERVED" || ticket.TicketType.isRemote) {
    throw requestError(403, " ticket with irregular status");
  }

  const activity = await activitiesRepository.findActivityById(activityId);
  const dateId = activity.dateId;

  const userActivitiesByDayiD = await activitiesRepository.findActivitiesForDay(dateId, ticket.id);

  const conflict = userActivitiesByDayiD;
}

const activitiesService = {
  postSubscription
};

export default activitiesService;
