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
  initialFetchContainer,
} from "./style";
import { useMovieRecommender } from "@/src/hooks/modules/recommendations/useMovieRecommender";
import Image from "next/image";
import { getBase64EncodedData, isEmptyData } from "@/src/utils/commonUtils";
import RatingIcon from "@/public/rating.svg";
import { useState } from "react";
import CustomDialog from "../../dialog";
import MovieDetails from "./more-details";
import MovieSkeleton from "../../skeletons/movieRecommendation";
import LottieApp from "@/src/lib/Lottie";
import recommendationLoader from "@/public/lottie/recommendationLoader.json";

const MovieTile = ({ recommendation, targetRef }) => {
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
      <div ref={targetRef} className={movieTileContainer}>
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

const MovieRecommendation = () => {
  const {
    movies,
    hasPreviousPage,
    isFetchingMovieData,
    movieContainerRef,
    targetRef,
  } = useMovieRecommender();

  return (
    <div className={movieContainer}>
      <p className={movieContainerTitle}>Movies</p>
      {!hasPreviousPage && isFetchingMovieData ? (
        <div className={initialFetchContainer}>
          <LottieApp animationData={recommendationLoader} height={"80px"} />
        </div>
      ) : (
        <div ref={movieContainerRef} className={movieSuggestionContainer}>
          {!isEmptyData(movies?.pages) &&
            movies?.pages.map((page, pageIndex) => {
              console.log("!>>> L : ", page);
              return (
                !isEmptyData(page?.data?.results) &&
                page?.data?.results?.map((recommendation, movieIndex) => {
                  const isLast =
                    pageIndex === movies.pages.length - 1 &&
                    movieIndex === page.data.results.length - 1;
                  return (
                    <MovieTile
                      targetRef={isLast ? targetRef : null}
                      key={`${recommendation.title}-${movieIndex}`}
                      recommendation={recommendation}
                    />
                  );
                })
              );
            })}
        </div>
      )}
      {(hasPreviousPage && isFetchingMovieData) ||
        (isEmptyData(movies?.pages.data) && <MovieSkeleton />)}
    </div>
  );
};

export default MovieRecommendation;
