import { prisma } from "@/config";

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

async function findActivitiesForDay(dateId: number, ticketId: number) {
  /* await prisma.seat.findMany({
    where: {
      ticketId,
    },
    include: {
      activity: {
        where: {
          dateId: dateId,
        },
      }
    }
  });  */  
}
const activitiesRepository = {
  findActivityById,
  findActivitiesForDay
};

export default activitiesRepository;
