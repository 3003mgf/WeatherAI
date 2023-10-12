const cleanData = (data: Root, city:string) =>{
  // NOTE: We want to pass certain data, the first 24 hours, because otherwise we'll pass so much data to ChatGPT that is going to consume our quote really quick. 

  const { current_weather, timezone, hourly, hourly_units, timezone_abbreviation } = data;

  const { temperature, winddirection, windspeed, weathercode, time } = current_weather;

  const { temperature_2m, snowfall, rain, relativehumidity_2m, precipitation_probability, uv_index } = hourly;

  return {
    current_weather: {
      temperature,
      windspeed,
      winddirection,
      time,
      weathercode
    },
    hourly:{
      temperature_2m: temperature_2m.slice(0,24),
      snowfall: snowfall.slice(0, 24),
      rain: rain.slice(0, 24),
      relativehumidity_2m: relativehumidity_2m.slice(0, 24),
      precipitation_probability: precipitation_probability.slice(0, 24),
      uv_index: uv_index.slice(0, 24)
    },
    timezone,
    timezone_abbreviation,
    hourly_units,
    city
  }
};

export default cleanData;