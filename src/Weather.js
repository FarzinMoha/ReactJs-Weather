import axios from "axios";
import { useEffect, useState } from "react";
import "./Weather.css";
const Weather = () => {
  const [response, setResponse] = useState(null);
  const [query, setQuery] = useState(null);
  const [today, setToday] = useState(null);
  const now = () => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const current = new Date();
    let day = current.getDay();
    const date = `${days[day]} ${current.getDate()} ${
      months[current.getMonth()]
    } ${current.getFullYear()}`;
    setToday(date);
  };
  const temp = (e) => {
    if (e.key === "Enter") {
      axios
        .get(
          `http://api.weatherapi.com/v1/current.json?key=7aa932a8849b4ca6831132006220307&q=${query}&aqi=yes`
        )
        .then((res) => setResponse(res.data));
        now()
    }
  };

  return (
    <>
      <div className="container">
        <div className="serach">
          <input
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={temp}
          />
        </div>
        {response ? <>
            <div className="weather-info">
            <h1>
              {response.location.name}
              <span>,{response.location.country}</span>
            </h1>
            <h2>{today}</h2>
            <p className="temp">{response.current.temp_c}°C</p>
            <p className="condition">Cloudy</p>
          </div>
          <div className="image">
            <img src={response.current.condition.icon} alt="person" />
          </div>
        </> : " "}
      </div>
    </>
  );
};

export default Weather;
