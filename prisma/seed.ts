import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  let tickets = await prisma.ticketType.findMany();
  let hotels = await prisma.hotel.findMany();
  let rooms = await prisma.room.findMany();
  let days = await prisma.day.findMany();
  

 if(hotels.length < 2) {
    await prisma.room.deleteMany({})
    await prisma.hotel.deleteMany({})

    await prisma.hotel.create({
      data: {
        name: 'bahamas', 
        image: 'https://img.freepik.com/vetores-gratis/fundo-de-fachada-plana-hotel_23-2148157379.jpg?w=2000',
      }
    })

    await prisma.hotel.create({
      data: {
        name: 'caribe', 
        image: 'https://www.momondo.com.br/himg/07/5d/30/expediav2-44173-1848004226-710507.jpg',
      }
    })

    hotels = await prisma.hotel.findMany()
  }

  console.log({ hotels });

  for(let i = 0; i < hotels.length; i++){
    let rooms = await prisma.room.findMany({
      where:{
        hotelId: hotels[i].id,
      }
    })

    if(rooms.length < 3) {
      await prisma.room.deleteMany({
        where:{
          hotelId: hotels[i].id,
        }
      })

      await prisma.room.create({
        data: {
          name: 'Single', 
          capacity: 1, 
          hotelId: hotels[i].id,
        }
      })

      await prisma.room.create({
        data: {
          name: 'Double', 
          capacity: 2, 
          hotelId: hotels[i].id,
        }
      })
    
      await prisma.room.create({
        data: {
          name: 'Triple', 
          capacity: 3, 
          hotelId: hotels[i].id,
        }
      })

    }
  }

let rooms = await prisma.room.findMany();

  console.log({ rooms });

    if (!event) {
    event = await prisma.event.create({
      data: {
        title: "Driven.t",
        logoImageUrl: "https://files.driveneducation.com.br/images/logo-rounded.png",
        backgroundImageUrl: "linear-gradient(to right, #FA4098, #FFD77F)",
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, "days").toDate(),
      },
    });
  }

  console.log({ event });

  if (tickets.length < 3) {
    await prisma.ticketType.deleteMany({})

    await prisma.ticketType.create({
      data: {
        name: "Presencial",
        price: 250,
        isRemote: false,
        includesHotel: false,
        updatedAt: dayjs().toDate(),
      },
    })

    await prisma.ticketType.create({
      data: {
        name: "Online",
        price: 100,
        isRemote: true,
        includesHotel: false,
        updatedAt: dayjs().toDate(),
      },
    })

    await prisma.ticketType.create({
      data: {
        name: "Presencial",
        price: 600,
        isRemote: false,
        includesHotel: true,
        updatedAt: dayjs().toDate(),
      },
    })

    tickets = await prisma.ticketType.findMany();
  }

  console.log({ tickets });

  if(hotels.length < 2) {
    await prisma.room.deleteMany({})
    await prisma.hotel.deleteMany({})

    await prisma.hotel.create({
      data: {
        name: 'bahamas', 
        image: 'https://img.freepik.com/vetores-gratis/fundo-de-fachada-plana-hotel_23-2148157379.jpg?w=2000',
      }
    })

    await prisma.hotel.create({
      data: {
        name: 'caribe', 
        image: 'https://www.momondo.com.br/himg/07/5d/30/expediav2-44173-1848004226-710507.jpg',
      }
    })

    hotels = await prisma.hotel.findMany()
  }

  console.log({ hotels });

  for(let i = 0; i < hotels.length; i++){
    rooms = await prisma.room.findMany({
      where:{
        hotelId: hotels[i].id,
      }
    })

    if(rooms.length < 3) {
      await prisma.room.deleteMany({
        where:{
          hotelId: hotels[i].id,
        }
      })

      await prisma.room.create({
        data: {
          name: '101', 
          capacity: 1, 
          hotelId: hotels[i].id,
        }
      })

      await prisma.room.create({
        data: {
          name: '102', 
          capacity: 2, 
          hotelId: hotels[i].id,
        }
      })
    
      await prisma.room.create({
        data: {
          name: '103', 
          capacity: 3, 
          hotelId: hotels[i].id,
        }
      })

    }
  }

 rooms = await prisma.room.findMany();

  console.log({ rooms });

  if(days.length < 3){

    await prisma.day.create({
      data: {
        day:'2023-10-22T01:00:00.067Z'
      }
    })
    
    await prisma.day.create({
      data: {
        day:'2023-10-23T01:00:00.067Z'
      }
    })

    await prisma.day.create({
      data: {
        day:'2023-10-24T01:00:00.067Z'
      }
    })

    days = await prisma.day.findMany();

    console.log({ days });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
