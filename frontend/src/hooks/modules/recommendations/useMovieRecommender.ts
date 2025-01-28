import { useQuery } from "@tanstack/react-query";
import { useUserContext } from "../../useContext/useUserContext";
import { getMovieRecommendation } from "@/src/apis/movieRecommender";
import { useEffect } from "react";
import { getErrorToast } from "@/src/utils/commonUtils";

export const useMovieRecommender = ({ genre }) => {
  const {
    userContextValues: { accessToken },
  } = useUserContext();
  const {
    data: { data: { results = [] } = {} } = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: [accessToken, genre],
    queryFn: async () => await getMovieRecommendation({ genre }),
    enabled: !!accessToken && !!genre,
  });

  useEffect(() => {
    if (!isLoading && isError) {
      getErrorToast("Unable to fetch Movie Recommendations at the moment");
    }
  }, [isError, isLoading]);
  console.log({ accessToken, results });
  return {
    results,
  };
};
