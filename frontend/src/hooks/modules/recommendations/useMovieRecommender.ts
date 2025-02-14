import { useQuery } from "@tanstack/react-query";
import { useUserContext } from "../../useContext/useUserContext";
import { getMovieRecommendation } from "@/src/apis/movieRecommender";
import { useEffect, useState } from "react";
import { getErrorToast } from "@/src/utils/commonUtils";

export const useMovieRecommender = ({ genre }) => {
  const {
    userContextValues: { accessToken },
  } = useUserContext();
  const [isFetchingData, setIsFetchingData] = useState(false);
  const {
    data: { data: { results = [] } = {} } = {},
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: [accessToken, genre],
    queryFn: async () => await getMovieRecommendation({ genre }),
    enabled: !!accessToken && !!genre && false,
  });

  useEffect(() => {
    setIsFetchingData(isLoading || isFetching);
  }, [isLoading, isFetching]);
  useEffect(() => {
    if (!isLoading && isError) {
      getErrorToast("Unable to fetch Movie Recommendations at the moment");
    }
  }, [isError, isLoading]);
  console.log({ accessToken, results });
  return {
    isFetchingData,
    results,
  };
};
