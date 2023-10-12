'use client'

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ReactNode } from "react";

type Props = {
  children: ReactNode
}

const ApolloProviderComp = ({children}:Props) => {

  const client = new ApolloClient({
    uri: process.env.STEPZEN_URL,
    cache: new InMemoryCache(),
    headers:{
      Authorization:`apiKey ${process.env.NEXT_PUBLIC_STEPZEN_API_KEY}`
    }
  });

  return ( 
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
   );
}
 
export default ApolloProviderComp;