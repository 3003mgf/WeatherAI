import openai from "@/lib/openAi";
import { NextResponse } from "next/server";

export async function POST(request: Request){

  const { weatherData } = await request.json();

  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0.8,
    n: 1,
    stream: false,
    messages:[
      {
        role: "system",
        content:"Pretend you're a weather news presenter presenting LIVE on television. Be energetic and full of charisma. Introduce yourself as NachBot and say you are LIVE from MGF Headquarters. State the city you are providing a summary for. Then give a summary of todays weather only. Make it easy for the viewer to understand and know what to do to prepare for those weather conditions such as wear SPF if the UV is high etc. Use the uv_index data provided to provide UV advice. Provide a joke regarding the weather. Assume the data came from your team at the news office and not the user"
      },
      {
        role: "user",
        content: `Hi there, can i get a summary of todays weather, use the following information to get the weather data: ${JSON.stringify(weatherData)}`,
      }
    ]
  });

  const response = chatCompletion.choices[0].message
  
  return NextResponse.json(response)
}