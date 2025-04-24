from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import pandas as pd
import pickle

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load trained model
with open('aqi_model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

# Load city data with predictions
city_data = pd.read_csv("predicted_aqi.csv")  # Ensure this file has City & Predicted AQI

@app.route('/predict_aqi', methods=['POST'])
def predict_aqi():
    data = request.get_json()
    city = data.get("city")

    if not city:
        return jsonify({"error": "City not provided"}), 400

    # Search for city in the dataset
    result = city_data[city_data["City"].str.lower() == city.lower()]
    
    if result.empty:
        return jsonify({"error": "City not found"}), 404

    predicted_aqi = result["Predicted AQI"].values[0]

    return jsonify({"predicted_aqi": round(predicted_aqi, 2)})

if __name__ == '__main__':
    app.run(debug=True)

# `cd C:\Users\ADMIN\Desktop\FORECASTIO_RAW\src\Utils`
# the above is the pytohn directory for app.py