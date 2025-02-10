import { useQuery } from "@tanstack/react-query";
import { useUserContext } from "../../useContext/useUserContext";
import { getGenreBasedSongRecommendation } from "@/src/apis/songRecommender";

export const useSongRecommender = ({ genre = "sad" }) => {
  const {
    userContextValues: { accessToken },
  } = useUserContext();

  const { data: { albums = {} } = {} } = useQuery({
    queryKey: [accessToken, genre],
    queryFn: async () => await getGenreBasedSongRecommendation({ genre }),
  });
  console.log({ spotify: albums });
  return { albums };
};
