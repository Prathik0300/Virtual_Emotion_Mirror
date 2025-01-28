import { dashboardContainer, contentContainer, title } from "./style";
import dynamic from "next/dynamic";

const BarGraph = dynamic(() => import("@/src/components/dashboard/graph"), {
  ssr: false,
});

const Dashboard = () => {
  return (
    <div className={dashboardContainer}>
      <p className={title}>Dashboard</p>
      <div className={contentContainer}>
        <BarGraph />
      </div>
    </div>
  );
};

export default Dashboard;
