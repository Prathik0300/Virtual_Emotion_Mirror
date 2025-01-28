import { BarChart } from "@mui/x-charts/BarChart";
import { barChartStyles } from "./style";

const BarGraph = () => {
  return (
    <BarChart
      height={450}
      xAxis={[{ scaleType: "band", data: ["group A", "group B", "group C"] }]}
      series={[
        { data: [4, 3, 5], label: "Happy" },
        { data: [1, 6, 3], label: "Sad" },
        { data: [2, 5, 6], label: "Angry" },
        { data: [6, 2, 11], label: "Neutral" },
      ]}
    />
  );
};

export default BarGraph;
