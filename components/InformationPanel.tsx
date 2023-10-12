'use client'

import { Divider } from "@tremor/react";
import CityPicker from "./CityPicker";
import weatherCodeToString from "@/lib/weatherCodeToString";
import Image from "next/image";
import { ArrowLeftIcon, MoonIcon, SunIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";

type Props = {
  city: string;
  country: string;
  lat: string;
  long: string;
  results:Root;
}

const InformationPanel = ({city, lat, long, country, results}:Props) => {
 
  const router = useRouter();
 
  return ( 
    <div className="lg:col-span-4 xl:col-span-3 bg-gradient-to-br from-pink-700 to-orange-300 p-10 text-white relative w-30">
      
      {/* Go Back Button */}
      <div className="absolute top-3 left-3 cursor-pointer" onClick={()=> router.push("/")}>
        <ArrowLeftIcon className="h-5 w-5 text-white"/>
      </div>
      {/*  */}
      <div className="pb-8 space-y-3">
        <h1 className={`${city.length > 10 ? "text-4xl" : "text-5xl"} font-bold`}>{decodeURI(city)}</h1>
        <p className="text-sm tracking-wider font-LVRegular text-gray-200 ml-1">{decodeURI(country)}</p>
      </div>
      <CityPicker/>
      <Divider className="my-10"/>

      {/* TIMEZONE */}
      <div className="mt-5 flex items-center justify-between space-x-10 mb-5">
        <div className="space-y-2">
          <p className="font-LVRegular">
            {new Date().toLocaleDateString("en-GB", {
              weekday:"long",
              year:"numeric",
              month:"long",
              day:"numeric"
            })}
          </p>
          {/* NOTE: Get Timezone */}
          <p className="font-LVRegular text-xs">Timezone: <span>{Intl.DateTimeFormat().resolvedOptions().timeZone || "N/A"}</span></p>
        </div>

        <p className="font-LVRegular text-sm font-bold uppercase">
          {new Date().toLocaleTimeString("en-GB", {
            hour:"numeric",
            minute:"numeric",
            hour12:true 
          })}
        </p>
      </div>
      
      <Divider className="my-10"/>

      {/* IMAGE */}
      <div>
        <div>
          {/* Image */}
          <Image
            src={`https://www.weatherbit.io/static/img/icons/${weatherCodeToString[results.current_weather.weathercode].icon}.png`}
            alt="current-weather"
            width={75}
            height={75}
          />
          <div className="flex items-center gap-10">
            <p className="text-6xl font-semibold">{`${results.current_weather.temperature.toFixed()}˚C`}</p>
            <p className="font-LVRegular text-lg">
              {weatherCodeToString[results.current_weather.weathercode].label}
            </p>
          </div>
        </div>
      </div>


      {/* SUNRISE & SUNSET */}
      <div className="space-y-2 py-5 mt-5">
        <div className="flex items-center space-x-2 px-4 py-3 bg-white/20 rounded-md border border-white/50">
          <SunIcon className="h-10 w-10 text-white/50"/>
          <div className="flex-1 flex justify-between items-center">
            <p className="font-LVRegular">Sunrise</p>
            <p className="uppercase text-xl font-LVRegular">
              {new Date(results.daily.sunrise[0]).toLocaleTimeString("en-GB", {
                hour: "numeric",
                minute: "numeric",
                hour12: true
              })}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 px-4 py-3 bg-white/20 rounded-md border border-white/50">
          <MoonIcon className="h-10 w-10 text-white/50"/>
          <div className="flex-1 flex justify-between items-center">
            <p className="font-LVRegular">Sunset</p>
            <p className="uppercase text-xl font-LVRegular">
              {new Date(results.daily.sunset[0]).toLocaleTimeString("en-GB", {
                hour: "numeric",
                minute: "numeric",
                hour12: true
              })}
            </p>
          </div>
        </div>
      </div>

    </div>
   );
}
 
export default InformationPanel;