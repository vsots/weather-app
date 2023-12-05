type TimeType = "Daily" | "Hourly" | "Minutely"

export interface HourlyMinutelyValues {
  temperature: number
}

export interface HourlyMinutely {
  time: string
  values: HourlyMinutelyValues
}

export interface DailyValues {
  temperatureMax: number
}

export interface Daily {
  time: string
  values: DailyValues
}

export interface WeatherDataProps {
  type: TimeType
  data: Daily[] | HourlyMinutely[]
}
