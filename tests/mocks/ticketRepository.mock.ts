import faker from "@faker-js/faker";
import { Ticket, TicketStatus, TicketType } from "@prisma/client";

export async function createTicket(enrollmentId: number, isRemote?: boolean) : Promise <Ticket & { TicketType: TicketType;}>{
    return {
        id: 3,
        ticketTypeId: faker.datatype.number(),
        enrollmentId: enrollmentId,
        status: TicketStatus.PAID,
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        TicketType: {
            id: faker.datatype.number(),
            name: faker.name.firstName(),
            price: parseInt(faker.finance.amount()),
            isRemote: isRemote,
            includesHotel: true,
            createdAt: faker.date.past(),
            updatedAt: faker.date.past()
        }
    }
}   