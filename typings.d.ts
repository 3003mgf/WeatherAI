interface CurrentWeather {
  interval: number;
  is_day: number;
  temperature: number;
  time: string;
  weathercode: number;
  winddirection: number;
  windspeed: number;
}

interface CurrentWeatherUnits {
  interval: number
  is_day: number
  temperature: number
  time: string
  weathercode: number
  winddirection: number
  windspeed: number
}

interface Daily {
  apparent_temperature_max: [number];
  apparent_temperature_min: [number];
  sunrise: [string];
  sunset: [string];
  temperature_2m_max: [number];
  temperature_2m_min: [number];
  time: [string];
  uv_index_clear_sky_max: [number];
  uv_index_max: [number];
  weathercode: [number];
}



interface DailyUnits {
  apparent_temperature_max: String
  apparent_temperature_min: String
  sunrise: String
  sunset: String
  temperature_2m_max: String
  temperature_2m_min: String
  time: String
  uv_index_clear_sky_max: String
  uv_index_max: String
  weathercode: String
}


interface HourlyUnits {
  apparent_temperature: String
  precipitation: String
  precipitation_probability: String
  rain: String
  relativehumidity_2m: String
  showers: String
  snow_depth: String
  snowfall: String
  temperature_2m: String
  time: String
  uv_index: String
  uv_index_clear_sky: String
  windgusts_10m: String
}


interface Root {
  current_weather: CurrentWeather
  current_weather_units: CurrentWeatherUnits
  daily: Daily
  daily_units: DailyUnits
  elevation: number
  generationtime_ms: number
  hourly: Hourly
  hourly_units: HourlyUnits
  latitude: number
  longitude: number
  timezone: string
  timezone_abbreviation: string
  utc_offset_secondsnumber: number
}