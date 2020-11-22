import React from "react";
import MovieSummaryCard from "components/MovieSummaryCard/MovieSummaryCard";
import useMoviesList from "./hooks/useMoviesList";
import { Progress } from "antd";

export default function MoviesList() {
  const { allMovies, loadingPercent } = useMoviesList();

  return (
    <div>
      <h1>Available Movies</h1>
      {allMovies.map((ms) => (
        <MovieSummaryCard summary={ms} />
      ))}
      <Progress percent={loadingPercent} />
    </div>
  );
}
