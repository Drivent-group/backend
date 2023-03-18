import { prisma } from '@/config';

async function findActivityById(activityId: number) {
  return prisma.activity.findFirst({
    where: {
      id: activityId
    },
    include: {
      Venue: true
    }
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
          dayId: true
        }
      }
    }
  });
}   

async function findActivitiesByDayId(dayId: number) {
  return prisma.activity.findMany({
    where: { dayId },
  });
}

async function createSeat(ticketId: number, activityId: number) {
  return await prisma.seat.create({
    data: {
      ticketId,
      activityId
    }
  });
}

async function countSeats(activityId: number) {
  return await prisma.seat.groupBy({
    by: ['id'],
    where: {
      activityId,
    },
    _count: true
  });
}

const activitiesRepository = {
  findActivityById,
  findActivitiesByDayId,
  findActivitiesForDay,
  createSeat, 
  countSeats
};

export default activitiesRepository;
