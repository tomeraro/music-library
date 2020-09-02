import { Genre } from './library.enum';

export interface Song {
  id?: number;
  name: string;
  artist: string;
  genere: Genre;
  coverUrl: string;
  releaseDate: Date;
}

export interface AppState {
  readonly songs: Song[];
}