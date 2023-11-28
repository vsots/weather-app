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
          <p>{data?.location?.name}</p>
          <p>{data?.timelines?.minutely[0]?.time}</p>
          <p>{data?.timelines?.minutely[0]?.values?.temperature} Degrees Celcius</p>
        </div>
      ) : <div>No Results</div>}
    </>
  )
}

export default App
