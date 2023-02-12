import React, { useState, useEffect } from "react";
import "./countdown.css";

interface Props {
  countDownDate: number;
}

const Countdown: React.FC<Props> = ({ countDownDate }) => {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      if (distance < 0) {
        clearInterval(intervalId);
        return;
      }

      setTime({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [countDownDate]);

  const { days, hours, minutes, seconds } = time;

  return (
    <div className='main-header'>
      <h2>
        След <strong>{days}</strong> дни, <strong>{hours}</strong> часа, <strong>{minutes}</strong> минути и <strong>{seconds}</strong> секунди !
      </h2>
    </div>
  );
};

export default Countdown;