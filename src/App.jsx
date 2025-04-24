import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom'; //Import Routes & Route
import './App.css';
import search from './assets/icons/search.svg';
import { useStateContext } from './Context';
import { BackgroundLayout, WeatherCard, MiniCard } from './Components';
import { fetchCurrentAQI } from './Utils/aqiService';
import AQIAwareness from './pages/AQIAwareness'; // Import AQIAwareness page
import AQIPrediction from './pages/AQIPrediction'; // Import AQI Prediction page
import CompareCities from './pages/CompareCities'; // Import Compare Cities page

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
    <Routes> {/* Wrap everything inside Routes */}
      {/* Main Weather Page */}
      <Route
        path="/"
        element={
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
                  <button className="px-4 py-2 bg-green-400/20 backdrop-blur-md border border-green-300/30 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-400/30 transition">
                    PRECAUTIONS !!
                  </button>
                </Link>

                {/* AQI Prediction Page Button */}
                <Link to="/aqi-prediction">
                  <button className="px-4 py-2 bg-blue-400/20 backdrop-blur-md border border-blue-300/30 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-400/30 transition">
                    CURIOUS ?
                  </button>
                </Link>

                {/* Compare Cities Page Button */}
                <Link to="/compare-cities">
                  <button className="px-4 py-2 bg-purple-400/20 backdrop-blur-md border border-purple-300/30 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-purple-400/30 transition">
                    COMPARE CITIES
                  </button>
                </Link>

                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="bg-black-400/20 backdrop-blur-md border border-black-300/30 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-black-400/30 transition"
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
        }
      />

      {/* AQI Awareness Page Route */}
      <Route path="/air-quality" element={<AQIAwareness />} />

      {/* AQI Prediction Page Route */}
      <Route path="/aqi-prediction" element={<AQIPrediction />} />

      {/* Compare Cities Page Route */}
      <Route path="/compare-cities" element={<CompareCities />} />
    </Routes>
  );
}

export default App;
