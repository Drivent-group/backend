import { prisma } from '@/config';

async function findActivityById(activityId: number) {
  return prisma.activity.findFirst({
    /* where: {
      activityId,
    },
    include: {
      venue: true,
    } */
  });
}

async function findActivitiesByDayId(dayId: number) {
  return prisma.activity.findMany({
    where: { dayId },
  });
}
const activitiesRepository = {
  findActivityById,
  findActivitiesByDayId,
};

export default activitiesRepository;
