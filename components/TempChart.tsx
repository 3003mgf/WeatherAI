'use client'

import { AreaChart, Card, Text } from "@tremor/react";

type Props = {
  results: Root
}

const TempChart = ({results}:Props) => {

  // NOTE: By slicing it we obtain the first 24 hours.
  const hourly = results?.hourly.time.map((time:string)=> 
  new Date(time)
  .toLocaleString("en-US", {
    hour:"numeric",
    hour12: false
  })).slice(1, 25);

  
  const data = hourly.map((hour:string, index:number)=> ({
    time: Number(hour),
    "UV Index": results.hourly.uv_index[index],
    "Temperature (C)": results.hourly.temperature_2m[index]
  }));

  const dataFormatter = (number:number) => `${number}`; 

  return ( 
    <Card>
      <Text>Temperature & UV Index</Text>
      <AreaChart
        data={data}
        showLegend={true}
        index="time"
        categories={["Temperature (C)", "UV Index"]}
        colors={["yellow", "rose"]}
        minValue={0}
        valueFormatter={dataFormatter}
        yAxisWidth={40}
      />
    </Card>
   );
}
 
export default TempChart;