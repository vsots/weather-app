import { useState } from 'react';
import { Link, BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import fetchWeather from './fetchWeather';
import WeatherData from './WeatherData';
import { HourlyMinutely, Daily, DailyValues, HourlyMinutelyValues } from './types';

import './App.css'

function App() {
  const [requestParams, setRequestParams] = useState("");

  const { data, isSuccess } = useQuery({
    queryKey: ["search", requestParams], 
    queryFn: fetchWeather
  });

  const daily: Daily[] = data?.timelines?.daily?.map((item) => { 
    const time: string = item.time
    const values: DailyValues = { temperatureMax: item.values.temperatureMax, temperatureMin: item.values.temperatureMin }
    return {time, values}
  }) ?? []

  const hourly: HourlyMinutely[] = data?.timelines?.hourly?.map((item) => { 
    const time: string = item.time
    const values: HourlyMinutelyValues = { temperature: item.values.temperature }
    return {time, values}
  }) ?? []

  const minutely: HourlyMinutely[] = data?.timelines?.minutely?.map((item) => { 
    const time: string = item.time
    const values: HourlyMinutelyValues = { temperature: item.values.temperature }
    return {time, values}
  }) ?? []

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
      </div>
        {isSuccess ? (
          <div>
            <div className="loc-and-links">
              <h2>Weather for {data?.location?.name}</h2>
              <Link to="/daily"> Daily </Link>
              <Link to="/hourly"> Hourly </Link>
              <Link to="/minutely"> Minutely </Link>
            </div>
            <Routes>
              <Route path="/">
                <Route index element={<Navigate to="/daily" />} />
                <Route path="daily" element={<WeatherData data={daily} type={"Daily"} currentWeather={minutely[0]} />} />
                <Route path="hourly" element={<WeatherData data={hourly} type={"Hourly"} currentWeather={minutely[0]} />} />
                <Route path="minutely" element={<WeatherData data={minutely} type={"Minutely"} />} />
              </Route>  
            </Routes>
          </div>
        ) : <h3>No Results</h3>}
    </BrowserRouter>
  )
}

export default App
