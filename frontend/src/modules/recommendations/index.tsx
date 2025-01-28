import MovieRecommendation from "@/src/components/recommendations/movie";
import {
  recommendationContainer,
  movieRecommendations,
  songRecommendations,
  title,
} from "./style";

const Recommendation = () => {
  return (
    <div className={recommendationContainer}>
      <p className={title}>Recommendations</p>
      <div className={movieRecommendations}>
        <MovieRecommendation />
      </div>
      <div className={songRecommendations}></div>
    </div>
  );
};

export default Recommendation;
