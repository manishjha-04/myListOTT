import mongoose, { Schema, Document } from 'mongoose';
import { Genre } from '../../Genre/Genre';


export interface IMovie extends Document {
  id: string;
  title: string;
  description: string;
  genres: Genre[];
  releaseDate: Date;
  director: string;
  actors: string[];
}

const movieSchema: Schema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  genres: [{ type: String }],
  releaseDate: { type: Date, required: true },
  director: { type: String, required: true },
  actors: [{ type: String }],
});

movieSchema.index({ id: 1 });

const Movie = mongoose.model<IMovie>('Movie', movieSchema);
export default Movie;