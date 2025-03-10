import { useInfiniteQuery } from "@tanstack/react-query";
import { useUserContext } from "../../useContext/useUserContext";
import { getGenreBasedSongRecommendation } from "@/src/apis/songRecommender";
import { useIntersectionObserver } from "../../useIntersectionObserver";
import { useEffect, useRef, useState } from "react";
import { useToastMessage } from "../../useToastMessage";
import { getRecommendedSongGenres } from "@/src/utils/recommender";
import { isEmptyData } from "@/src/utils/commonUtils";
import { useGraphContext } from "../../useContext/useGraphContext";

export const useSongRecommender = () => {
  const {
    userContextValues: { accessToken },
  } = useUserContext();
  const { triggerErrorToast } = useToastMessage();
  const [isFetchingSongData, setIsFetchingSongData] = useState(false);
  const songContainerRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const { isIntersecting } = useIntersectionObserver({
    rootRef: songContainerRef,
    threshold: 0.1,
    targetRef: targetRef,
    id: "song-recommendation",
  });

  const {
    graphContextValues: {
      dominantEmotion = "",
      latestTransformedGraphData = [],
    },
  } = useGraphContext();

  const {
    data: songs,
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
      "songs",
      dominantEmotion,
      latestTransformedGraphData.length,
    ],
    queryFn: async ({ pageParam = 0 }) =>
      await getGenreBasedSongRecommendation({
        genre: getRecommendedSongGenres(dominantEmotion),
        pageParam,
      }),
    initialPageParam: 0,
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
    setIsFetchingSongData(isLoading || isFetching || isFetchingNextPage);
  }, [isLoading, isFetching, isFetchingNextPage]);

  useEffect(() => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isIntersecting, fetchNextPage]);

  useEffect(() => {
    if (isError && typeof triggerErrorToast === "function") {
      triggerErrorToast("Unable to fetch song recommendation");
    }
  }, [isError, triggerErrorToast]);

  return {
    songs,
    hasPreviousPage,
    isFetchingSongData,
    songContainerRef,
    targetRef,
    isIntersecting,
  };
};
