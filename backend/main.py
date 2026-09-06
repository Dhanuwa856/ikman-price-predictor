from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import joblib
import pandas as pd
import numpy as np
import os

app = FastAPI(
    title="Sri Lanka Vehicle Price Predictor API",
    description="FastAPI backend serving XGBoost regression pipeline for used vehicle price estimation.",
    version="1.0.0"
)

# Frontend (React / Next.js) එකෙන් එන requests වලට අවසර දීම (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Production වලදී මෙතැනට frontend domain එක ලබා දෙන්න
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 1. Model එක load කරගැනීම
MODEL_PATH = os.path.join(os.path.dirname(__file__), "xgboost_car_price_model.joblib")

try:
    model_pipeline = joblib.load(MODEL_PATH)
    print("✅ Model pipeline loaded successfully.")
except Exception as e:
    print(f"❌ Error loading model: {e}")
    model_pipeline = None

# 2. Input Data Validation (Pydantic Schema)
class CarFeatures(BaseModel):
    make: str = Field(..., example="Toyota")
    model: str = Field(..., example="Passo")
    location: str = Field(..., example="Gampaha")
    year: int = Field(..., ge=1980, le=2026, example=2018)
    mileage: float = Field(..., ge=0, example=65000.0)
    gear: str = Field(..., example="Automatic")
    fuel_type: str = Field(..., example="Petrol")
    engine_cc: float = Field(..., ge=500, le=6000, example=1000.0)
    condition: str = Field(..., example="Registered (Used)")

# 3. Health check endpoint
@app.get("/")
def read_root():
    return {"status": "active", "message": "Car Price Prediction API is running."}

# 4. Prediction Endpoint
@app.post("/predict")
def predict_price(features: CarFeatures):
    if model_pipeline is None:
        raise HTTPException(status_code=500, detail="Model pipeline is not loaded.")

    try:
        # Feature Engineering: Vehicle Age ගණනය කිරීම
        current_year = 2026
        vehicle_age = current_year - features.year

        # Model එක train කළ Dataframe එකෙහි තීරුවලට (Columns) අනුකූලව සකස් කිරීම
        input_data = pd.DataFrame([{
            'Location': features.location,
            'Make': features.make,
            'Model': features.model,
            'Gear': features.gear,
            'Fuel Type': features.fuel_type,
            'Engine (cc)': features.engine_cc,
            'Condition': features.condition,
            'Mileage': features.mileage,
            'Vehicle_Age': vehicle_age
        }])

        # Prediction ලබා ගැනීම
        prediction = model_pipeline.predict(input_data)
        predicted_price = float(prediction[0])

        # මිල සෘණ අගයක් වීම වැළැක්වීම
        final_price = max(0, round(predicted_price, -3))

        return {
            "success": True,
            "predicted_price_lkr": final_price,
            "formatted_price": f"Rs. {final_price:,.2f}",
            "vehicle_age": vehicle_age
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Prediction error: {str(e)}")