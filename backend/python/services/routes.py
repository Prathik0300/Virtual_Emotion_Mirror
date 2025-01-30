from flask import Flask, jsonify, request
import threading

from services.vem_model import VEM_MODEL
from services.image_processor import ImageProcessor
from services.camera_handler import CameraHandler

class Service:
    def __init__(self):
        self.app = Flask(__name__)
        self.image_processor = ImageProcessor()
        self.emotion_analyzer = VEM_MODEL(self.image_processor)
        self.camera_handler = CameraHandler(self.emotion_analyzer, self.image_processor)
        self.is_recording = False
        
        # Define routes
        self.app.add_url_rule('/start-recording', 'start_recording', self.start_recording, methods=['POST'])
        self.app.add_url_rule('/stop-recording', 'stop_recording', self.stop_recording, methods=['POST'])
        self.app.add_url_rule('/analyze-emotion', 'analyze_emotion', self.analyze_emotion, methods=['POST'])

    def start_recording(self):
        if self.is_recording:
            return jsonify({"message": "Recording already in progress"})
        
        self.is_recording = True
        threading.Thread(target=self.record_video).start()
        return jsonify({"message": "Recording started"})
    
    def stop_recording(self):
        self.is_recording = False
        self.camera_handler.stop()
        return jsonify({"message": "Recording stopped"})

    def analyze_emotion(self):
        data = request.json
        base64_data = data.get('image')
        if not base64_data:
            return jsonify({"error": "No image data provided"}), 400
        
        try:
            # Decode the base64 image and analyze emotion
            image = self.image_processor.decode_base64_image(base64_data)
            result = self.emotion_analyzer.analyze_emotion(image)
            return jsonify(result)
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    
    def record_video(self):
        for frame in self.camera_handler.start():
            if not self.is_recording:
                break
            
            # Process frame and get base64 image
            image_data = self.image_processor.process_frame(frame)
            
            # Analyze emotion from the base64-encoded image
            emotion_result = self.analyze_emotion_from_base64(image_data)
            print("Emotion Result:", emotion_result)

    def analyze_emotion_from_base64(self, base64_data):
        """
        Analyzes emotion using a POST request to the /analyze-emotion endpoint.
        """
        with self.app.test_client() as client:
            response = client.post('/analyze-emotion', json={"image": base64_data})
            return response.json

    def run(self):
        self.app.run(debug=True)