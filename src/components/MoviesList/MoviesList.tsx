import React from "react";
import useMoviesList from "./hooks/useMoviesList";

export default function MoviesList() {
  const { cinemaMovies, filmWorldMovies } = useMoviesList();

  return (
    <div>
      <h1>CinemaMovies</h1>
      {cinemaMovies?.map((ms) => (
        <p>{ms.Title}</p>
      ))}
      <h1>FilmMovies</h1>
      {filmWorldMovies?.map((ms) => (
        <p>{ms.Title}</p>
      ))}
    </div>
  );
}
