# 🇱🇰 Sri Lanka Used Vehicle Price Predictor

An end-to-end Machine Learning web application designed to predict the current market value of used vehicles in Sri Lanka.

The project uses real-world vehicle listing data collected from local classifieds such as **Riyasewana** and **ikman.lk**, trains an **XGBoost regression model**, and serves predictions through a fast **FastAPI REST API** with a modern **Next.js** frontend.

---

## 🌐 Live Demo

**Frontend:** [Insert your Vercel Link here]

**Backend API:** [Insert your Render API Link here]

---

## 🚀 Key Features

- 🤖 **Machine Learning Prediction**
  - XGBoost regression model
  - Log-transformed target variable to handle highly skewed vehicle prices
  - End-to-end preprocessing and prediction pipeline

- 🛠️ **Feature Engineering**
  - Dynamically calculates vehicle age from manufacturing year
  - Uses vehicle characteristics to estimate market value
  - Handles categorical and numerical features through preprocessing pipelines

- ⚡ **Fast REST API**
  - Built with FastAPI
  - Pydantic request validation
  - Uvicorn ASGI server
  - Simple `/predict` endpoint for model inference

- 🎨 **Modern User Interface**
  - Built with Next.js
  - Responsive design
  - Tailwind CSS styling
  - Interactive vehicle price prediction form

- ☁️ **Cloud Deployment**
  - Frontend deployed on Vercel
  - Backend deployed on Render

---

## 🧠 Machine Learning Pipeline

The project follows a complete machine learning workflow:

```text
Raw Vehicle Data
       │
       ▼
Data Cleaning
       │
       ▼
Exploratory Data Analysis
       │
       ▼
Feature Engineering
       │
       ▼
Preprocessing Pipeline
       │
       ▼
XGBoost Regressor
       │
       ▼
Log-Transformed Price Prediction
       │
       ▼
Inverse Transformation
       │
       ▼
Estimated Market Price (LKR)
```

### Why XGBoost?

**XGBoost** is well suited for this problem because vehicle prices are influenced by complex, non-linear relationships between features such as:

- Manufacturing year
- Mileage
- Engine capacity
- Vehicle brand
- Model
- Fuel type
- Transmission
- Condition and other vehicle attributes

The target price is log-transformed during training to reduce the effect of extreme price values and improve model stability.

---

## 📊 Example Prediction

The application accepts vehicle information such as:

| Feature | Example |
|---|---|
| Brand | Toyota |
| Model | Aqua |
| Year | 2018 |
| Mileage | 65,000 km |
| Engine | 1500 cc |
| Fuel Type | Petrol |
| Transmission | Automatic |

The model then returns an estimated market value in **Sri Lankan Rupees (LKR)**.

> ⚠️ The predicted price is an estimate based on historical/listing data and should not be considered an official vehicle valuation.

---

## 🛠️ Tech Stack

### Data Science & Machine Learning

- **Python 3**
- **Pandas**
- **NumPy**
- **Scikit-learn**
- **XGBoost**
- **Joblib**
- Matplotlib / Seaborn for analysis and visualization

### Backend

- **FastAPI**
- **Uvicorn**
- **Pydantic**
- Python

### Frontend

- **Next.js**
- **React**
- **TypeScript / JavaScript**
- **Tailwind CSS**

### Deployment

- **Vercel** — Frontend
- **Render** — Backend

---

## 📁 Project Structure

```text
ikman-price-predictor/
│
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── model/
│   │   └── trained_model.joblib
│   └── ...
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── public/
│   ├── package.json
│   ├── next.config.js
│   └── ...
│
├── data/
│   └── ...
│
├── notebooks/
│   └── ...
│
├── README.md
└── ...
```

> The exact structure may vary depending on the current implementation.

---

# ⚙️ Local Setup

## 1. Clone the Repository

```bash
git clone https://github.com/Dhanuwa856/ikman-price-predictor.git
cd ikman-price-predictor
```

---

## 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Create and activate a virtual environment (recommended):

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

### macOS / Linux

```bash
python3 -m venv venv
source venv/bin/activate
```

Install the required dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI server:

```bash
uvicorn main:app --reload --port 8000
```

The API will be available at:

```text
http://127.0.0.1:8000
```

FastAPI documentation can be accessed at:

```text
http://127.0.0.1:8000/docs
```

---

## 3. Frontend Setup

Open a **new terminal** and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file inside the `frontend` directory:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/predict
```

Start the Next.js development server:

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:3000
```

---

# 🔌 API Usage

## Prediction Endpoint

```http
POST /predict
```

### Example Request

```json
{
  "brand": "Toyota",
  "model": "Aqua",
  "year": 2018,
  "mileage": 65000,
  "engine_cc": 1500,
  "fuel_type": "Petrol",
  "transmission": "Automatic"
}
```

### Example Response

```json
{
  "predicted_price": 7850000
}
```

> The request and response fields should match the Pydantic schema implemented in the backend.

---

# 📈 Model Evaluation

Recommended regression metrics used to evaluate the model include:

- **MAE** — Mean Absolute Error
- **RMSE** — Root Mean Squared Error
- **R² Score** — Coefficient of Determination

Because the model uses a log-transformed target, predictions are converted back to the original LKR price scale before presenting the final result to users.

---

# 🔄 Development Workflow

```text
Collect Vehicle Listings
          ↓
Clean & Validate Data
          ↓
EDA & Visualization
          ↓
Feature Engineering
          ↓
Train/Test Split
          ↓
Preprocessing
          ↓
Train XGBoost
          ↓
Evaluate Model
          ↓
Save Model with Joblib
          ↓
FastAPI Backend
          ↓
Next.js Frontend
          ↓
Deploy to Render + Vercel
```

---

# 🎯 Project Goals

The main goals of this project are to:

1. Build a practical machine learning application using real-world Sri Lankan data.
2. Understand regression problems and price prediction.
3. Apply feature engineering to improve model performance.
4. Deploy a trained ML model as a production-style REST API.
5. Connect a machine learning backend with a modern web frontend.
6. Provide Sri Lankan vehicle buyers and sellers with a useful price estimation tool.

---

# ⚠️ Disclaimer

This application provides **estimated vehicle prices**, not guaranteed market values.

Actual vehicle prices can vary depending on factors such as:

- Vehicle condition
- Service history
- Accident history
- Number of previous owners
- Registration details
- Import status
- Location
- Market demand
- Negotiation between buyer and seller

The predictions should therefore be used as a **reference point**, not as a professional valuation.

---

# 👨‍💻 About the Developer

Developed by **Dhanushka Rathnayaka**, an Information Technology undergraduate at the **Institute of Technology, University of Moratuwa (ITUM)**.

Interested in:

- Full-Stack Web Development
- Machine Learning
- Artificial Intelligence
- Data Science
- Software Engineering

### 🔗 Connect

- **GitHub:** https://github.com/Dhanuwa856
- **LinkedIn:** https://www.linkedin.com/in/dhanushka-rathnayaka/
- **Portfolio:** https://dhanushka.live
- **Community:** Dhanushka's AI Code Hub

---

## ⭐ Support

If you find this project useful, consider giving the repository a **⭐ Star** on GitHub.

Your support is appreciated! ❤️

---

## 📜 License

This project is intended for educational and demonstration purposes.

Add your preferred license here if the repository is released under an open-source license.
