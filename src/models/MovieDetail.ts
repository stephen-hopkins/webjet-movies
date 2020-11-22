import { MovieProvider } from "helpers/MovieApi";

type MovieDetailDTO = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Poster: string;
  Metascore: string;
  Rating: string;
  Votes: string;
  ID: string;
  Type: string;
  Price: number;
};

export type MovieDetail = MovieDetailDTO & {
  provider: MovieProvider
}
