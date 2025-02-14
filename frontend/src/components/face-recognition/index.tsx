import { useEffect } from "react";
import CustomDialog from "../dialog";
import CustomModal from "../modal";
import { useFaceRecognitionController } from "./controller/useFaceRecognitionController";
import { videoContainer } from "./styles";

const FaceRecognition = ({
  isCameraActive,
  videoRef,
  canvasRef,
  isCameraLoading,
  startCamera,
  stopCamera,
}: any) => {
  console.log({ isCameraActive, isCameraLoading });

  return (
    <>
      <CustomDialog
        open={isCameraLoading}
        onCloseHandler={stopCamera}
        title="Analyze my Emotion"
        dwebStyles={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          maxHeight: "400px",
          height: "100%",
        }}
      >
        <div className={videoContainer}>
          <video
            ref={videoRef}
            autoPlay
            muted
            style={{
              width: "500px",
              height: "400px",
              position: "relative",
              display: isCameraActive ? "block" : "none",
              zIndex: 100,
            }}
          ></video>
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              top: 9,
              left: 15,
              width: "500px",
              height: "378px",
              display: isCameraActive ? "block" : "none",
              zIndex: 222,
            }}
          ></canvas>
        </div>
      </CustomDialog>
      {/* <CustomModal open={isCameraActive} onCloseHandler={stopCamera}> */}

      {/* </CustomModal> */}
    </>
  );
};

export default FaceRecognition;
