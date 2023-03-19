import { prisma } from '@/config';

async function findActivityById(activityId: number) {
  return prisma.activity.findFirst({
    where: {
      id: activityId,
    },
    include: {
      Venue: true,
    },
  });
}

async function findActivitiesForDay(ticketId: number) {
  return await prisma.seat.findMany({
    where: {
      ticketId,
    },
    include: {
      Activity: {
        select: {
          startTime: true,
          endTime: true,
          dayId: true,
        },
      },
    },
  });
}

async function findActivitiesByDayIdWithVenue(dayId: number) {
  return prisma.activity.findMany({
    where: { dayId },
    include: { Venue: { select: { name: true, capacity: true } }, _count: { select: { Seat: true } } },
  });
}

async function createSeat(ticketId: number, activityId: number) {
  return await prisma.seat.create({
    data: {
      ticketId,
      activityId,
    },
  });
}

async function countSeats(activityId: number) {
  return await prisma.seat.findMany({
    where: {
      activityId,
    },
    include: {
      Activity: {
        select: {
          dayId: true
        }
      }
    }    
  });
}

const activitiesRepository = {
  findActivityById,
  findActivitiesByDayIdWithVenue,
  findActivitiesForDay,
  createSeat,
  countSeats,
};

export default activitiesRepository;
