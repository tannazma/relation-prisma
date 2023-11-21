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

  // Log any pet that belongs to a user that is 17 years old

  const petsThatBelongTo17YearOld = await prisma.pet.findMany({
    where: {
      owner: {
        age: 17,
      },
    },
  });
  console.log(petsThatBelongTo17YearOld);

  // Create a new owner with a pet

  const newOwnerWithAPet = await prisma.owner.create({
    data: {
      name: "Albert",
      age: 21,
      pets: {
        create: {
          name: "Fifi",
          kind: "Dog",
        },
      },
    },
  });
  console.log(newOwnerWithAPet);

  //  Log all the owners that own a Bird
  // If you used none: { kind: "Bird" },
  // it would return owners who do not have any pets of kind "Bird".

  const ownersThatOwnABird = await prisma.owner.findMany({
    where: {
      pets: {
        some: {
          kind: "Bird",
        },
      },
    },
  });

  // Hard to me
  // to get the Owner that has the name 'Alice' and all her pets

  const petOwnerNamedAlice = await prisma.owner.findFirst({
    where: {
      name: "Alice",
    },
  });

  console.log(petOwnerNamedAlice);

  if (petOwnerNamedAlice) {
    const allAlicePets = await prisma.pet.findMany({
      where: {
        owner: {
          id: petOwnerNamedAlice.id,
        },
      },
    });
    console.log(allAlicePets);
  } else {
    console.log("not found");
  }
};

runQuery();
