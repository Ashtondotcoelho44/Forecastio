import axios from "axios";

// Use environment variable for AQI API Key
const AQI_API_KEY = import.meta.env.VITE_AQI_API_KEY;

// Hardcoded city-to-state mapping (keys converted to lowercase for case-insensitive comparison)
const cityToStateMap = {
  "mumbai": "Maharashtra",
  "pune": "Maharashtra",
  "defence colony": "Delhi",
  "delhi": "Delhi",
  "new delhi": "Delhi",
  "shahdara": "Delhi",
  "tirupati": "Andhra Pradesh",
  "chandigarh": "Chandigarh",
  "calangute": "Goa",
  "gurugram": "Haryana",
  "hoskote": "Karnataka",
  "koppal": "Karnataka",
  "chennai": "Tamil Nadu",
  "karambakkudi": "Tamil Nadu",
  "ooty": "Tamil Nadu",
  "ramanathapuram": "Tamil Nadu",
  "sivakasi": "Tamil Nadu",
  "hyderabad": "Telangana",
  "ghaziabad": "Uttar Pradesh",
  "asansol": "West Bengal",
  "bara bazar": "West Bengal",
  "baruipur": "West Bengal",
  "durgapur": "West Bengal",
  "haldia": "West Bengal",
  "howrah": "West Bengal",
  "kolkata": "West Bengal",
  "siliguri": "West Bengal",
};

// ✅ Cache storage
const aqiCache = new Map(); // { cityName: { value: AQI, timestamp: time } }
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

export const fetchCurrentAQI = async (cityName) => {
  try {
    // ✅ Convert input city name to lowercase for case-insensitive matching
    const formattedCityName = cityName.trim().toLowerCase();

    // ✅ Get state name from case-insensitive map
    const stateName = cityToStateMap[formattedCityName];

    if (!stateName) {
      console.error(`State not found for city: ${cityName}`);
      return "N/A";
    }

    // ✅ Check cache before making an API request
    if (aqiCache.has(formattedCityName)) {
      const cachedData = aqiCache.get(formattedCityName);
      const timeElapsed = Date.now() - cachedData.timestamp;

      if (timeElapsed < CACHE_DURATION) {
        console.log(`Returning cached AQI for ${cityName}`);
        return cachedData.value;
      } else {
        // Remove expired cache
        aqiCache.delete(formattedCityName);
      }
    }

    console.log(`Fetching AQI for City: ${cityName}, State: ${stateName}`);

    const response = await axios.get(
      `https://api.airvisual.com/v2/city?city=${cityName}&state=${stateName}&country=India&key=${AQI_API_KEY}`
    );

    console.log("Current AQI API Response:", response.data);

    // Validate response structure
    if (response.data?.data?.current?.pollution?.aqius !== undefined) {
      const aqiValue = response.data.data.current.pollution.aqius;

      // ✅ Store the AQI in cache
      aqiCache.set(formattedCityName, { value: aqiValue, timestamp: Date.now() });

      return aqiValue;
    } else {
      console.error("Unexpected API response structure:", response.data);
      return "N/A";
    }
  } catch (error) {
    console.error("Error fetching current AQI:", error?.response?.data || error.message);
    return "N/A";
  }
};
