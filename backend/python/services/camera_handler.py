import cv2

class CameraHandler:
    def __init__(self, emotion_analyzer, image_processor, fps=1):
        self.fps = fps
        self.emotion_analyzer = emotion_analyzer
        self.image_processor = image_processor
        self.running = False
        self.capture = cv2.VideoCapture(0)
        
        if not self.capture.isOpened():
            raise Exception("Could not open camera")

    def start(self):
        """
        Starts capturing frames from the camera.
        Yields each frame for further processing.
        """
        self.running = True
        while self.running:
            ret, frame = self.capture.read()
            if not ret:
                print("Could not capture frame")
                break

            # Flip frame to mirror image (optional)
            frame = cv2.flip(frame, 1)

            # Process and analyze the face ROI
            result = self.emotion_analyzer.analyze_emotion(frame)
            print("Emotion Result:", result)

            yield frame

    def stop(self):
        """
        Stops the camera feed and releases resources.
        """
        self.running = False
        self.capture.release()
        cv2.destroyAllWindows()