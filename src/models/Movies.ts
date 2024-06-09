import mongoose, { Document, Schema } from "mongoose";

enum Genre {
  ACTION = "Action",
  DRAMA = "Drama",
  COMEDY = "Comedy",
  HORROR = "Horror",
}

export interface Movie extends Document {
  id: string;
  title: string;
  description: string;
  genres: Genre[];
  releaseDate: Date;
  director: string;
  actors: string[];
}

export const MovieSchema: Schema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  genres: { type: [String], enum: Object.values(Genre), required: true },
  releaseDate: { type: Date, required: true },
  director: { type: String, required: true },
  actors: { type: [String], required: true },
});

const MovieModel = mongoose.model<Movie>("Movie", MovieSchema);

export default MovieModel;
