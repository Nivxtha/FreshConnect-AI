import { useEffect, useState } from "react";
import "./Countdown.css";

function Countdown() {

  const target = new Date("August 5, 2026 18:00:00").getTime();

  const [time, setTime] = useState(target - Date.now());

  useEffect(() => {

    const timer = setInterval(() => {
      setTime(target - Date.now());
    }, 1000);

    return () => clearInterval(timer);

  }, []);

  const days = Math.max(0, Math.floor(time / (1000 * 60 * 60 * 24)));
  const hours = Math.max(0, Math.floor((time / (1000 * 60 * 60)) % 24));
  const minutes = Math.max(0, Math.floor((time / (1000 * 60)) % 60));
  const seconds = Math.max(0, Math.floor((time / 1000) % 60));

  return (

    <section className="countdown">

      <h2>🎉 Freshers Welcome Party</h2>

      <p>Countdown to the biggest event on campus!</p>

      <div className="timer">

        <div className="box">
          <h1>{days}</h1>
          <span>Days</span>
        </div>

        <div className="box">
          <h1>{hours}</h1>
          <span>Hours</span>
        </div>

        <div className="box">
          <h1>{minutes}</h1>
          <span>Minutes</span>
        </div>

        <div className="box">
          <h1>{seconds}</h1>
          <span>Seconds</span>
        </div>

      </div>

    </section>

  );

}

export default Countdown;