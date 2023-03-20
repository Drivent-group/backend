import activitiesService from "@/services/activities-service";
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketRepository from "@/repositories/ticket-repository";
import faker from "@faker-js/faker";
import { generateCPF, getStates } from "@brazilian-utils/brazilian-utils";
import { Address, Enrollment, Ticket, TicketStatus, TicketType, Activity, Venue, Seat } from "@prisma/client";
import activitiesRepository from "@/repositories/activities-repository.ts";
import { createEnrollment } from "../mocks/enrollmentRepository.mock";
import { createTicket } from "../mocks/ticketRepository.mock";
import { ACTIVITY_CAPACITY, createActivity, createActivityByDay } from "../mocks/activitiesRepository.mock";


describe("Post subscription", () => {

    it("Should create a subscription in an activity", async () => {


        jest.spyOn(enrollmentRepository, "findWithAddressByUserId").mockImplementationOnce((userId) =>  {
            return createEnrollment(userId);
        });

        jest.spyOn(ticketRepository, "findTicketByEnrollmentId").mockImplementationOnce((enrollmentId) => {
            return createTicket(enrollmentId, false);
        })

        jest.spyOn(activitiesRepository, "findActivityById").mockImplementationOnce((activityId) => {
            return createActivity(activityId);
        })

        jest.spyOn(activitiesRepository, "findActivitiesForDay").mockImplementationOnce(() => {
            return createActivityByDay(3);
        });

        async function activityAvailableSeats() : Promise <any> {
            return new Array(Math.floor(Math.random() * (ACTIVITY_CAPACITY - 2) + 1)).fill(0);
        }
       jest.spyOn(activitiesRepository, "countSeats").mockImplementationOnce(() => {
            return activityAvailableSeats();
       })
       
       async function createSeat(ticketId: number) : Promise <Seat> {

        return {
            id: 2,
            ticketId: ticketId,
            activityId: activityId,
            createdAt: new Date('2023-03-30T15:00:00.000Z'),
            updatedAt: new Date('2023-03-30T15:00:00.000Z')
        };
        
       }
       jest.spyOn(activitiesRepository, "createSeat").mockImplementationOnce((ticketId)  => {

            return createSeat(ticketId);

       })
       
       const createdAt = new Date('2023-03-30T15:00:00.000Z');
       const userId = faker.datatype.number();
       const activityId = faker.datatype.number();
       const post = await activitiesService.postSubscription(userId, activityId);

       expect(post.createdAt.toISOString()).toEqual('2023-03-30T15:00:00.000Z');
       expect(post.updatedAt.toISOString()).toEqual('2023-03-30T15:00:00.000Z');
       expect(post.id).toBe(2);
       expect(post.ticketId).toBe(3);
       expect(post.activityId).toBe(activityId);
    });


    it("Should give an error with a remote ticket", async () => {

        jest.spyOn(enrollmentRepository, "findWithAddressByUserId").mockImplementationOnce((userId) =>  {
            return createEnrollment(userId);
        });

        jest.spyOn(ticketRepository, "findTicketByEnrollmentId").mockImplementationOnce((enrollmentId) => {
            return createTicket(enrollmentId, true);
        });
       
        const result =  activitiesService.postSubscription(faker.datatype.number(), faker.datatype.number());

        expect(result).rejects.toEqual({
            name: "RequestError",
            data: null,
            status: 403,
            statusText: ' ticket with irregular status',
            message: "No result for this search!",
        });

    })
})