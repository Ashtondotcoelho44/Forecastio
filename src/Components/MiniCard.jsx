/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import sun from '../assets/icons/sun.png';
import cloud from '../assets/icons/cloud.png';
import fog from '../assets/icons/fog.png';
import rain from '../assets/icons/rain.png';
import snow from '../assets/icons/snow.png';
import storm from '../assets/icons/storm.png';
import wind from '../assets/icons/windy.png';

const MiniCard = ({ time, temp, iconString }) => {
  const [icon, setIcon] = useState(sun);

  useEffect(() => {
    if (!iconString) return;

    const lowerIcon = iconString.toLowerCase();
    if (lowerIcon.includes('cloud')) setIcon(cloud);
    else if (lowerIcon.includes('rain')) setIcon(rain);
    else if (lowerIcon.includes('clear')) setIcon(sun);
    else if (lowerIcon.includes('thunder')) setIcon(storm);
    else if (lowerIcon.includes('fog')) setIcon(fog);
    else if (lowerIcon.includes('snow')) setIcon(snow);
    else if (lowerIcon.includes('wind')) setIcon(wind);
  }, [iconString]);

  return (
    <div className="glassCard w-[10rem] h-[10rem] p-4 flex flex-col transition duration-300 shadow-lg hover:shadow-2xl hover:shadow-blue-400 rounded-lg">
      <p className="text-center font-semibold">
        {new Date(time).toLocaleTimeString('en', { weekday: 'long' }).split(' ')[0]}
      </p>
      <hr className="border-gray-300" />
      <div className="w-full flex justify-center items-center flex-1">
        <img src={icon} alt="forecast not available" className="w-[4rem] h-[4rem]" />
      </div>
      <p className="text-center font-bold text-lg">{temp}&deg;C</p>
    </div>
  );
};

export default MiniCard;
