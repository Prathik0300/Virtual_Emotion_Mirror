import cv2
import base64
import numpy as np

class ImageProcessor:
    def __init__(self):
        pass

    def process_frame(self, frame):
        _, buffer = cv2.imencode('.jpg', frame)
        return base64.b64encode(buffer).decode('utf-8')

    def decode_base64_image(self, base64_data):
        """
        Decodes a base64-encoded image back to a numpy array.
        """
        image_data = base64.b64decode(base64_data)
        np_array = np.frombuffer(image_data, np.uint8)
        return cv2.imdecode(np_array, cv2.IMREAD_COLOR)

    def preprocess_image(self, image, target_size=(48, 48), grayscale=True):
        """
        Preprocesses the image:
        - Resize to target dimensions.
        - Convert to grayscale (if required).
        - Normalize pixel values (optional, FER model-dependent).
        """
        if grayscale:
            image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)  # Convert to grayscale
        image = cv2.resize(image, target_size)  # Resize to target size
        image = image / 255.0  # Normalize pixel values to [0, 1]
        return image