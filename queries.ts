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

  // To connect an existing Pet to an existing Owner:

  await prisma.pet.update({
    where: {
      id: 1,
    },
    data: {
      owner: {
        connect: {
          id: 1,
        },
      },
    },
  });

  // if Alice decides that no longer be the owner of Garfield cat
  await prisma.pet.update({
    where: {
      id: 1,
    },
    data: {
      owner: {
        disconnect: true,
      },
    },
  });

  // Which pets are owned by the user that has the name 'Alice'?
  const petsNamedAlice = await prisma.pet.findMany({
    where: {
      owner: {
        name: "Alice",
      },
    },
  });
  console.log(petsNamedAlice);
};

runQuery();
