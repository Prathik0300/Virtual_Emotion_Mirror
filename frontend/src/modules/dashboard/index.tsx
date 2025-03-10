import { useFaceRecognitionController } from "@/src/components/face-recognition/controller/useFaceRecognitionController";
import { dashboardContainer, contentContainer, title } from "./style";
import dynamic from "next/dynamic";
import { Button, Tab, Tabs } from "@mui/material";
import { useDashboard } from "@/src/hooks/modules/dashboard/useDashboard";

const BarGraph = dynamic(() => import("@/src/components/dashboard/graph"), {
  ssr: false,
});

const FaceRecognition = dynamic(
  () => import("@/src/components/face-recognition"),
  {
    ssr: false,
  }
);
const Dashboard = () => {
  const { tabValue, handleTabValueChange } = useDashboard();
  const {
    isCameraActive,
    videoRef,
    isCameraLoading,
    canvasRef,
    modelRef,
    capturedImage,
    showSkeleton,
    isEmotionAnalysisCompleted,
    startCamera,
    stopCamera,
    captureImage,
    retakeImage,
    uploadImage,
  } = useFaceRecognitionController();
  console.log({ isEmotionAnalysisCompleted });
  const isRefMissing =
    !canvasRef.current || !modelRef.current || !videoRef.current;
  return (
    <div className={dashboardContainer}>
      <p className={title}>Dashboard</p>
      <div>
        <Tabs
          value={tabValue}
          onChange={handleTabValueChange}
          aria-label="dashboard graph tabs"
        >
          <Tab label="Daily" id="graph-tab-0" aria-controls="tabpanel-0" />
          <Tab label="Monthly" id="graph-tab-1" aria-controls="tabpanel-1" />
          <Tab label="Annually" id="graph-tab-2" aria-controls="tabpanel-2" />
        </Tabs>
      </div>
      <div className={contentContainer}>
        <BarGraph
          tabValue={tabValue}
          isEmotionAnalysisCompleted={isEmotionAnalysisCompleted}
        />
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
          capturedImage={capturedImage}
          isRefMissing={isRefMissing}
          isCameraActive={isCameraActive}
          isCameraLoading={isCameraLoading}
          showSkeleton={showSkeleton}
          videoRef={videoRef}
          canvasRef={canvasRef}
          captureImage={captureImage}
          startCamera={startCamera}
          stopCamera={stopCamera}
          retakeImage={retakeImage}
          uploadImage={uploadImage}
        />
      </div>
    </div>
  );
};

export default Dashboard;
