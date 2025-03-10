from flask import Flask, request, jsonify
from deepface import DeepFace
import os
import threading
import queue
import numpy as np
app = Flask(__name__)

result_queue = queue.Queue()

def convert_to_native_types(obj):
    if isinstance(obj, np.float32):
        return float(obj)
    elif isinstance(obj, np.ndarray):
        return obj.tolist()
    elif isinstance(obj,dict):
        return {key: convert_to_native_types(value) for key,value in obj.items()}
    elif isinstance(obj,list):
        return [convert_to_native_types(item) for item in obj]
    return obj

def enforce_detection(image_path):
    try:
        analysis_result = DeepFace.analyze(image_path, actions=["emotion"])
        analysis_result = convert_to_native_types(analysis_result)
        return {"success": True, "message": "Successfully analyzed!", "analysis": analysis_result}
    except:
        return {"success": False, "message": "face could not be detected!"}

def analyze_image(file_path):
    try:
        result_queue.put(enforce_detection(file_path))
    except Exception as error:
        result_queue.put({"success": False, "message": str(error)})
    finally:
        if os.path.exists(file_path):
            os.remove(file_path)

@app.route("/vemAnalysis", methods=["POST"])
def analyze():
    
    
    if "file" not in request.files:
        return jsonify({"success": False, "message": "No file uploaded"}), 400

    file = request.files['file']
    file_path = os.path.join(os.getcwd(), file.filename)
    
    try:
        file.save(file_path)
    except Exception as error:
        return jsonify({"success": False, "message": f"Error saving file: {str(error)}"}), 500
    
    thread = threading.Thread(target=analyze_image, args=(file_path,))
    thread.start()
    res = result_queue.get()
    return jsonify(res), 200
    
if __name__ == "__main__":
    app.run(host="0.0.0.0",port=5000, debug=True)