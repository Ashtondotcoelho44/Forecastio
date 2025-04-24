import { useState, useEffect } from "react";
import { fetchCurrentAQI } from "../Utils/aqiService"; // ✅ Import AQI fetching function

const CACHE_EXPIRY_TIME = 30 * 60 * 1000; // 30 minutes in milliseconds

const CompareCities = () => {
  const [city1, setCity1] = useState("");
  const [city2, setCity2] = useState("");
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);
  const [loading, setLoading] = useState(false);

  //  Helper function to format city names properly (Title Case)
  const formatCityName = (city) => {
    return city
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  //  Function to check cache
  const getCachedAQI = (city) => {
    const cachedData = localStorage.getItem(`aqi_${city}`);
    if (cachedData) {
      const { aqi, timestamp } = JSON.parse(cachedData);
      if (Date.now() - timestamp < CACHE_EXPIRY_TIME) {
        return aqi; // Use cached AQI if it's still valid
      }
    }
    return null; // No valid cache
  };

  // Function to store AQI in cache
  const setCachedAQI = (city, aqi) => {
    const dataToCache = { aqi, timestamp: Date.now() };
    localStorage.setItem(`aqi_${city}`, JSON.stringify(dataToCache));
  };

  const handleCompare = async () => {
    if (!city1 || !city2) {
      alert("Please enter both cities to compare.");
      return;
    }

    setLoading(true);

    try {
      // Format city names before fetching AQI
      const formattedCity1 = formatCityName(city1);
      const formattedCity2 = formatCityName(city2);

      let aqi1 = getCachedAQI(formattedCity1);
      let aqi2 = getCachedAQI(formattedCity2);

      if (!aqi1) {
        aqi1 = await fetchCurrentAQI(formattedCity1);
        setCachedAQI(formattedCity1, aqi1);
      }

      if (!aqi2) {
        aqi2 = await fetchCurrentAQI(formattedCity2);
        setCachedAQI(formattedCity2, aqi2);
      }

      // Store Data
      setData1({ city: formattedCity1, aqi: aqi1 });
      setData2({ city: formattedCity2, aqi: aqi2 });

    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch data. Please try again.");
    }

    setLoading(false);
  };

  // Handle Enter key press
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleCompare();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg w-[90%] md:w-[50%] text-center">
        <h1 className="text-3xl font-bold mb-6">Compare Cities</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Enter first city"
            className="p-3 rounded-lg bg-white/20 text-black w-full outline-none"
            value={city1}
            onChange={(e) => setCity1(e.target.value)}
            onKeyDown={handleKeyDown} //Pressing Enter triggers comparison
          />
          <input
            type="text"
            placeholder="Enter second city"
            className="p-3 rounded-lg bg-white/20 text-black w-full outline-none"
            value={city2}
            onChange={(e) => setCity2(e.target.value)}
            onKeyDown={handleKeyDown} //Pressing Enter triggers comparison
          />
        </div>

        <button
          onClick={handleCompare}
          className="px-6 py-3 bg-blue-500/20 backdrop-blur-md border border-blue-300/30 text-white rounded-lg shadow-lg hover:bg-blue-500/30 transition"
          disabled={loading}
        >
          {loading ? "Comparing..." : "Compare"}
        </button>

        {/*Display Data if Available */}
        {data1 && data2 && (
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">Comparison Results</h2>
            <div className="flex justify-between gap-6">
              <div className="bg-white/20 p-4 rounded-lg shadow-md w-[45%]">
                <h3 className="text-xl font-bold">{data1.city}</h3>
                <p className="text-lg">AQI: {data1.aqi}</p>
              </div>
              <div className="bg-white/20 p-4 rounded-lg shadow-md w-[45%]">
                <h3 className="text-xl font-bold">{data2.city}</h3>
                <p className="text-lg">AQI: {data2.aqi}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompareCities;
