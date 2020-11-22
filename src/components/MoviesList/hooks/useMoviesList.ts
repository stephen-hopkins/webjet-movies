import { useQuery } from "react-query";
import { MovieSummaries, MovieSummary } from "models/MovieSummary";
import { fetchMovieList, MovieProvider } from "helpers/MovieApi";
import { useMemo } from "react";

export default function useMoviesList() {
  const { data: cinemaMovies, error: cinemaMoviesError, isSuccess: cinemaMoviesSuccess } = useQuery<MovieSummaries, Error>(
    ...fetchMovieList('cinemaworld')
  );

  const { data: filmWorldMovies, error: filmMoviesError, isSuccess: filmMoviesSuccess } = useQuery<MovieSummaries, Error>(
    ...fetchMovieList('filmworld')
  );

  const allMovies = useMemo(() => {
    // assumption - movie ids match from the 2 services (excl first 2 letters)
    const added = new Set();
    const results = [] as MovieSummary[]
    [cinemaMovies, filmWorldMovies].forEach(ms => {
      ms?.Movies.forEach(m => {
        const commonId = m.ID.substr(2);
        if (!added.has(commonId)) {
          results.push(m);
          added.add(commonId);
        }
      })
    })
    return results;
  }, [cinemaMovies, filmWorldMovies])

  const loadingPercent = useMemo(() => {
    let success = 0;
    [cinemaMoviesSuccess, filmMoviesSuccess].forEach(s => {
      if (s) {
        success++;
      }
    });
    return (success / 2) * 100;
  }, [cinemaMoviesSuccess, filmMoviesSuccess])

  const errors = useMemo(() => {
    let errors = [] as MovieProvider[];
    if (cinemaMoviesError) {
      errors.push('cinemaworld')
    }
    if (filmMoviesError) {
      errors.push('filmworld')
    }
  }, [cinemaMoviesError, filmMoviesError])

  return {
    allMovies,
    loadingPercent,
    errors
  };
}
