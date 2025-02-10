import MovieRecommendation from "@/src/components/recommendations/movie";
import {
  recommendationContainer,
  movieRecommendations,
  songRecommendations,
  title,
  recommendationContent,
} from "./style";
import SongRecommendation from "@/src/components/recommendations/songs";

const Recommendation = () => {
  return (
    <div className={recommendationContainer}>
      <p className={title}>Recommendations</p>
      <div className={recommendationContent}>
        <div className={movieRecommendations}>
          <MovieRecommendation />
        </div>
        <div className={songRecommendations}>
          <SongRecommendation />
        </div>
      </div>
    </div>
  );
};

export default Recommendation;
