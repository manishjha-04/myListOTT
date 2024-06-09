import mongoose, { Document, Schema } from "mongoose";
enum Genre {
  ACTION = "Action",
  DRAMA = "Drama",
  COMEDY = "Comedy",
  HORROR = "Horror",
}

export interface TVShow extends Document {
  id: string;
  title: string;
  description: string;
  genres: Genre[];
  episodes: Array<{
    episodeNumber: number;
    seasonNumber: number;
    releaseDate: Date;
    director: string;
    actors: string[];
  }>;
}

const EpisodeSchema: Schema = new Schema({
  episodeNumber: { type: Number, required: true },
  seasonNumber: { type: Number, required: true },
  releaseDate: { type: Date, required: true },
  director: { type: String, required: true },
  actors: { type: [String], required: true },
});

export const TVShowSchema: Schema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  genres: { type: [String], enum: Object.values(Genre), required: true },
  episodes: { type: [EpisodeSchema], required: true },
});

const TVShowModel = mongoose.model<TVShow>("TVShow", TVShowSchema);

export default TVShowModel;
