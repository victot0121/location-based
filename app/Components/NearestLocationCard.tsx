

//Create a custom hook, useUserLocation, to encapsulate the geolocation logic.

import React from 'react'

export interface LocationItem {
    id: number;
    location: { latitude: number; longitude: number };
    image: string;
    locationName: string;
    population: number;
}

interface NearestLocationCardProps {
    location: LocationItem;
}

const NearestLocationCard: React.FC<NearestLocationCardProps> = ({ location }) => {
    return (
        <div className='p-4 border rounded shadow-md bg-white'>
            <img src={location.image} alt={location.locationName} className='w-32 h-32 mb-4 rounded' />
            <p className='text-lg font-semibold'>{location.locationName}</p>
            <p> population :  {location.population.toLocaleString()}</p>
        </div>
    )
}

export default NearestLocationCard
