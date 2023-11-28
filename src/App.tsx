import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import fetchWeather from './fetchWeather';

import './App.css'

function App() {
  const [requestParams, setRequestParams] = useState("");

  const { data, isSuccess } = useQuery({
    queryKey: ["search", requestParams], 
    queryFn: fetchWeather
  });

  return (
    <>
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
          <h2>Weather for {data?.location?.name}</h2>
          <div className="row">
            <div className="column">
              <p>{(new Date(data?.timelines?.hourly[0]?.time)).toString()}</p>
              <p>{data?.timelines?.hourly[0]?.values?.temperature} Degrees Celcius</p>
            </div>
            <div className="column">
              <p>{(new Date(data?.timelines?.hourly[1]?.time)).toString()}</p>
              <p>{data?.timelines?.hourly[1]?.values?.temperature} Degrees Celcius</p>
            </div>
            <div className="column">
              <p>{(new Date(data?.timelines?.hourly[2]?.time)).toString()}</p>
              <p>{data?.timelines?.hourly[2]?.values?.temperature} Degrees Celcius</p>
            </div>
          </div>
          
        </div>
      ) : <div>No Results</div>}
    </>
  )
}

export default App
