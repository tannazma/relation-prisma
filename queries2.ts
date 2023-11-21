import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function addSongLike() {
  // Assuming the song with id 1 and user with id 1 exist
  try {
    const updatedSong = await prisma.song.update({
      where: {
        id: 1,
      },
      data: {
        likedByUser: {
          connect: { id: 1 },
        },
      },
    });
    console.log(updatedSong);
  } catch (err) {
    console.log(err);
  }
}

addSongLike();
