'use client'

import getBasePath from "@/lib/getBasePath";
import openai from "@/lib/openAi";
import { SunIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";

const Loading = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [alert1, setAlert1] = useState<boolean>(false);
  const [alert2, setAlert2] = useState<boolean>(false);
  const [alert3, setAlert3] = useState<boolean>(false);
  const [GPTJoke, setGPTJoke] = useState<any>(null);

  


  useEffect(() => {
    setMounted(true);
    
    setTimeout(()=>{
      setAlert1(true);
      fetch(`/api/getJoke`, {
        method:"GET",
        headers:{
          "Content-type":"application/json"
        }
      })
      .then(res => res.json())
      .then(json => setGPTJoke(json))
    },10000)

    setTimeout(()=>{
      setAlert1(false);
      setAlert2(true);
    },20000)

    setTimeout(()=>{
      setAlert2(false);
      setAlert3(true);
    },30000)
  }, []);

  return ( 
    <div className={`flex flex-col items-center justify-center bg-gradient-to-br from-rose-700 to-orange-400 min-h-screen w-screen`}>
      <div className={`${!mounted ? "mt-50 opacity-0" : "mt-0 opacity-1"} transition-all duration-400 flex items-center flex-col justify-center`}>
        <SunIcon className="h-11 w-11 animate-spin text-white/50"/>
        <h1 className="text-2xl animate-pulse font-LVRegular tracking-wide text-white">Loading...</h1>

        {/* ALERTS */}
        <div>
          {alert1 && (
            <p className={`font-LVRegular text-sm text-white tracking-wide mt-10`}>
              Hold on, we are crunching the numbers & generating an AI summary of the Weather!
            </p>
          )}
        
          {alert2 && (
            <p className={`font-LVRegular text-sm text-white tracking-wide mt-10`}>
              {GPTJoke && GPTJoke}
              <span className="ml-1 animate-bounce">👀</span>
            </p>
          )}
        
          {alert3 && (
            <p className={`font-LVRegular text-sm text-white tracking-wide mt-10`}>
              {"Don't worry, we are almost there! Just wait a little longer..."}
            </p>
          )}
        </div>
        
      </div>
    </div>
   );
}
 
export default Loading;