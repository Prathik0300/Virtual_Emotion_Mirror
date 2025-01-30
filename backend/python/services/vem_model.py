# from fer import FER

# class VEM_MODEL:
#     def __init__(self, image_processor):
#         self.emotion_detector = FER(mtcnn=True)
#         self.latest_emotion_analysis = {"emotion": None, "score": None}
#         self.image_processor = image_processor

#     def analyze_emotion(self, face_roi):
#         """
#         Analyzes emotion from a given face region after preprocessing.
#         """
#         # Preprocess the face ROI
#         preprocessed_face = self.image_processor.preprocess_image(face_roi)

#         # Pass the preprocessed face ROI to the FER model
#         results = self.emotion_detector.detect_emotions(preprocessed_face)
#         if results:
#             emotion, score = self.emotion_detector.top_emotion(preprocessed_face)
#             self.latest_emotion_analysis = {"emotion": emotion, "score": score}
#         else:
#             self.latest_emotion_analysis = {"emotion": None, "score": None}
        
#         return self.latest_emotion_analysis

#     def get_latest_emotion(self):
#         return self.latest_emotion_analysis