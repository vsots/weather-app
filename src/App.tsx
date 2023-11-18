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
            e.preventDefault(); // Do not want to do full form submit as that refreshes page
            // requestPets();
            const formData = new FormData(e.currentTarget); // browser api, not react
            // const obj = {
            //   location: formData.get("location") as string ?? ""
            // };
            setRequestParams(formData.get("location") as string ?? "Novato");
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
      {isSuccess ? <div>{data?.timelines?.daily[0]?.time}</div> : <div>No Results</div>}
    </>
  )
}

export default App
