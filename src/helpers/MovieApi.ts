import axios from "axios";
import { MovieDetail } from "models/MovieDetail";
import { MovieSummaries } from "models/MovieSummary";
import { QueryFunction, QueryKey } from "react-query";

export type MovieProvider = 'cinemaworld' | 'filmworld';

export const fetchMovieList = (source: MovieProvider) => [['movielist', source], async () => {
    const result = await axios.get<MovieSummaries>(
        `https://webjetmovies-fa.azurewebsites.net/api/${source}/movies`
    )
    if (result.status === 200) {
        return result.data;
    }
}] as [QueryKey, QueryFunction<MovieSummaries>]

export const fetchMovieDetail = (provider: MovieProvider, movieId: string) => [['moviedetail', movieId, provider], async () => {
    const result = await axios.get<MovieDetail>(
        `https://webjetmovies-fa.azurewebsites.net/api/${provider}/movie/${movieId}`
    );
    if (result.status === 200) {
        return {
            ...result.data,
            provider
        }
    }
    return result.data;
}] as [QueryKey, QueryFunction<MovieDetail>]

