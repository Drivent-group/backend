import faker from "@faker-js/faker";
import { Activity, Seat, Venue } from "@prisma/client";

 

export async function createActivityByDay(ticketId: number) : Promise<(Seat & {
    Activity: {
        dayId: number;
        startTime: Date;
        endTime: Date;
    };
})[]>{

    return [
        {
            id: faker.datatype.number(),
            ticketId: ticketId,
            activityId: 1,
            Activity: {
                startTime: new Date('2023-04-01T16:00:00.000Z'),
                endTime: new Date('2023-04-01T18:00:00.000Z'),
                dayId: faker.datatype.number()
            },
            createdAt: faker.date.past(),
            updatedAt: faker.date.past()
        }
    ]
}  

export const ACTIVITY_CAPACITY = 30;

export async function createActivity(activityId: number) : Promise< Activity & { Venue: Venue; } >{

    return {
        id: activityId,
        name: faker.name.firstName(),
        startTime: new Date('2023-04-01T13:00:00.000Z'),
        endTime: new Date('2023-04-01T15:00:00.000Z'),
        dayId: faker.datatype.number(),
        venueId: faker.datatype.number(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        Venue: {
            id: faker.datatype.number(),
            name: faker.name.firstName(),
            capacity: ACTIVITY_CAPACITY,
            createdAt: faker.date.past(),
            updatedAt: faker.date.past(),
        }
    }
}