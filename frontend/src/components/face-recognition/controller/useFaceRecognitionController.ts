import { useState, useRef, useEffect } from "react";
import * as blazeface from "@tensorflow-models/blazeface";
import "@tensorflow/tfjs-backend-webgl";

export const useFaceRecognitionController = () => {
  const videoRef = useRef(null); // Reference to the video element
  const canvasRef = useRef(null); // Reference to the canvas element
  const modelRef = useRef(null); // Reference to the canvas element
  const [isCameraActive, setIsCameraActive] = useState(false); // Camera state
  const [isCameraLoading, setIsCameraLoading] = useState(false); // Camera state

  useEffect(() => {
    if (isCameraActive && modelRef.current && videoRef.current) {
      detectFaces(videoRef.current, modelRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCameraActive, isCameraLoading]);

  const startCamera = async () => {
    setIsCameraLoading(true);
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
  const detectFaces = async (video, model) => {
    if (!model || !video) {
      return;
    }
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");

    if (video.videoWidth === 0 || video.videoHeight === 0) {
      return;
    }
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const detect = async () => {
      if (!isCameraActive || !modelRef.current || !videoRef.current) {
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

      // Continue the detection loop
      requestAnimationFrame(detect);
    };

    await detect();
  };

  // Stop the camera and clear the video stream
  const stopCamera = () => {
    setIsCameraLoading(false);
    setIsCameraActive(false);

    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop()); // Stop all tracks
      videoRef.current.srcObject = null;
      videoRef.current = null;
    }

    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      canvasRef.current = null;
    }
  };

  return {
    isCameraActive,
    videoRef,
    canvasRef,
    isCameraLoading,
    startCamera,
    stopCamera,
  };
};
