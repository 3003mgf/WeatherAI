'use client'
import CityPicker from "@/components/CityPicker";
import { AtSymbolIcon } from "@heroicons/react/20/solid";
// NOTE: Tremor 2.0 has not been updated yet to support Client Components

import { Card, Divider, Subtitle, Text } from "@tremor/react";
import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";

export default function Home() {

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
    
  return (
    <div className={`bg-gradient-to-br from-rose-700 to-orange-300 min-h-screen flex flex-col items-center justify-start p-10 relative`}>
      <div className="max-w-4xl flex flex-col items-center justify-center mx-auto bg-transparent border-none w-full"> 
        <div 
        className={`${!mounted ? "-mt-20 -pt-10 opacity-0" : "mt-0 pt-0 opacity-1"} transition-all duration-500 w-full rounded-xl p-4`}>
          <Text className="text-center font-bold md:text-4xl text-white tracking-wide mb-6">
            {"Weather 3003'"}
          </Text>
          <Subtitle className={`text-center lg:text-lg font-LVRegular text-white/80`}>
            Powered by OpenAI, Next.js 13.3, Tailwind CSS, Tremor 2.0, GraphQL + More!
          </Subtitle>
        </div>
        <div className={`${!mounted ? "mt-20 pt-10 opacity-0" : "mt-0 pt-0 opacity-1"} transition-all duration-500 w-1/2 mt-20`}>
          <div className="bg-white/30 p-6 rounded-md">
            {/* CityPicker */}
            <CityPicker/>
          </div>
        </div>

        {/* LOADER WHEN MOUNTING */}
        <div className={`${!mounted ? "flex opacity-1" : "hidden opacity-0"} transition-all duration-400`}>
          <TailSpin
            height="40"
            width="40"
            color="#ffffff"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>

        <div className={`${!mounted ? "-mb-20 opacity-0" : "mb-0 opacity-1"} transition-all duration-1000 text-white absolute bottom-7 left-0 items-center justify-center w-full flex`}>
          <AtSymbolIcon className="h-4 w-4 mr-1"/>
          <p className="tracking-wider text-sm font-LVRegular">Designed & Builted by 3003mgf</p>
        </div>
      </div>
    </div>
  )
}
