# from services.vem_model import VEM_MODEL
from PIL import Image
import numpy as np
from deepface import DeepFace

if __name__ == "__main__":
    # Load and analyze the image
    image_path = "./sad.jpeg"
    analysis = DeepFace.analyze(image_path, actions=['emotion'])

    # Print the results
    print(analysis)