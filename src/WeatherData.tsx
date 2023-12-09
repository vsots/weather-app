import { WeatherDataProps } from "./types";

function WeatherData({ type, data }: WeatherDataProps) {
  return (
    <>
      {
        data ? ( 
          <div className="forecast">
            <h3>Your {type} Forecast</h3>
            <div className="weather-grid">
              {
                data.map((item) => {
                  const date = new Date(item.time).toString().split(' ');
                  return (
                    <div className="weather-item" key={item.time}>
                      <p>{date.slice(0, 4).join(' ')}</p>
                      <p>{date[4]} {date.slice(6).join(' ')}</p>
                      <p>{item.values.temperature ?? item.values.temperatureMax} Degrees Celcius</p>
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
