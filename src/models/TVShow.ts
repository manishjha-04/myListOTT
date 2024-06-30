import mongoose, { Schema, Document } from 'mongoose';
import { Genre } from '../../Genre/Genre';

interface IEpisode {
  episodeNumber: number;
  seasonNumber: number;
  releaseDate: Date;
  director: string;
  actors: string[];
}

export interface ITVShow extends Document {
  id: string;
  title: string;
  description: string;
  genres: Genre[];
  episodes: IEpisode[];
}

const episodeSchema: Schema = new Schema({
  episodeNumber: { type: Number, required: true },
  seasonNumber: { type: Number, required: true },
  releaseDate: { type: Date, required: true },
  director: { type: String, required: true },
  actors: { type: [String], required: true },
});

const tvShowSchema: Schema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  genres: [{ type: String }],
  episodes: [episodeSchema],
});


tvShowSchema.index({ id: 1 });

const TVShow = mongoose.model<ITVShow>('TVShow', tvShowSchema);

export default TVShow;