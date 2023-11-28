function WeatherData({ data, type }) {
  return (
    <>
      {
        data ? ( 
          <div>
            <h3>Your {type} Forecast</h3>
            <div className="row">
              {
                data.slice(0, 6).map((item) => {
                  const date = new Date(item.time).toString().split(' ');
                  return (
                    <div className="column" key={item.time}>
                      <p>{date.slice(0, 4).join(' ')}</p>
                      <p>{date[4]} {date.slice(6).join(' ')}</p>
                      <p>{item.values.temperature ?? item.values.temperatureAvg} Degrees Celcius</p>
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