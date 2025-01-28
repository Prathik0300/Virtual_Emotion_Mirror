import { getMovieRecommendation } from "@/src/apis/movieRecommender";
import {
  movieContainer,
  movieContainerTitle,
  movieSuggestionContainer,
  movieTileContainer,
  movieTile,
  ratingIcon,
  ratingContainer,
  movieTitle,
  movieTileContentContainer,
} from "./style";
import { useMovieRecommender } from "@/src/hooks/modules/recommendations/useMovieRecommender";
import Image from "next/image";
import { isEmptyData } from "@/src/utils/commonUtils";
import RatingIcon from "@/public/rating.svg";
import { useState } from "react";

const MovieTile = ({ recommendation }) => {
  const [isImageError, setIsImageError] = useState(false);
  if (isEmptyData(recommendation?.imageurl)) {
    return;
  }

  const handleError = () => {
    setIsImageError(true);
  };

  return (
    <div className={movieTileContainer}>
      <Image
        className={movieTile}
        src={
          isImageError
            ? "/no_image_placeholder.png"
            : recommendation.imageurl[0]
        }
        width={110}
        height={150}
        layout="fixed"
        alt={recommendation.title}
        onError={handleError}
      />
      <div className={movieTileContentContainer}>
        {recommendation.imdbrating && (
          <span className={ratingContainer}>
            <Image
              src={RatingIcon}
              width={12}
              height={12}
              alt="IMDB Rating icon"
              className={ratingIcon}
            />
            {recommendation.imdbrating}
          </span>
        )}
        <p className={movieTitle}>{recommendation.title}</p>
      </div>
    </div>
  );
};

const MovieRecommendation = ({ genre = "comedy" }) => {
  const { results } = useMovieRecommender({ genre });
  console.log({ results });
  return (
    <div className={movieContainer}>
      <p className={movieContainerTitle}>Movies</p>
      <div className={movieSuggestionContainer}>
        {results.map((recommendation) => {
          return <MovieTile recommendation={recommendation} />;
        })}
      </div>
    </div>
  );
};

export default MovieRecommendation;
