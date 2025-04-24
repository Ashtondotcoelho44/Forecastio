import { Link } from "react-router-dom";

const AQIPrediction = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-600 to-lime-700 text-white p-6">
      <div className="max-w-3xl w-full bg-white/20 backdrop-blur-lg rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-white text-center mb-6">🔬 Understanding AQI Prediction</h1>

        {/* 🎯 Model Accuracy */}
        <div className="mt-6 bg-white/20 p-6 rounded-lg backdrop-blur-lg shadow-md transition duration-300 hover:bg-purple-500/30">
          <h2 className="text-2xl font-semibold text-white">🎯 Prediction Accuracy</h2>
          <p className="text-gray-100 mt-2">
            Our AI-driven AQI prediction model achieves an estimated accuracy of <strong>85-95%</strong>, meaning it closely matches real-world AQI values in most cases.
          </p>
        </div>

        {/* 📊 How AQI is Predicted */}
        <div className="mt-6 bg-white/20 p-6 rounded-lg backdrop-blur-lg shadow-md transition duration-300 hover:bg-purple-500/30">
          <h2 className="text-2xl font-semibold text-white">📊 How AQI is Predicted</h2>
          <p className="text-gray-100 mt-2">
            Our Machine Learning model analyzes historical air quality data, learning patterns from humidity, temperature, wind speed, and pollutants to predict AQI with high accuracy. Unlike fixed formulas, it adapts to real-world conditions for better forecasting.
          </p>
          <div className="mt-4 p-4 bg-black/40 rounded transition duration-300 hover:bg-teal-500/30">
            <p className="text-lg text-green-300">💡 Data-Driven Prediction:</p>
            <p className="text-sm text-gray-200">
              Our Machine Learning model analyzes over <strong>10,000 historical AQI records</strong>, considering <strong>5+ key factors</strong> like humidity, temperature, wind speed, and pollutants. It achieves an estimated <strong>85-95% accuracy</strong> in predicting AQI levels, adapting to real-world conditions for reliable forecasts.
            </p>
          </div>
        </div>

        {/* 🛠️ Machine Learning Model */}
        <div className="mt-6 bg-white/20 p-6 rounded-lg backdrop-blur-lg shadow-md transition duration-300 hover:bg-purple-500/30">
          <h2 className="text-2xl font-semibold text-white">🛠️ Machine Learning Model</h2>
          <p className="text-gray-100 mt-2">
            Our model is powered by <strong>Random Forest Regression</strong>, a robust machine learning technique that analyzes historical data to predict AQI levels with high precision.
          </p>
          <div className="mt-4 bg-black/40 p-4 rounded transition duration-300 hover:bg-teal-500/30">
            <p className="text-lg text-green-300">🔍 Why Random Forest?</p>
            <ul className="list-disc ml-6 text-gray-200">
              <li>✔️ Handles missing data effectively</li>
              <li>✔️ Works well with time-series air quality data</li>
              <li>✔️ Reduces overfitting by averaging multiple decision trees</li>
            </ul>
          </div>
        </div>

        {/* ⬅️ Back to AQI Awareness Page */}
        <div className="mt-6 flex justify-center">
          <Link to="/air-quality">
            <button className="px-6 py-3 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-900 transition">
              ⬅️ Back to AQI Awareness
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AQIPrediction;
