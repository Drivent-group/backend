import { generateCPF, getStates } from "@brazilian-utils/brazilian-utils";
import faker from "@faker-js/faker";
import { Address, Enrollment } from "@prisma/client";

export async function createEnrollment(userId: number) :  Promise <Enrollment & { Address: Address[]; }>{
    const enrollmentId = faker.datatype.number();

    return {
        id: enrollmentId,
        name: faker.name.findName(),
        cpf: generateCPF(),
        birthday: faker.date.past(),
        phone: faker.phone.phoneNumber("(##) 9####-####"),
        userId: userId,
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        Address: [{
            id: faker.datatype.number(),
            street: faker.address.streetName(),
            cep: faker.address.zipCode(),
            city: faker.address.city(),
            neighborhood: faker.address.city(),
            number: faker.datatype.number().toString(),
            state: faker.helpers.arrayElement(getStates()).name,
            addressDetail: null,
            enrollmentId: enrollmentId,
            createdAt: faker.date.past(),
            updatedAt: faker.date.past()
        }]
    }
}

