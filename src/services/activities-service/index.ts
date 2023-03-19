import { conflictError, notFoundError, requestError, unauthorizedError } from '@/errors';
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
  if (!activity) {
    throw notFoundError();
  }

  const userActivitiesByDayId = await activitiesRepository.findActivitiesByDayIdWithVenue(ticket.id);

  userActivitiesByDayId.forEach((seat) => {
    const startTime = seat.Activity.startTime.getTime();
    const endTime = seat.Activity.endTime.getTime();

    if ((startTime >= beginning && startTime <= end) || (endTime >= beginning && endTime <= end)) {
      throw conflictError('activity time conflict');
    }
  });
  const Seats = await activitiesRepository.countSeats(activity.id);
  const numberOfSeats = Seats.length;
  const availableSeats = activity.Venue.capacity - numberOfSeats;

  if (availableSeats <= 0) {
    throw unauthorizedError();
  }

  const post = await activitiesRepository.createSeat(ticket.id, activity.id);
  return post;
}

async function getActivities(dayId: number) {
  const activities = await activitiesRepository.findActivitiesByDayIdWithVenue(dayId);

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
