import { HourlyMinutely, WeatherDataProps } from "./types";

function WeatherData({ type, data, currentWeather }: WeatherDataProps) {
  const timezone: string | null = data && type !== "Daily" ? new Date(data[0].time).toString().split(' ').slice(6).join(' ') : null
  const weatherNow: HourlyMinutely = currentWeather ?? (data[0] as HourlyMinutely);
  const weatherNowDate: string[] = new Date(weatherNow.time).toString().split(' ');
  return (
    <>
      {
        data ? ( 
          <div className="forecast">
            <h3>Current Weather</h3>
            <div className="weather-item">
              <p>{weatherNowDate.slice(0, 4).join(' ')}</p>
              <p>{weatherNowDate[4]} {weatherNowDate.slice(6).join(' ')}</p>
              <p>{weatherNow.values.temperature}{" \u00B0C"}</p>
            </div>
            <h3>Your {type} Forecast {timezone}</h3>
            <div className="weather-grid">
              {
                data.map((item) => {
                  const date = new Date(item.time).toString().split(' ');
                  return (
                    <div className="weather-item" key={item.time}>
                      <p>{date.slice(0, 4).join(' ')}</p>
                      <p>{type !== "Daily" ? date[4] : "Max temp: " + item.values.temperatureMax + " \u00B0C"}</p>
                      <p>{item.values.temperature ?? "Min temp: " + item.values.temperatureMin}{" \u00B0C"}</p>
                    </div>
                  )
                })
              }
            </div>
          </div>
        ) : <h3>No {type} Forecast</h3>
      }
    </>
  )
}

export default WeatherData
