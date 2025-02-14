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
import { getBase64EncodedData, isEmptyData } from "@/src/utils/commonUtils";
import RatingIcon from "@/public/rating.svg";
import { useState } from "react";
import { movieArray } from "@/src/temp/movie";
import CustomDialog from "../../dialog";
import MovieDetails from "./more-details";
import MovieSkeleton from "../../skeletons/movieRecommendation";

const MovieTile = ({ recommendation }) => {
  const [isImageError, setIsImageError] = useState(false);
  const [showMovieDetails, setShowMovieDetails] = useState(false);
  const imagePlaceholder = getBase64EncodedData(110, 150);

  if (isEmptyData(recommendation?.imageurl)) {
    return;
  }

  const movieTileClickHandler = () => {
    setShowMovieDetails((prev) => !prev);
  };

  const handleError = () => {
    setIsImageError(true);
  };

  return (
    <>
      <div className={movieTileContainer}>
        <Image
          onClick={movieTileClickHandler}
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
          placeholder="blur"
          blurDataURL={imagePlaceholder}
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

      <CustomDialog
        open={showMovieDetails}
        onCloseHandler={movieTileClickHandler}
        title={recommendation.title}
      >
        <MovieDetails recommendation={recommendation} />
      </CustomDialog>
    </>
  );
};

const MovieRecommendation = ({ genre = "comedy" }) => {
  const { results, isFetchingData } = useMovieRecommender({ genre });
  console.log({ results });
  return (
    <div className={movieContainer}>
      <p className={movieContainerTitle}>Movies</p>
      {isFetchingData ? (
        <MovieSkeleton />
      ) : (
        <div className={movieSuggestionContainer}>
          {/* {results.map((recommendation) => {
            return <MovieTile recommendation={recommendation} />;
          })} */}
          {movieArray.map((recommendation) => {
            return <MovieTile recommendation={recommendation} />;
          })}
        </div>
      )}
    </div>
  );
};

export default MovieRecommendation;
