function WeatherData({ data }) {
  return (
    <div className="row">
      {data ? data.slice(0, 6).map((item) => {
        const date = new Date(item.time).toString().split(' ');
        return (
          <div className="column" key={item.time}>
            <p>{date.slice(0, 4).join(' ')}</p>
            <p>{date[4]} {date.slice(6).join(' ')}</p>
            <p>{item.values.temperature ?? item.values.temperatureAvg} Degrees Celcius</p>
          </div>
        )
      }) : <p>No Hourly Forecast</p>}
    </div>
  )
}

export default WeatherData
