import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const runQuery = async () => {
  try {
    const newPet = await prisma.pet.create({
      data: {
        name: "Porky",
        kind: "Pig",
        owner: {
          connect: {
            id: 1,
          },
        },
      },
    });
    console.log(newPet);
  } catch (error) {
    console.log(error);
  }
};

runQuery();
