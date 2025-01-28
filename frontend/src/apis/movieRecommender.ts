import { MOVIE_RECOMMENDER_API_CONFIG } from "../constants/config";
import { request } from "../lib/Axios";
import { isEmptyData } from "../utils/commonUtils";

export const getMovieRecommendation = async ({ genre }: { genre: string }) => {
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
        ...(isEmptyData(genre) ? { genre: "comedy" } : { genre: genre }),
      },
    });
    return {
      success: true,
      data: recommendationList?.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error?.message || "",
      data: [],
    };
  }
};
