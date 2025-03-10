import MovieRecommendation from "@/src/components/recommendations/movie";
import {
  recommendationContainer,
  movieRecommendations,
  songRecommendations,
  title,
  recommendationContent,
} from "./style";
import SongRecommendation from "@/src/components/recommendations/songs";
import { useGraphContext } from "@/src/hooks/useContext/useGraphContext";

const Recommendation = () => {
  const {
    graphContextValues: {
      dominantEmotion = "",
      latestGraphData = {},
      latestTransformedGraphData = [],
    },
  } = useGraphContext();
  return (
    <div className={recommendationContainer}>
      <p className={title}>Recommendations</p>
      <div className={recommendationContent}>
        <div className={movieRecommendations}>
          <MovieRecommendation />
        </div>
        <div className={songRecommendations}>
          <SongRecommendation
            latestTransformedGraphData={latestTransformedGraphData}
            latestGraphData={latestGraphData}
            dominantEmotion={dominantEmotion}
          />
        </div>
      </div>
    </div>
  );
};

export default Recommendation;
