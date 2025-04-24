import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const [weather, setWeather] = useState({});
    const [values, setValues] = useState([]);
    const [place, setPlace] = useState("Mumbai");
    const [thisLocation, setLocation] = useState("");

    const fetchWeather = async () => {
        console.log("Using API Key:", import.meta.env.VITE_API_KEY); // ✅ Add this log
    
        const options = {
            method: "GET",
            url: "https://visual-crossing-weather.p.rapidapi.com/forecast",
            params: {
                aggregateHours: "24",
                location: place,
                contentType: "json",
                unitGroup: "metric",
                shortColumnNames: 0,
            },
            headers: {
                "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
                "X-RapidAPI-Host": "visual-crossing-weather.p.rapidapi.com",
            },
        };
    
        try {
            const response = await axios.request(options);
            console.log("Weather Data:", response.data);

            if (response.data.locations && Object.keys(response.data.locations).length > 0) {
                const thisData = Object.values(response.data.locations)[0];
                setLocation(thisData.address);
                setValues(thisData.values);
                setWeather(thisData.values[0]);
            } else {
                console.error("No locations found for the specified place.");
                alert("This place does not exist");
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
            alert("Error fetching weather data. Please try again.");
        }
    };
    

    useEffect(() => {
        fetchWeather();
    }, [place]);

    return (
        <StateContext.Provider value={{ weather, setPlace, values, thisLocation, place }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
