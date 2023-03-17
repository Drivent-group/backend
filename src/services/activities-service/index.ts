import { notFoundError, requestError } from '@/errors';
import activitiesRepository from '@/repositories/activities-repository.ts';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketRepository from '@/repositories/ticket-repository';

async function postSubscription(userId: number, activityId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) {
    throw notFoundError();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket || ticket.status === 'RESERVED' || ticket.TicketType.isRemote) {
    throw requestError(403, ' ticket with irregular status');
  }

  const activity = await activitiesRepository.findActivityById(activityId);
  const dateId = activity.dayId;

  const userActivitiesByDayiD = await activitiesRepository.findActivitiesByDayId(dateId);

  const conflict = userActivitiesByDayiD;
}

async function getActivities(dayId: number) {
  console.log('🚀 ~ file: index.ts:28 ~ getActivities ~ dayId:', dayId);
  const activities = await activitiesRepository.findActivitiesByDayId(dayId);

  if (activities.length === 0) {
    throw notFoundError();
  }

  return activities;
}

const activitiesService = {
  postSubscription,
  getActivities,
};

export default activitiesService;
