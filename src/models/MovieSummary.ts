export type MovieSummary = {
  Year: string;
  ID: string;
  Type: string;
  Poster: string;
  Title: string;
};

export type MovieSummaries = {
  Movies: MovieSummary[]
};
