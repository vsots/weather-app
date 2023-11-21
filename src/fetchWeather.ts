import { QueryFunction } from "@tanstack/react-query";

const fetchWeather: QueryFunction = async ({ queryKey }) => {
  const location = queryKey[1];
  const API_KEY = "YOUR_TOMORROW.IO_API_KEY"
  const res = await fetch(
    `https://api.tomorrow.io/v4/weather/forecast?location=${location}&apikey=${API_KEY}`
  );
  if (!res.ok)
    throw new Error(`weather search failed for: ${location}`);

  return res.json();
}

export default fetchWeather;
