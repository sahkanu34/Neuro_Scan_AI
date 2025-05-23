from fastapi import FastAPI, UploadFile, File, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
import uvicorn
from typing import Optional, Dict, Any
import numpy as np
from PIL import Image
import io
import uuid
from datetime import datetime
import json
import os
from pydantic import BaseModel
import tensorflow as tf
from tensorflow import keras
from contextlib import asynccontextmanager

# ----------------- Constants and Paths -------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "models/model.h5")
UPLOAD_DIR = os.path.join(BASE_DIR, "uploads")
IMG_SIZE = (128, 128)
CLASSES = ["glioma", "meningioma", "no_tumor", "pituitary"]
os.makedirs(UPLOAD_DIR, exist_ok=True)

# ----------------- Load Model -------------------
def load_model():
    try:
        if not os.path.exists(MODEL_PATH):
            print(f"❌ Model not found at {MODEL_PATH}")
            print("Please ensure model.h5 is in the backend folder")
            return None
            
        print(f"📂 Loading model from: {MODEL_PATH}")
        
        # Configure TensorFlow for better performance
        tf.config.optimizer.set_jit(True)  # Enable XLA optimization
        
        # Load model
        model = keras.models.load_model(MODEL_PATH, compile=False)
        
        # Warm up the model
        dummy_input = np.zeros((1, *IMG_SIZE, 3))
        model.predict(dummy_input, verbose=0)
        
        print("✅ Model loaded and warmed up successfully.")
        return model
    except Exception as e:
        print(f"❌ Error loading model: {str(e)}")
        import traceback
        print(traceback.format_exc())
        return None

model = load_model()  # Initial load

# ----------------- Preprocess Function -------------------
def preprocess_image(image):
    try:
        # Convert to RGB if not already
        if image.mode != 'RGB':
            image = image.convert('RGB')
            
        # Resize image
        image = image.resize(IMG_SIZE, Image.Resampling.LANCZOS)
        
        # Convert to numpy array and normalize
        image_array = np.array(image, dtype=np.float32) / 255.0
        
        # Add batch dimension
        return np.expand_dims(image_array, axis=0)
    except Exception as e:
        print(f"❌ Error preprocessing image: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Image preprocessing failed: {str(e)}")

# ----------------- Predict Function -------------------
def predict(model, processed_image):
    try:
        # Get predictions
        predictions = model.predict(processed_image, verbose=0)
        
        # Get the predicted class and confidence
        predicted_class_index = np.argmax(predictions[0])
        predicted_class = CLASSES[predicted_class_index]
        confidence = float(predictions[0][predicted_class_index])
        
        # Calculate probabilities for all classes
        probabilities = {
            class_name: float(prob) 
            for class_name, prob in zip(CLASSES, predictions[0])
        }
        
        # Log prediction results
        print(f"🔍 Prediction: {predicted_class} (confidence: {confidence:.2%})")
        
        return {
            "classification": predicted_class,
            "confidence": confidence,
            "probabilities": probabilities
        }
    except Exception as e:
        print(f"❌ Error during prediction: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

# ----------------- FastAPI App Setup -------------------
@asynccontextmanager
async def lifespan(app: FastAPI):
    global model
    print("🚀 Starting up application...")
    if model is None:
        model = load_model()
    yield
    print("👋 Shutting down application...")

app = FastAPI(
    title="NeuroScan AI API",
    description="Brain Tumor Classification API using Deep Learning",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

# ----------------- Models -------------------
class PatientInfo(BaseModel):
    id: Optional[str] = None
    age: Optional[int] = None
    gender: Optional[str] = None
    notes: Optional[str] = None

class ScanResult(BaseModel):
    id: str
    timestamp: str
    imageUrl: str
    prediction: Dict[str, Any]
    patientInfo: Optional[Dict[str, Any]] = None

# ----------------- Routes -------------------
@app.get("/")
def home():
    return {"message": "Welcome to NeuroScan AI API"}

@app.post("/upload-scan/")
async def upload_scan(
    file: UploadFile = File(...),
    patientInfo: Optional[str] = Form(None)
):
    try:
        if model is None:
            raise HTTPException(status_code=500, detail="Model not loaded on server.")

        if not file.content_type.startswith("image/"):
            raise HTTPException(status_code=400, detail="Invalid file type. Image expected.")

        contents = await file.read()
        image = Image.open(io.BytesIO(contents))

        scan_id = str(uuid.uuid4())
        image_path = os.path.join(UPLOAD_DIR, f"{scan_id}.jpg")
        image.save(image_path)

        processed_image = preprocess_image(image)
        prediction_result = predict(model, processed_image)

        result = {
            "id": scan_id,
            "timestamp": datetime.now().isoformat(),
            "imageUrl": f"/uploads/{scan_id}.jpg",
            "prediction": prediction_result
        }

        if patientInfo:
            try:
                result["patientInfo"] = json.loads(patientInfo)
            except json.JSONDecodeError:
                print(f"⚠️ Invalid JSON in patientInfo: {patientInfo}")

        result_path = os.path.join(UPLOAD_DIR, f"{scan_id}_result.json")
        with open(result_path, "w") as f:
            json.dump(result, f)

        return JSONResponse(content={"scan_id": scan_id, "result": result})

    except Exception as e:
        import traceback
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"Upload error: {str(e)}")

@app.get("/scan-results/{scan_id}")
async def get_scan_results(scan_id: str):
    try:
        result_path = os.path.join(UPLOAD_DIR, f"{scan_id}_result.json")
        if os.path.exists(result_path):
            with open(result_path, "r") as f:
                return json.load(f)

        # fallback if only image is present
        image_path = os.path.join(UPLOAD_DIR, f"{scan_id}.jpg")
        if os.path.exists(image_path):
            image = Image.open(image_path)
            processed_image = preprocess_image(image)
            prediction_result = predict(model, processed_image)
            result = {
                "id": scan_id,
                "timestamp": datetime.now().isoformat(),
                "imageUrl": f"/uploads/{scan_id}.jpg",
                "prediction": prediction_result
            }
            with open(result_path, "w") as f:
                json.dump(result, f)
            return result
        else:
            raise HTTPException(status_code=404, detail="Scan ID not found")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve results: {str(e)}")

@app.get("/classifications/")
async def get_classifications():
    return [
        {"id": "glioma", "name": "Glioma", "description": "Starts in glial cells of brain or spine"},
        {"id": "meningioma", "name": "Meningioma", "description": "Forms on brain/spinal cord membranes"},
        {"id": "no_tumor", "name": "No Tumor", "description": "No tumor detected in the scan"},
        {"id": "pituitary", "name": "Pituitary Tumor", "description": "Occurs in the pituitary gland"}
    ]

@app.get("/{scan_id}.jpg")
async def get_scan_image(scan_id: str):
    image_path = os.path.join(UPLOAD_DIR, f"{scan_id}.jpg")
    if not os.path.exists(image_path):
        raise HTTPException(status_code=404, detail="Image not found")
    return FileResponse(image_path, media_type="image/jpeg")

# ----------------- Run -------------------
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
