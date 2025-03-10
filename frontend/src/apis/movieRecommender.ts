import { MOVIE_RECOMMENDER_API_CONFIG } from "../constants/config";
import { request } from "../lib/Axios";
import { isEmptyData } from "../utils/commonUtils";

export const getMovieRecommendation = async ({
  genre = "comedy",
  pageParam = 0,
}) => {
  try {
    const recommendationList = await request(
      process.env.NEXT_PUBLIC_MOVIE_RECOMMENDATION_BASE_URL
    ).get("/advancedsearch", {
      headers: {
        "x-rapidapi-host": process.env.NEXT_PUBLIC_X_RAPIDAPI_HOST,
        "x-rapidapi-key": process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY,
      },
      params: {
        ...MOVIE_RECOMMENDER_API_CONFIG,
        page: pageParam + 1,
        ...(isEmptyData(genre) ? { genre: "comedy" } : { genre: genre }),
      },
    });
    return {
      nextOffset: pageParam + 1,
      prevOffset: pageParam - 1 > 0 ? pageParam - 1 : 0,
      data: recommendationList?.data,
    };
  } catch {
    return { nextOffset: null, prevOffset: null, data: [] };
  }
};
