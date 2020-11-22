import React, { useMemo } from "react";
import { MovieSummary } from "../../models/MovieSummary";
import { Card } from "antd";
import { useQuery } from "react-query";
import { fetchMovieDetail, MovieProvider } from "helpers/MovieApi";
import "./MovieSummaryCard.css";

type Props = {
  summary: MovieSummary;
};

type PriceByProvider = {
  provider: MovieProvider;
  price: number;
};

export default function MovieSummaryCard({ summary }: Props) {
  const { data: detailCine } = useQuery(...fetchMovieDetail("cinemaworld", summary.ID));
  const { data: detailFilm } = useQuery(...fetchMovieDetail("filmworld", summary.ID));

  const priceInfo = useMemo(() => {
    let cheapest = undefined as PriceByProvider | undefined;
    let providerCount = 0;
    [detailCine, detailFilm].forEach((d) => {
      if (d) {
        providerCount++;
        if (!cheapest || d.Price < cheapest.price) {
          cheapest = {
            provider: d.provider,
            price: d.Price,
          };
        }
      }
    });
    return cheapest ? `$${cheapest.price} at ${cheapest.provider} from ${providerCount} providers` : "Still loading..";
  }, [detailFilm, detailCine]);

  // wanted to use the imdb image but it seems they don't allow hotlinking
  return (
    <Card hoverable title={summary.Title} className="movie-summary-card">
      <p>{`Year: ${summary.Year}`}</p>
      <p>{`Cheapest price: ${priceInfo}`}</p>
    </Card>
  );
}
