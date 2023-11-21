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
};
seed();
