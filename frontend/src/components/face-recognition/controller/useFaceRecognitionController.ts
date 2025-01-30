import { useState, useRef, useEffect } from "react";
import * as blazeface from "@tensorflow-models/blazeface";
import "@tensorflow/tfjs-backend-webgl";

export const useFaceRecognitionController = () => {
  const videoRef = useRef(null); // Reference to the video element
  const canvasRef = useRef(null); // Reference to the canvas element
  const modelRef = useRef(null); // Reference to the canvas element
  const [isCameraActive, setIsCameraActive] = useState(false); // Camera state

  useEffect(() => {
    if (isCameraActive && modelRef.current && videoRef.current) {
      detectFaces(videoRef.current, modelRef.current);
    }
  }, [isCameraActive]);

  // Start the camera and load the BlazeFace model
  const startCamera = async () => {
    try {
      // Load the BlazeFace model
      const model = await blazeface.load();
      console.log("BlazeFace model loaded!");
      modelRef.current = model;
      // Access the webcam
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = videoRef.current;
      video.srcObject = stream;

      video.onloadedmetadata = () => {
        video.play();
        setIsCameraActive(true);
        // detectFaces(video, model); // Start face detection
      };
    } catch (err) {
      console.error("Failed to access webcam:", err);
      alert("Failed to access webcam. Please grant camera permissions.");
    }
  };

  // Detect faces and draw markings
  const detectFaces = async (video, model) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    console.log("inside detect faces , : ", video, model);
    canvas.width = video.videoWidth;
    console.log("1");
    canvas.height = video.videoHeight;
    console.log("2");

    const detect = async () => {
      console.log("inside detect!!");
      if (!isCameraActive) {
        return;
      } // Stop detection if the camera is inactive
      // Perform face detection
      const predictions = await model.estimateFaces(video, false);
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
      console.log({ predictions });
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
    const video = videoRef.current;
    const stream = video.srcObject;

    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop()); // Stop all tracks
      video.srcObject = null;
    }

    setIsCameraActive(false);
  };

  return {
    isCameraActive,
    videoRef,
    canvasRef,
    startCamera,
    stopCamera,
  };
};
