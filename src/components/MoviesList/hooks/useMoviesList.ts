import { useQuery } from "react-query";
import { MovieSummary } from "../../../models/MovieSummary";
import axios from "axios";

export default function useMoviesList() {
  const { data: cinemaMovies } = useQuery<MovieSummary[], Error>(
    "cinemaList",
    fetchCinemaWorldMovies
  );
  const { data: filmWorldMovies } = useQuery<MovieSummary[], Error>(
    "filmList",
    fetchFilmWorldMovies
  );

  return {
    cinemaMovies,
    filmWorldMovies,
  };
}

const fetchCinemaWorldMovies = async () => {
  const result = await axios.get<MovieSummary[]>(
    "https://webjetapitest.azurewebsites.net/api/cinemaworld/movies",
    {
      headers: {
        "x-access-token": "sjd1HfkjU83ksdsm3802k",
      },
    }
  );
  return result.data;
};

const fetchFilmWorldMovies = async () => {
  const result = await axios.get<MovieSummary[]>(
    "https://webjetapitest.azurewebsites.net/api/filmworld/movies",
    {
      headers: {
        "x-access-token": "sjd1HfkjU83ksdsm3802k",
      },
    }
  );
  return result.data;
};
