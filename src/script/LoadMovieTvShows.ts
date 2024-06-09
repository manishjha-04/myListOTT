import mongoose from "mongoose";
import MovieModel from "../models/Movies"
import TVShowModel from "../models/TVShow";
import movieData from "./movieDummyData";
import tvShowData from "./tvShowDummyData";
import dotenv from "dotenv";

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

// Function to load dummy data for movies
const loadMovieData = async () => {
  try {
    await MovieModel.deleteMany(); // Clear existing data
    const movies = await MovieModel.insertMany(movieData); // Insert dummy data
    console.log(
      "Movie data loaded successfully:",
      movies.length,
      "movies inserted."
    );
  } catch (error) {
    console.error("Error loading movie data:", error);
  }
};

// Function to load dummy data for TV shows
const loadTVShowData = async () => {
  try {
    await TVShowModel.deleteMany(); // Clear existing data
    const tvShows = await TVShowModel.insertMany(tvShowData); // Insert dummy data
    console.log(
      "TV show data loaded successfully:",
      tvShows.length,
      "TV shows inserted."
    );
  } catch (error) {
    console.error("Error loading TV show data:", error);
  }
};

// Call functions to load dummy data
Promise.all([loadMovieData(), loadTVShowData()]).then(() => {
  // Disconnect from MongoDB after loading data
  mongoose.disconnect();
});
