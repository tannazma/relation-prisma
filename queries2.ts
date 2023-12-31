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

async function queryLikes() {
  try {
    const userWithLikes = await prisma.user.findUnique({
      where: {
        id: 1,
      },
      include: {
        likes: true,
      },
    });
    console.log(userWithLikes);
  } catch (error) {
    console.log(error);
  }
}
// Find all users who like the song with the title "Song 1".

const AllUsersLikeSong1 = async () => {
  try {
    const songs = await prisma.song.findMany({
      where: {
        title: "Song 1",
      },
      include: {
        likedByUser: true,
      },
    });
    console.log(songs);
  } catch (error) {
    console.log(error);
  }
};

// Find all songs liked by the user with the name "Alice".

const AllSongsLikedByAlice = async () => {
  const userNamedAlice = await prisma.user.findMany({
    where: {
      name: "Alice",
    },
    include: {
      likes: true,
    },
  });
  console.log(userNamedAlice);
};
// Find all songs liked by more than one user
const AllSongsLikedByMoreThan1User = async () => {
  const allSongsLiked = await prisma.song.findMany({
    where: {
      likedByUser: {
        some: {},
      },
    },
    include: {
      likedByUser: true,
    },
  });
  console.log(allSongsLiked);
};
// Find all users who like more than one song.

const AllUsersLikedByMoreThan1Song = async () => {
  const allSongsLiked = await prisma.user.findMany({
    where: {
      likes: {
        some: {},
      },
    },
    include: {
      likes: true,
    },
  });
  console.log(allSongsLiked);
};
// addSongLike();
// queryLikes();
// AllUsersLikeSong1();
// AllSongsLikedByAlice();
AllUsersLikedByMoreThan1Song();
