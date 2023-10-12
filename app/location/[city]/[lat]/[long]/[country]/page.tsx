import { getClient } from "@/apollo-client";
import CalloutCard from "@/components/CalloutCard";
import HumidityChart from "@/components/HumidityChart";
import InformationPanel from "@/components/InformationPanel";
import RainChart from "@/components/RainChart";
import StatCard from "@/components/StatCard";
import TempChart from "@/components/TempChart";
import fetchWeatherQuery from "@/graphQL/queries/fetchWeatherQueries";
import cleanData from "@/lib/cleanData";
import getBasePath from "@/lib/getBasePath";
import { Divider } from "@tremor/react";

// NOTE: With this we revalidate the cache every 60 seconds
export const revalidate = 60;

// NOTE: We are making an ES6 destructuring technique, where we can include the params in our Props.
type Props = {
  params: {
    city: string;
    lat: string;
    long: string;
    country: string;
  }
};

const LocationPage = async({params: {city, lat, long, country}}: Props) => {
  
  const { data } = await getClient().query({
    query: fetchWeatherQuery,
    variables: {
       current_weather: "true",
       longitude: long.toString(),
       latitude: lat.toString(),
       timezone: 'GMT'
    }
  });

  const results:Root = data.myQuery;

  const dataToSend = cleanData(results, city);


  const getAINews = await fetch(`${getBasePath()}/api/getWeatherGPT`, {
    method:"POST",
    headers:{
      "Content-type":"application/json"
    },
    body: JSON.stringify({weatherData: dataToSend})
  });

  const GPTData = await getAINews.json();
  const { content } = GPTData;
  

  return ( 
    <div className="flex flex-col min-h-screen lg:grid lg:grid-cols-10">
      {/* Information Panel */}
        <InformationPanel
          city={city}
          lat={lat}
          long={long}
          country={country}
          results={results}
        />
      <div className="p-5 lg:p-10 lg:col-span-6 xl:col-span-7">
        <div className="p-5">
          <div className="pb-5">
            <h2 className="font-semibold text-sm">{"Today's Overview"}</h2>
            <p className="font-LVRegular text-sm text-gray-500 mt-1">
              Last Updated at:&nbsp;
              <span className="text-xs" >
                {new Date(results.current_weather.time).toLocaleString()}
                ({results.timezone})
              </span>
            </p>

           {/* AI Card */}
            <div className="m-2 mb-10 mt-5">
              <CalloutCard message={content} info/>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 m-2">
              <StatCard
                title="Maximum Temperature"
                metric={`${results.daily.temperature_2m_max[0].toFixed(1)}˚`}
                color="yellow"
              />
              <StatCard
                title="Maximum Temperature"
                metric={`${results.daily.temperature_2m_min[0].toFixed(1)}˚`}
                color="green"
              />
              {/* UV Sub Div */}
              <div>
                <StatCard
                  title="UV Index"
                  metric={`${results.daily.uv_index_max[0].toFixed(1)}˚`}
                  color="rose"
                />
                {Number(results.daily.temperature_2m_min[0].toFixed(1)) > 5 && (
                  <CalloutCard
                    message="Wow! The UV is high today, make sure you wear SPF!"
                    warning
                  />
                )}
              </div>

              {/* Wind Speed & Direction SubDiv */}
              <div className="flex space-x-3">
                <StatCard
                  title="Wind Speed"
                  metric={`${results.current_weather.windspeed.toFixed(1)}m/s`}
                  color="cyan"
                />
                <StatCard
                  title="Wind Direction"
                  metric={`${results.current_weather.winddirection.toFixed(1)}˚`}
                  color="violet"
                />
              </div>
            </div>

          </div> {/* PB-5 End */}
          <Divider className="mb-5"/>

          <div className="space-y-3">
              {/* CHARTS */}
              <TempChart results={results}/>
              <RainChart results={results}/>
              <HumidityChart results={results}/>
          </div>

        </div> {/* P-5 End */}
      </div> {/* Information Panel End */}
    </div>
   );
}
 
export default LocationPage;