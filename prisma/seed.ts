import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import pets from "../pet.json";
import owners from "../owner.json";
import posts from "./data/post.json";
import category from "./data/category.json";

const seed = async () => {
  for (let i = 0; i < pets.length; i += 1) {
    const petData = pets[i];
    await prisma.pet.create({ data: petData });
  }
  for (let i = 0; i < owners.length; i += 1) {
    const ownerData = owners[i];
    await prisma.owner.create({
      data: ownerData,
    });
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

  for (let i = 0; i < posts.length; i += 1) {
    const createdPost = posts[i];
    await prisma.post.create({
      data: createdPost,
    });
    console.log(createdPost);
  }

  for (let i = 0; i < category.length; i += 1) {
    const createdCategory = category[i];
    await prisma.category.create({
      data: createdCategory,
    });
    console.log(createdCategory);
  }

  // creating data manually:

  //   await prisma.categoriesOnPosts.create({
  //     data: {
  //       categoryId: 4,
  //       postId: 9,
  //       assignedBy: "tann",
  //     },
  //   });

  // creating many-to-many relation :

  const createdPosts = await prisma.post.findMany();
  const createdCategories = await prisma.category.findMany();

  console.log(createdPosts);
  console.log(createdCategories);

  for (let i = 0; i < createdPosts.length; i++) {
    for (let j = 0; j < createdCategories.length; j++) {
      await prisma.categoriesOnPosts.create({
        data: {
          postId: createdPosts[i].id,
          //   post: {
          //     connect: {
          //       id: createdPosts[i].id,
          //     },
          // },
          categoryId: createdCategories[j].id,
          // category: {
          // connect: {
          //     id: createdCategories[j].id,
          //   },
          // },
          assignedBy: "Seeder", // Replace 'Seeder' with the actual user who assigns the category to the post
        },
      });
    }
  }
};
seed();
