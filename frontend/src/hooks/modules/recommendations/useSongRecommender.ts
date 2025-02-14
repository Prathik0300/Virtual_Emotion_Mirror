import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useUserContext } from "../../useContext/useUserContext";
import { getGenreBasedSongRecommendation } from "@/src/apis/songRecommender";
import { useIntersectionObserver } from "../../useIntersectionObserver";
import { useEffect, useRef, useState } from "react";

export const useSongRecommender = ({ genre = "sad" }) => {
  const {
    userContextValues: { accessToken },
  } = useUserContext();
  const [isFetchingSongData, setIsFetchingSongData] = useState(false);
  const songContainerRef = useRef<HTMLDivElement | null>(null);

  const { targetRef, isIntersecting } = useIntersectionObserver({
    rootRef: songContainerRef,
    threshold: 0.1,
  });

  const {
    data: songs,
    fetchNextPage,
    isLoading,
    isFetching,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [accessToken, genre],
    queryFn: async ({ pageParam = 0 }) =>
      await getGenreBasedSongRecommendation({ genre, pageParam }),
    initialPageParam: 0,
    getPreviousPageParam: (lastPage) => lastPage?.prevOffset ?? null,
    getNextPageParam: (lastPage) => lastPage?.nextOffset ?? null,
  });

  useEffect(() => {
    setIsFetchingSongData(isLoading || isFetching || isFetchingNextPage);
  }, [isLoading, isFetching, isFetchingNextPage]);

  useEffect(() => {
    console.log("isNext page use effect");
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isIntersecting, fetchNextPage]);
  console.log({ hasPreviousPage });
  return {
    songs,
    hasPreviousPage,
    isFetchingSongData,
    songContainerRef,
    targetRef,
    isIntersecting,
  };
};
