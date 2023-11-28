import { useState } from 'react';
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import fetchWeather from './fetchWeather';
import WeatherData from './WeatherData';

import './App.css'

function App() {
  const [requestParams, setRequestParams] = useState("");

  const { data, isSuccess } = useQuery({
    queryKey: ["search", requestParams], 
    queryFn: fetchWeather
  });

  return (
    <BrowserRouter>
      <div className="input">
        <h1>Find Your Weather</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            setRequestParams(formData.get("location") as string ?? "");
          }}
        >
          <label htmlFor="location">
            <input
              type="text"
              name="location"
              id="location"
              placeholder="Location"
              readOnly={false}
            />
          </label>
          <button>Search</button>
        </form>
        {isSuccess ? (
          <div>
            <h2>Weather for {data?.location?.name}</h2>
            <Link to="/"> Clear </Link>
            <Link to="/daily"> Daily </Link>
            <Link to="/hourly"> Hourly </Link>
            <Link to="/minutely"> Minutely </Link>
          </div>
        ) : <div>No Results</div>}
        <Routes>
          <Route path="/daily" element={<WeatherData data={data?.timelines?.daily}/>} />
          <Route path="/hourly" element={<WeatherData data={data?.timelines?.hourly}/>} />
          <Route path="/minutely" element={<WeatherData data={data?.timelines?.minutely}/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
