import { useState, useRef, useEffect } from "react";
import * as blazeface from "@tensorflow-models/blazeface";
import "@tensorflow/tfjs-backend-webgl";
import { saveImageAnalysis } from "@/src/apis/imageAnalysis";
import { useToastMessage } from "@/src/hooks/useToastMessage";
import { useUserContext } from "@/src/hooks/useContext/useUserContext";

export const useFaceRecognitionController = () => {
  const videoRef = useRef(null); // Reference to the video element
  const canvasRef = useRef(null); // Reference to the canvas element
  const modelRef = useRef(null); // Reference to the canvas element
  const [isCameraActive, setIsCameraActive] = useState(false); // Camera state
  const [isCameraLoading, setIsCameraLoading] = useState(false); // Camera state
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [isEmotionAnalysisCompleted, setIsEmotionAnalysisCompleted] =
    useState(false);
  const [capturedImage, setCapturedImage] = useState("");
  const {
    userContextValues: { userProfile },
  } = useUserContext();
  const { triggerErrorToast, triggerSuccessToast } = useToastMessage();

  useEffect(() => {
    if (isCameraActive && modelRef.current && videoRef.current) {
      console.log(">>> : inside");
      detectFaces();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCameraActive, isCameraLoading]);

  useEffect(() => {
    return () => {
      stopCamera();
      setCapturedImage("");
      setIsCameraActive(false);
      setIsCameraLoading(false);
      setShowSkeleton(true);
      setIsEmotionAnalysisCompleted(false);
    };
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isCameraActive) {
        stopCamera();
      }
    };

    const handleWindowBlur = () => {
      if (isCameraActive) {
        stopCamera(); // Stop camera when user switches applications
      }
    };

    const handleBeforeUnload = () => {
      stopCamera(); // Ensure cleanup when closing the tab
    };

    const handleMediaError = (event) => {
      console.error("Camera error detected:", event);
      stopCamera();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("beforeunload", handleBeforeUnload);
    navigator.mediaDevices.addEventListener("devicechange", handleMediaError);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      navigator.mediaDevices.removeEventListener(
        "devicechange",
        handleMediaError
      );
    };
  }, [isCameraActive]);

  const startCamera = async () => {
    setIsCameraLoading(true);
    setIsEmotionAnalysisCompleted(false);
    try {
      setTimeout(async () => {
        if (!videoRef.current) {
          alert("Video element is not available yet.");
          return; // Prevent further execution
        }

        // Load the BlazeFace model
        const model = await blazeface.load();
        modelRef.current = model;

        // Access the webcam
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        const video = videoRef.current;
        if (!video) {
          alert("Video element is not available yet.");
          return;
        }

        video.srcObject = stream;
        video.onloadedmetadata = () => {
          setShowSkeleton(false);
          video.play();
          setIsCameraActive(true);
        };
      }, 100);
    } catch {
      setIsCameraLoading(false);
      alert("Failed to access webcam. Please grant camera permissions.");
    }
  };

  // Detect faces and draw markings
  const detectFaces = async () => {
    const video = videoRef.current;
    const model = modelRef.current;
    const canvas = canvasRef.current;
    console.log("DEBUG : ", {
      model,
      video,
      canvas,
      m: modelRef.current,
      v: videoRef.current,
    });
    if (!model || !video || !canvas) {
      console.log("DEBUG : 1");
      return;
    }

    const ctx = canvas.getContext("2d");

    if (video.videoWidth === 0 || video.videoHeight === 0) {
      console.log("DEBUG : 3");
      return;
    }
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const detect = async () => {
      if (!isCameraActive || !model || !video) {
        console.log("DEBUG : 4");
        return;
      }

      if (video.videoWidth === 0 || video.videoHeight === 0) {
        console.log("DEBUG : 5");
        return;
      }

      const predictions = await model.estimateFaces(video, false);
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
      // Draw face bounding boxes and landmarks
      if (predictions.length > 0) {
        predictions.forEach((prediction) => {
          const [startX, startY] = prediction.topLeft;
          const [endX, endY] = prediction.bottomRight;
          const width = endX - startX;
          const height = endY - startY;

          // Draw the bounding box
          ctx.beginPath();
          ctx.strokeStyle = "blue";
          ctx.lineWidth = 2;
          ctx.rect(startX, startY, width, height);
          ctx.stroke();

          // Draw the landmarks
          prediction.landmarks.forEach(([x, y]) => {
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, 2 * Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();
          });
        });
      }
      requestAnimationFrame(detect);

      // Continue the detection loop
    };

    await detect();
  };

  const captureImage = () => {
    if (!videoRef.current) {
      alert("Cannot capture image! Please try again after sometime");
      return;
    }

    const captureCanvas = document.createElement("canvas");
    const ctx = captureCanvas.getContext("2d");

    captureCanvas.width = videoRef.current.videoWidth;
    captureCanvas.height = videoRef.current.videoHeight;

    ctx?.drawImage(
      videoRef.current,
      0,
      0,
      captureCanvas.width,
      captureCanvas.height
    );

    captureCanvas.toBlob(async (blob) => {
      if (blob) {
        const blobURL = URL.createObjectURL(blob);
        setCapturedImage(blobURL);
        console.log(">>> : ", { blobURL });
        pauseCamera();
      }
    }, "image/png");
  };

  const uploadImage = async () => {
    try {
      const response = await saveImageAnalysis(
        capturedImage,
        userProfile.email
      );
      if (response?.success) {
        triggerSuccessToast(response.message);
      } else {
        triggerErrorToast(response?.message);
      }
    } catch (error) {
      triggerErrorToast(
        error?.message || "Unable to process image at the moment"
      );
    } finally {
      setTimeout(() => {
        stopCamera();
      }, 500);
    }
  };

  const retakeImage = () => {
    setCapturedImage("");
    clearCanvas();
    setShowSkeleton(true);
    setIsCameraActive(false);
    setTimeout(() => {
      startCamera();
    }, 500);
  };

  const pauseCamera = () => {
    modelRef.current = null;
    clearCanvas();
    clearVideo();
    setIsCameraActive(false);
  };

  const clearCanvas = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  const clearVideo = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop()); // Stop all tracks
      videoRef.current.srcObject = null;
    }
  };
  const stopCamera = () => {
    setShowSkeleton(true);
    setIsCameraActive(false);
    setCapturedImage("");
    clearVideo();
    clearCanvas();
    canvasRef.current = null;
    videoRef.current = null;

    setTimeout(() => {
      setIsCameraLoading(false);
      setIsEmotionAnalysisCompleted(true);
    }, 200);
  };

  return {
    isCameraActive,
    videoRef,
    canvasRef,
    modelRef,
    isCameraLoading,
    capturedImage,
    showSkeleton,
    isEmotionAnalysisCompleted,
    startCamera,
    stopCamera,
    captureImage,
    retakeImage,
    uploadImage,
  };
};
