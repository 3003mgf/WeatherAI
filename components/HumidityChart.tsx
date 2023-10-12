'use client'

import { AreaChart, Card, Text } from "@tremor/react";

type Props = {
  results: Root
}

const HumidityChart = ({results}:Props) => {

  // NOTE: By slicing it we obtain the first 24 hours.
  const hourly = results?.hourly.time.map((time:string)=> 
  new Date(time)
  .toLocaleString("en-US", {
    hour:"numeric",
    hour12: false
  })).slice(1, 25);

  
  const data = hourly.map((hour:string, index:number)=> ({
    time: Number(hour),
    "Humidity (%)": results.hourly.relativehumidity_2m[index],
  }));

  const dataFormatter = (number:number) => `${number} %`; 

  return ( 
    <Card>
      <Text>Humidity Level</Text>
      <AreaChart
        data={data}
        showLegend={true}
        index="time"
        categories={["Humidity (%)"]}
        colors={["teal"]}
        minValue={0}
        maxValue={100}
        valueFormatter={dataFormatter}
        yAxisWidth={40}
      />
    </Card>
   );
}
 
export default HumidityChart;