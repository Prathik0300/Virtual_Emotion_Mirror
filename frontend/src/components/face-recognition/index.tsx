import CustomModal from "../modal";
import { useFaceRecognitionController } from "./controller/useFaceRecognitionController";
import { videoContainer } from "./styles";

const FaceRecognition = () => {
  const { isCameraActive, videoRef, canvasRef, startCamera, stopCamera } =
    useFaceRecognitionController();
  return (
    <>
      <button
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
        {isCameraActive ? "Stop Camera" : "Start Camera"}
      </button>
      <CustomModal open={isCameraActive} onCloseHandler={stopCamera}>
        <>hello</>
      </CustomModal>
      {/* <CustomModal open={isCameraActive} onCloseHandler={stopCamera}> */}
      <div className={videoContainer(isCameraActive)}>
        <video
          ref={videoRef}
          autoPlay
          muted
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "500px",
            height: "500px",
            display: isCameraActive ? "block" : "none",
            zIndex: 1,
          }}
        ></video>
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "500px",
            height: "500px",
            display: isCameraActive ? "block" : "none",
            zIndex: 2,
          }}
        ></canvas>
      </div>
      {/* </CustomModal> */}
    </>
  );
};

export default FaceRecognition;
