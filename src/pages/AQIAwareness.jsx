import { Link } from "react-router-dom";

const AQIAwareness = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-600 to-lime-700 text-white p-6">
      <div className="max-w-3xl w-full bg-white/20 backdrop-blur-lg rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-white text-center mb-6">PREVENTION IS BETTER THAN CURE </h1>
        
        <p className="text-lg text-gray-200 text-center">
          The Air Quality Index (AQI) measures pollution levels. A higher AQI means worse air quality, which can be harmful, especially for sensitive groups.
        </p>

        {/* AQI Categories Section */}
        <div className="mt-6 bg-white/20 p-4 rounded-lg hover:bg-white/30 transition">
          <h2 className="text-2xl font-semibold text-white">💡 AQI Categories:</h2>
          <ul className="list-disc ml-6 mt-2 text-gray-100">
            <li><span className="text-green-400 font-semibold">0-50:</span> Good – Air quality is satisfactory.</li>
            <li><span className="text-yellow-400 font-semibold">51-100:</span> Moderate – Acceptable, but some pollutants may affect sensitive individuals.</li>
            <li><span className="text-orange-400 font-semibold">101-150:</span> Unhealthy for Sensitive Groups – Older adults, children, and those with respiratory issues should be cautious.</li>
            <li><span className="text-red-400 font-semibold">151-200:</span> Unhealthy – General public may start experiencing health effects.</li>
            <li><span className="text-purple-400 font-semibold">201-300:</span> Very Unhealthy – Increased health risks for everyone.</li>
            <li><span className="text-gray-200 font-semibold">300+:</span> Hazardous – Emergency conditions affecting the entire population.</li>
          </ul>
        </div>

        {/* How to Reduce Exposure Section */}
        <div className="mt-6 bg-white/20 p-4 rounded-lg hover:bg-white/30 transition">
          <h2 className="text-2xl font-semibold text-white">🚀 How to Reduce Exposure?</h2>
          <ul className="list-disc ml-6 mt-2 text-gray-100">
            <li>Limit outdoor activities when AQI is high.</li>
            <li>Wear a mask if pollution levels are severe.</li>
            <li>Use air purifiers indoors.</li>
            <li>Reduce vehicle emissions by using public transport or carpooling.</li>
            <li>Stay hydrated and maintain a healthy diet to strengthen your immunity.</li>
          </ul>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-6 flex justify-between">
          <Link to="/">
            <button className="px-6 py-3 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-900 transition">
              ⬅️ Back to Weather
            </button>
          </Link>
          <Link to="/aqi-prediction">
            <button className="px-6 py-3 bg-gray-800 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
              Dive Deep into AQI Prediction 🔍
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AQIAwareness;