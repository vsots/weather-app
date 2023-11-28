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

  console.log(data)

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
            {data?.timelines?.daily?.map((item) => {
              const date = new Date(item.time).toString().split(' ');
              return (
                <div className="column" key={item.time}>
                  <p>{date.slice(0, 4).join(' ')}</p>
                  <p>{date[4]} {date.slice(6).join(' ')}</p>
                  <p>{item.values.temperatureAvg} Degrees Celcius</p>
                </div>
              )
            })}
          </div>
        </div>
      ) : <div>No Results</div>}
    </>
  )
}

export default App
