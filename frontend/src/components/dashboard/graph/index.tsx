import { BarChart } from "@mui/x-charts/BarChart";
import { graphContainer } from "./style";
import { useGraph } from "@/src/hooks/modules/graph/useGraph";
import LottieApp from "@/src/lib/Lottie";
import graphLoader from "@/public/lottie/graphLoader.json";

const BarGraph = ({ tabValue, isEmotionAnalysisCompleted }: any) => {
  const { graphData, isLoading, isError } = useGraph({
    tabValue,
    isEmotionAnalysisCompleted,
  });

  if (isLoading) {
    return (
      <div className={graphContainer}>
        <LottieApp animationData={graphLoader} height={"150px"} />
      </div>
    );
  }

  if (isError || !graphData) {
    return <div className={graphContainer}>No data available</div>;
  }

  return (
    <BarChart
      height={450}
      dataset={graphData}
      sx={{
        overflowX: "scroll",
      }}
      xAxis={[{ scaleType: "band", dataKey: "dataKey" }]}
      series={[
        { dataKey: "happy", label: "Happy" },
        { dataKey: "neutral", label: "Neutral" },
        { dataKey: "sad", label: "Sad" },
        { dataKey: "angry", label: "Angry" },
      ]}
    />
  );
};

export default BarGraph;
