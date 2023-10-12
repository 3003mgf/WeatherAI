import openai from "@/lib/openAi";
import { NextResponse } from "next/server";

export async function GET(request: Request){

  const chatCompletion = await openai.completions.create({
    model:"text-davinci-002",
    prompt:"Create a one line weather joke, in the joke you must ask a question and then you answer, I will show this joke to the user while my weather page is loading.",
    max_tokens: 30,
    temperature: 0.8
  });

  const response = chatCompletion.choices[0].text;
  
  return NextResponse.json(response)
}