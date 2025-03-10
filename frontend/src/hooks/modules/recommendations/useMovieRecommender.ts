import { useInfiniteQuery } from "@tanstack/react-query";
import { useUserContext } from "../../useContext/useUserContext";
import { getMovieRecommendation } from "@/src/apis/movieRecommender";
import { useEffect, useRef, useState } from "react";
import { useGraphContext } from "../../useContext/useGraphContext";
import { getRecommendedMovieGenres } from "@/src/utils/recommender";
import { movieArray } from "@/src/temp/movie";
import { useIntersectionObserver } from "../../useIntersectionObserver";
import { useToastMessage } from "../../useToastMessage";
import { isEmptyData } from "@/src/utils/commonUtils";

export const useMovieRecommender = () => {
  const {
    userContextValues: { accessToken },
  } = useUserContext();

  const {
    graphContextValues: {
      dominantEmotion = "",
      latestTransformedGraphData = [],
    },
  } = useGraphContext();

  const movieContainerRef = useRef<HTMLDivElement | null>(null);
  const { triggerErrorToast } = useToastMessage();
  const [isFetchingMovieData, setIsFetchingMovieData] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);

  const { isIntersecting } = useIntersectionObserver({
    rootRef: movieContainerRef,
    threshold: 0.1,
    targetRef: targetRef,
    id: "movie-recommendation",
  });

  const {
    data: movies,
    fetchNextPage,
    isLoading,
    isFetching,
    isError,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: [
      accessToken,
      "movies",
      dominantEmotion,
      latestTransformedGraphData.length,
    ],
    queryFn: async ({ pageParam = 0 }) =>
      await getMovieRecommendation({
        genre: getRecommendedMovieGenres(dominantEmotion),
        pageParam,
      }),
    initialPageParam: 0,
    enabled: !!accessToken,
    getPreviousPageParam: (lastPage) => lastPage?.prevOffset ?? null,
    getNextPageParam: (lastPage) => lastPage?.nextOffset ?? null,
    staleTime: 0,
  });

  useEffect(() => {
    if (!isEmptyData(latestTransformedGraphData)) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch, latestTransformedGraphData.length]);

  useEffect(() => {
    setIsFetchingMovieData(isLoading || isFetching || isFetchingNextPage);
  }, [isLoading, isFetching, isFetchingNextPage]);

  useEffect(() => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isIntersecting, fetchNextPage]);

  useEffect(() => {
    if (isError && typeof triggerErrorToast === "function") {
      triggerErrorToast("Unable to fetch Movie Recommendations at the moment");
    }
  }, [isError, triggerErrorToast]);

  return {
    movies,
    hasPreviousPage,
    isFetchingMovieData,
    movieContainerRef,
    targetRef,
    isIntersecting,
  };
};
