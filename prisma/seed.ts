import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import pets from "../pet.json";
import owners from "../owner.json";
import posts from "./data/post.json"
import category from "./data/category.json"
import categoryOnPosts from "./data/categoryOnPosts.json"

const seed = async () => {
  for (let i = 0; i < pets.length; i += 1) {
    const petData = pets[i];
    if (petData) {
      await prisma.pet.create({ data: petData });
    }
  }

  //   seedData.pets.forEach(async (pet) => {
  //     const { kind, name } = pet;
  //     const insertPet = await prisma.pet.create({
  //       data: {
  //         name,
  //         kind,
  //       },
  //     });
  //   });
  for (let i = 0; i < owners.length; i+=1) {
    const ownerData = owners[i];
    if (ownerData) {
    }
    await prisma.owner.create({
      data: ownerData,
    });
  }
  try {
    const user1 = await prisma.user.create({
      data: {
        name: "Alice",
        likes: {
          create: [
            {
              title: "Song 1",
              artists: "Artist 1",
            },
            {
              title: "Song 2",
              artists: "Artist 2",
            },
          ],
        },
      },
    });
    console.log(user1);
  } catch (error) {
    console.log(error);
  }

  try {
    const user2 = await prisma.user.create({
      data: {
        name: "Bob",
        likes: {
          create: [
            {
              title: "Song 3",
              artists: "Artist 3",
            },
            {
              title: "Song 4",
              artists: "Artist 4",
            },
          ],
        },
      },
    });
    console.log(user2);
  } catch (error) {
    console.log(error);
  }
};
seed();
