import Dashboard from "@/src/modules/dashboard";
import Recommendation from "@/src/modules/recommendations";
import dynamic from "next/dynamic";
import {
  homeContainer,
  dashboardContainerWrapper,
  recommendationContainerWrapper,
} from "./style";

const FaceRecognition = dynamic(
  () => import("@/src/components/face-recognition"),
  { ssr: false }
);

const Home = () => {
  return (
    <div className={homeContainer}>
      <div className={dashboardContainerWrapper}>
        <Dashboard />
      </div>
      <div className={recommendationContainerWrapper}>
        <Recommendation />
      </div>

      {/* <FaceRecognition /> */}
    </div>
  );
};

export default Home;
