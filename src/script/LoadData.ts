import mongoose from "mongoose";
import User from "../models/User";
import dotenv from "dotenv";

dotenv.config();

const users = [
  {
    id: "user001",
    username: "john_doe",
    preferences: {
      favoriteGenres: ["Action", "Adventure"],
      dislikedGenres: ["Horror"],
    },
    watchHistory: [
      {
        contentId: "movie001",
        watchedOn: "2023-01-15T00:00:00.000Z",
        rating: 5,
      },
      {
        contentId: "movie002",
        watchedOn: "2023-02-20T00:00:00.000Z",
        rating: 4,
      },
    ],
    myList: [],
  },
  {
    id: "user002",
    username: "jane_smith",
    preferences: {
      favoriteGenres: ["Romance", "Drama"],
      dislikedGenres: ["Action"],
    },
    watchHistory: [
      {
        contentId: "movie003",
        watchedOn: "2023-03-10T00:00:00.000Z",
        rating: 3,
      },
      {
        contentId: "movie004",
        watchedOn: "2023-04-05T00:00:00.000Z",
      },
    ],
    myList: [],
  },
  {
    id: "user003",
    username: "alice_wonder",
    preferences: {
      favoriteGenres: ["Comedy", "Sci-Fi"],
      dislikedGenres: ["Drama"],
    },
    watchHistory: [
      {
        contentId: "movie005",
        watchedOn: "2023-05-15T00:00:00.000Z",
        rating: 4,
      },
      {
        contentId: "movie001",
        watchedOn: "2023-06-10T00:00:00.000Z",
      },
    ],
    myList: [],
  },
  {
    id: "user004",
    username: "bob_marley",
    preferences: {
      favoriteGenres: ["Horror", "Thriller"],
      dislikedGenres: ["Comedy"],
    },
    watchHistory: [
      {
        contentId: "movie002",
        watchedOn: "2023-07-20T00:00:00.000Z",
        rating: 2,
      },
      {
        contentId: "movie003",
        watchedOn: "2023-08-10T00:00:00.000Z",
        rating: 3,
      },
    ],
    myList: [],
  },
  {
    id: "user005",
    username: "charlie_brown",
    preferences: {
      favoriteGenres: ["Drama", "Adventure"],
      dislikedGenres: ["Sci-Fi"],
    },
    watchHistory: [
      {
        contentId: "movie004",
        watchedOn: "2023-09-01T00:00:00.000Z",
        rating: 5,
      },
      {
        contentId: "movie005",
        watchedOn: "2023-10-15T00:00:00.000Z",
      },
    ],
    myList: [],
  },
];


const loadData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB myListDB");

    await User.deleteMany({});
    console.log("Cleared existing data");

    await User.insertMany(users);
    console.log("Dummy data loaded successfully");

    await mongoose.connection.close();
    console.log("Connection closed");
  } catch (error) {
    console.error("Error loading data:", error);
    process.exit(1);
  }
};

loadData();
