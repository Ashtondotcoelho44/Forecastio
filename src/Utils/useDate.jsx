import { useEffect, useState } from "react";

/**
 * Custom hook to get the current date and time.
 * Updates every minute.
 */
export const useDate = () => {
    const locale = 'en';  // Language locale
    const [today, setDate] = useState(new Date());

    useEffect(() => {
        // Update the time every minute
        const timer = setInterval(() => {
            setDate(new Date());
        }, 60 * 1000);

        // Cleanup function to clear the interval when the component unmounts
        return () => {
            clearInterval(timer);
        };
    }, []);

    // Get the weekday, date, and month
    const day = today.toLocaleDateString(locale, { weekday: 'long' });
    const date = `${day}, ${today.getDate()} ${today.toLocaleDateString(locale, { month: 'long' })}`;

    // Get the current time in 12-hour format
    const time = today.toLocaleTimeString(locale, { hour: 'numeric', minute: 'numeric', hour12: true });

    return {
        date,
        time
    };
};
