import { Button } from "@mui/material";
import CustomDialog from "../dialog";
import VideoSkeleton from "../skeletons/video";
import {
  canvasStyles,
  videoContainer,
  videoStyles,
  captureBtn,
  faceRecognitionContainer,
  imageCaptured,
  imageContainer,
  btnContainer,
  btn,
  retakeBtn,
  analyzeBtn,
} from "./styles";
import Image from "next/image";
import classNames from "classnames";

const FaceRecognition = ({
  isCameraActive,
  videoRef,
  canvasRef,
  capturedImage,
  isCameraLoading,
  showSkeleton,
  stopCamera,
  captureImage,
  retakeImage,
  uploadImage,
}: any) => {
  console.log(">>> : ", {
    isCameraActive,
    isCameraLoading,
    showSkeleton,
    capturedImage,
  });

  const renderBtn = () => {
    if (capturedImage) {
      return (
        <div className={btnContainer}>
          <Button
            variant="outlined"
            onClick={retakeImage}
            className={classNames(btn, retakeBtn)}
          >
            Retake
          </Button>
          <Button
            variant="contained"
            onClick={uploadImage}
            className={classNames(btn, analyzeBtn)}
          >
            Analyze
          </Button>
        </div>
      );
    }

    return (
      <Button variant="contained" className={captureBtn} onClick={captureImage}>
        Capture
      </Button>
    );
  };

  const renderComponent = () => {
    if (capturedImage) {
      console.log(">>> : inside captured image condition function");
      return (
        <div className={imageContainer}>
          <Image
            src={capturedImage}
            className={imageCaptured}
            layout="fill"
            alt="captured image"
          />
        </div>
      );
    }

    if (showSkeleton) {
      return <VideoSkeleton />;
    }
  };
  return (
    <>
      <CustomDialog
        open={isCameraLoading}
        onCloseHandler={stopCamera}
        title="Analyze my Emotion"
        dwebStyles={{
          maxHeight: "580px",
          height: "100%",
        }}
        mwebStyles={{
          maxHeight: "420px",
          height: "100%",
        }}
      >
        <div className={faceRecognitionContainer}>
          {renderComponent()}
          <div className={videoContainer}>
            <video
              ref={videoRef}
              autoPlay
              muted
              className={videoStyles(isCameraActive)}
            ></video>
            <canvas
              ref={canvasRef}
              className={canvasStyles(isCameraActive)}
            ></canvas>
          </div>
          {renderBtn()}
        </div>
      </CustomDialog>
    </>
  );
};

export default FaceRecognition;
