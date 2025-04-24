app.jsx 

import { useState, useEffect } from 'react';
import './App.css';
import search from './assets/icons/search.svg';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { useStateContext } from './Context';
import { BackgroundLayout, WeatherCard, MiniCard } from './Components';
import { fetchCurrentAQI } from './Utils/aqiService'; // Import AQI fetch function

function App() {
  const [input, setInput] = useState('');
  const { weather, thisLocation, values, place, setPlace } = useStateContext();
  const [darkMode, setDarkMode] = useState(false);
  const [currentAQI, setCurrentAQI] = useState('N/A'); // Store AQI data

  const submitCity = () => {
    setPlace(input);
    setInput('');
  };

  useEffect(() => {
    const getAQI = async () => {
      if (!place) return;
      const aqi = await fetchCurrentAQI(place);
      setCurrentAQI(aqi);
    };
    getAQI();
  }, [place]); // Fetch AQI whenever `place` updates

  return (
    <div className={`w-full h-screen text-white px-8 ${darkMode ? 'bg-black' : ''}`}>
      <nav className="w-full p-3 flex justify-between items-center">
        <h1 className="font-bold tracking-wide text-3xl">FORECASTIO</h1>
        <div className="flex items-center gap-4">
          <div className="bg-white w-[15rem] overflow-hidden shadow-2xl rounded flex items-center p-2 gap-2">
            <img src={search} alt="search" className="w-[1.5rem] h-[1.5rem]" />
            <input
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  submitCity();
                }
              }}
              type="text"
              placeholder="Search city"
              className="focus:outline-none w-full text-[#212121] text-lg"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          {/* AQI Awareness Page Button */}
          <Link to="/air-quality">
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition">
              Protect Yourself
            </button>
          </Link>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 bg-blue-950 text-white rounded shadow-lg hover:bg-gray-600 transition"
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
      </nav>
      {!darkMode && <BackgroundLayout />}

      <main className="w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center">
        <WeatherCard
          place={thisLocation}
          windspeed={weather.wspd}
          humidity={weather.humidity}
          temperature={weather.temp}
          heatIndex={weather.heatindex}
          iconString={weather.conditions}
          conditions={weather.conditions}
          currentAQI={currentAQI} // Pass AQI to WeatherCard
        />

        <div className="flex justify-center gap-8 flex-wrap w-[60%]">
          {values?.slice(1, 7).map((curr) => (
            <MiniCard key={curr.datetime} time={curr.datetime} temp={curr.temp} iconString={curr.conditions} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;






import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom"; // ✅ Removed extra Router
import "./App.css";
import search from "./assets/icons/search.svg";
import { useStateContext } from "./Context";
import { BackgroundLayout, WeatherCard, MiniCard } from "./Components";
import { fetchCurrentAQI } from "./Utils/aqiService";
import AQIAwareness from "./pages/AQIAwareness"; // ✅ Import AQIAwareness page

function App() {
  const [input, setInput] = useState("");
  const { weather, thisLocation, values, place, setPlace } = useStateContext();
  const [darkMode, setDarkMode] = useState(false);
  const [currentAQI, setCurrentAQI] = useState("N/A");

  const submitCity = () => {
    setPlace(input);
    setInput("");
  };

  useEffect(() => {
    const getAQI = async () => {
      if (!place) return;
      const aqi = await fetchCurrentAQI(place);
      setCurrentAQI(aqi);
    };
    getAQI();
  }, [place]);

  return (
    <Routes>
      {/* Weather Forecast Main Page */}
      <Route
        path="/"
        element={
          <div className={`w-full h-screen text-white px-8 ${darkMode ? "bg-black" : ""}`}>
            <nav className="w-full p-3 flex justify-between items-center">
              <h1 className="font-bold tracking-wide text-3xl">FORECASTIO</h1>
              <div className="flex items-center gap-4">
                <div className="bg-white w-[15rem] overflow-hidden shadow-2xl rounded flex items-center p-2 gap-2">
                  <img src={search} alt="search" className="w-[1.5rem] h-[1.5rem]" />
                  <input
                    onKeyUp={(e) => {
                      if (e.key === "Enter") {
                        submitCity();
                      }
                    }}
                    type="text"
                    placeholder="Search city"
                    className="focus:outline-none w-full text-[#212121] text-lg"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                </div>

                {/* AQI Awareness Page Button */}
                <Link to="/air-quality">
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition">
                    Protect Yourself
                  </button>
                </Link>

                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 bg-blue-950 text-white rounded shadow-lg hover:bg-gray-600 transition"
                >
                  {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
                </button>
              </div>
            </nav>

            {!darkMode && <BackgroundLayout />}

            <main className="w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center">
              <WeatherCard
                place={thisLocation}
                windspeed={weather.wspd}
                humidity={weather.humidity}
                temperature={weather.temp}
                heatIndex={weather.heatindex}
                iconString={weather.conditions}
                conditions={weather.conditions}
                currentAQI={currentAQI}
              />

              <div className="flex justify-center gap-8 flex-wrap w-[60%]">
                {values?.slice(1, 7).map((curr) => (
                  <MiniCard key={curr.datetime} time={curr.datetime} temp={curr.temp} iconString={curr.conditions} />
                ))}
              </div>
            </main>
          </div>
        }
      />

      {/* AQI Awareness Page */}
      <Route path="/air-quality" element={<AQIAwareness />} />
    </Routes>
  );
}

export default App;
