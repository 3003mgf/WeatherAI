'use client'

import Select, { SingleValue } from 'react-select'
import { Country, State, City, ICountry }  from 'country-state-city';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GlobeAltIcon } from '@heroicons/react/20/solid';

type countryOption = {
  value: {
    latitude: string;
    longitude: string;
    isoCode: string;
  };
  label: string;
} | null;

type cityOption = {
  value:{
    latitude: string;
    longitude: string;
    countryCode: string;
    name: string;
    stateCode: string;
  };
  label: string;
} | null;

const options = Country.getAllCountries().map((country) => ({
  value: {
    latitude: country.latitude!,
    longitude: country.longitude!,
    isoCode: country.isoCode!,
  },
  label: country.name!,
}));


const CityPicker = () => {

  const [selectedCountry, setSelectedCountry] = useState<countryOption>(null);
  const [selectedCity, setSelectedCity] = useState<cityOption>(null);
  
  const router = useRouter();

  const handleSelectedCountry = (option:countryOption) =>{
    setSelectedCountry(option);
    setSelectedCity(null);
  };

  const handleSelectedCity = (option:cityOption) =>{
    setSelectedCity(option);
    router.push(`/location/${option?.value.name}/${option?.value.latitude}/${option?.value.longitude}/${selectedCountry?.label}`);
  };



  return ( 
    <div className='space-y-1'>

      {/* Country Input */}
      <div className='flex items-center space-x-2'>
        <GlobeAltIcon className='h-4 w-4 text-white' id='country'/>
        <label htmlFor="country" className='text-white text-sm tracking-wide font-LVRegular'>Country</label>
      </div>
      <Select 
        className='font-LVRegular text-sm text-black pb-3'
        value={selectedCountry}
        onChange={handleSelectedCountry}
        options={options}
      />

      {/* City Input */}
      {selectedCountry && (
        <div className='pt-4 space-y-1'>
          <div className='flex items-center space-x-2'>
            <GlobeAltIcon className='h-4 w-4 text-white' id='city'/>
            <label htmlFor="city" className='text-white text-sm tracking-wide font-LVRegular'>City</label>
          </div>
          <Select 
  
            className='font-LVRegular text-black text-sm'
            value={selectedCity}
            onChange={handleSelectedCity}
            options={
              City.getCitiesOfCountry(selectedCountry?.value.isoCode)?.map(state => ({
                value: {
                  latitude: state.latitude!,
                  longitude: state.longitude!,
                  countryCode: state.countryCode!,
                  name: state.name!,
                  stateCode: state.stateCode!
                },
                label: state.name!
              }))
            }
          />
        </div>
      )}
    </div>
   );
}
 
export default CityPicker;