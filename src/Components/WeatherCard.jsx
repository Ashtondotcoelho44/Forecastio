import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDate } from "../Utils/useDate";
import sun from "../assets/icons/sun.png";
import cloud from "../assets/icons/cloud.png";
import fog from "../assets/icons/fog.png";
import rain from "../assets/icons/rain.png";
import snow from "../assets/icons/snow.png";
import storm from "../assets/icons/storm.png";
import wind from "../assets/icons/windy.png";
import { FaInfoCircle } from "react-icons/fa";
import "../index.css";
import { fetchCurrentAQI } from "../Utils/aqiService"; // 

const WeatherCard = ({
  temperature = "N/A",
  windspeed = "N/A",
  humidity = "N/A",
  place = "Location not available",
  heatIndex = "N/A",
  iconString = "",
  conditions = "Weather conditions unavailable",
}) => {
  const [icon, setIcon] = useState(sun);
  const { time } = useDate();
  const [predictedAQI, setPredictedAQI] = useState(null);
  const [currentAQI, setCurrentAQI] = useState("N/A"); // ✅ Store AQI
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (iconString) {
      const lowerIcon = iconString.toLowerCase();
      if (lowerIcon.includes("cloud")) setIcon(cloud);
      else if (lowerIcon.includes("rain")) setIcon(rain);
      else if (lowerIcon.includes("clear")) setIcon(sun);
      else if (lowerIcon.includes("thunder")) setIcon(storm);
      else if (lowerIcon.includes("fog")) setIcon(fog);
      else if (lowerIcon.includes("snow")) setIcon(snow);
      else if (lowerIcon.includes("wind")) setIcon(wind);
    }
  }, [iconString]);

  // Fetch Current AQI when place changes
  useEffect(() => {
    const getAQI = async () => {
      if (!place) return;
      const cityName = place.split(",")[0].trim();
      const aqi = await fetchCurrentAQI(cityName);
      setCurrentAQI(aqi);
    };

    getAQI();
  }, [place]);

  // Fetch Predicted AQI from Flask API
  useEffect(() => {
    const fetchPredictedAQI = async () => {
      if (!place) return;

      setLoading(true);
      setError(null);
      try {
        const cityName = place.split(",")[0].trim();
        console.log(`Fetching predicted AQI for: ${cityName}`);
        const response = await axios.post("http://127.0.0.1:5000/predict_aqi", { city: cityName });
        console.log("Predicted AQI Response:", response.data);
        setPredictedAQI(response.data.predicted_aqi);
      } catch (error) {
        setError("Error fetching predicted AQI");
        console.error("Error fetching predicted AQI:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPredictedAQI();
  }, [place]);

  return (
    <div className="relative w-[22rem] min-w-[22rem] h-[35rem] glassCard p-2 transition duration-300 hover:shadow-lg hover:shadow-blue-300">
      <div
        className="absolute top-4 right-4 text-gray-300 hover:text-white cursor-pointer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setTimeout(() => setShowTooltip(false), 500)}
      >
        <FaInfoCircle size={22} />
      </div>

      {showTooltip && (
        <div
          className="absolute top-10 right-2 bg-transparent text-white text-xs p-2 rounded-lg shadow-lg w-52 transition-opacity duration-300 opacity-100"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <p className="p-1 bg-green-500/80 text-black">Good (0-50)</p>
          <p className="p-1 bg-yellow-500/80 text-black">Moderate (51-100)</p>
          <p className="p-1 bg-orange-500/80 text-black">Unhealthy for Sensitive Groups (101-150)</p>
          <p className="p-1 bg-red-500/80 text-black">Unhealthy (151-200)</p>
          <p className="p-1 bg-[#8B0000]/80 text-white">Very Unhealthy (201-300)</p>
          <p className="p-1 bg-[#4B0082]/80 text-white">Hazardous (301+)</p>
        </div>
      )}

      <div className="flex w-full justify-center items-center gap-4 mt-12 mb-4">
        <img src={icon} alt={`${iconString} icon`} className="w-16 h-16" />
        <p className="font-bold text-5xl flex justify-center items-center">{temperature}°C</p>
      </div>
      <div className="font-bold text-center text-xl">{place}</div>
      <div className="w-full flex justify-between items-center mt-4">
        <p className="flex-1 text-center p-2">{time}</p>
      </div>

      <div className="w-full flex justify-between items-center mt-4 gap-4">
        <p className="flex-1 text-center p-2 font-bold bg-blue-600 shadow-lg rounded-lg hover:shadow-black transition-shadow">
          Wind Speed
          <p className="font-normal">{windspeed} km/h</p>
        </p>
        <p className="flex-1 text-center p-2 font-bold rounded-lg bg-green-600 shadow-lg hover:shadow-black transition-shadow">
          Humidity
          <p className="font-normal">{typeof humidity === "number" ? `${humidity.toFixed(1)} gm/m³` : "N/A"}</p>
        </p>
      </div>

      <div className="w-full flex justify-between items-center mt-4 gap-4">
        <p className="flex-1 text-center p-2 font-bold rounded-lg bg-purple-600 shadow-lg hover:shadow-black transition-shadow">
          Current AQI
          <p className="font-normal">{currentAQI !== null ? currentAQI : "N/A"}</p>
        </p>
        <p className="flex-1 text-center p-2 font-bold rounded-lg bg-orange-600 shadow-lg hover:shadow-black transition-shadow">
          Predicted AQI
          <p className="font-normal">
            {loading ? "Loading..." : error ? error : predictedAQI !== null ? predictedAQI.toFixed(1) : "N/A"}
          </p>
        </p>
      </div>
      <div className='w-full p-3 mt-4 flex justify-between items-center'>
        <p className='font-semibold text-lg'>Heat Index</p>
        <p className='text-lg'>{heatIndex ? heatIndex : 'N/A'}</p>
        </div>
        <hr className='bg-slate-600' />
      <div className='w-full p-4 flex justify-center items-center text-3xl font-semibold'>
        {conditions}
      </div>
      </div>
  );
};

export default WeatherCard;
