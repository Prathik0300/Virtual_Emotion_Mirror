import { useFaceRecognitionController } from "@/src/components/face-recognition/controller/useFaceRecognitionController";
import { dashboardContainer, contentContainer, title } from "./style";
import dynamic from "next/dynamic";
import { Button } from "@mui/material";
import AnalyzeButton from "@/src/components/button/analyze";

const BarGraph = dynamic(() => import("@/src/components/dashboard/graph"), {
  ssr: false,
});

const FaceRecognition = dynamic(
  () => import("@/src/components/face-recognition"),
  {
    ssr: false,
    loading: () => <AnalyzeButton />,
  }
);
const Dashboard = () => {
  const {
    isCameraActive,
    videoRef,
    isCameraLoading,
    canvasRef,
    startCamera,
    stopCamera,
  } = useFaceRecognitionController();
  return (
    <div className={dashboardContainer}>
      <p className={title}>Dashboard</p>
      <div className={contentContainer}>
        <BarGraph />
      </div>
      <div>
        <Button
          onClick={isCameraActive ? stopCamera : startCamera}
          style={{
            padding: "10px 20px",
            marginBottom: "10px",
            backgroundColor: isCameraActive ? "red" : "green",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Analyze My Emotion
        </Button>
        <FaceRecognition
          isCameraActive={isCameraActive}
          isCameraLoading={isCameraLoading}
          videoRef={videoRef}
          canvasRef={canvasRef}
          startCamera={startCamera}
          stopCamera={stopCamera}
        />
      </div>
    </div>
  );
};

export default Dashboard;
