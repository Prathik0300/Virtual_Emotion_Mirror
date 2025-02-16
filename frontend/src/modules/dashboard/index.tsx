import { useFaceRecognitionController } from "@/src/components/face-recognition/controller/useFaceRecognitionController";
import { dashboardContainer, contentContainer, title } from "./style";
import dynamic from "next/dynamic";
import { Button } from "@mui/material";

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
  const {
    isCameraActive,
    videoRef,
    isCameraLoading,
    canvasRef,
    modelRef,
    capturedImage,
    startCamera,
    stopCamera,
    captureImage,
    retakeImage,
  } = useFaceRecognitionController();
  const isRefMissing =
    !canvasRef.current || !modelRef.current || !videoRef.current;
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
          capturedImage={capturedImage}
          isRefMissing={isRefMissing}
          isCameraActive={isCameraActive}
          isCameraLoading={isCameraLoading}
          videoRef={videoRef}
          canvasRef={canvasRef}
          captureImage={captureImage}
          startCamera={startCamera}
          stopCamera={stopCamera}
          retakeImage={retakeImage}
        />
      </div>
    </div>
  );
};

export default Dashboard;
