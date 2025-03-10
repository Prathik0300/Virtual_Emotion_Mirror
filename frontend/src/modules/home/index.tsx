import Recommendation from "@/src/modules/recommendations";
import dynamic from "next/dynamic";
import {
  homeContainer,
  dashboardContainerWrapper,
  recommendationContainerWrapper,
} from "./style";
import DashboardSkeleton from "@/src/components/skeletons/dashboard";

const Dashboard = dynamic(() => import("@/src/modules/dashboard"), {
  ssr: false,
  loading: () => <DashboardSkeleton />,
});

const Home = () => {
  return (
    <div className={homeContainer}>
      <div className={dashboardContainerWrapper}>
        <Dashboard />
      </div>
      <div className={recommendationContainerWrapper}>
        <Recommendation />
      </div>
    </div>
  );
};

export default Home;
