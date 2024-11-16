'use client'

import React, { useState, useEffect } from 'react'
import useGeolocation, { GeoLocation } from '../hook/useUserLocation'
import NearestLocationCard, { LocationItem } from './NearestLocationCard'

// Array of locations
const locations: LocationItem[] = [
    {
        id: 1,
        location: { latitude: 6.5244, longitude: 3.3792 },
        image: 'https://via.placeholder.com/150',
        locationName: 'Lagos',
        population: 14000000, // Estimated population
    },
    {
        id: 2,
        location: { latitude: 9.0579, longitude: 7.4951 },
        image: 'https://via.placeholder.com/150',
        locationName: 'Abuja',
        population: 3000000, // Estimated population
    },
    {
        id: 3,
        location: { latitude: 10.3157, longitude: 9.8442 },
        image: 'https://via.placeholder.com/150',
        locationName: 'Jos',
        population: 900000, // Estimated population
    },
    {
        id: 4,
        location: { latitude: 7.1468, longitude: 3.3619 },
        image: 'https://via.placeholder.com/150',
        locationName: 'Abeokuta',
        population: 605000, // Estimated population
    },
    {
        id: 5,
        location: { latitude: 12.0022, longitude: 8.5919 },
        image: 'https://via.placeholder.com/150',
        locationName: 'Kano',
        population: 4100000, // Estimated population
    },
    {
        id: 6,
        location: { latitude: 4.8156, longitude: 7.0498 },
        image: 'https://via.placeholder.com/150',
        locationName: 'Port Harcourt',
        population: 1200000, // Estimated population
    },
    {
        id: 7,
        location: { latitude: 11.7461, longitude: 11.9668 },
        image: 'https://via.placeholder.com/150',
        locationName: 'Maiduguri',
        population: 1500000, // Estimated population
    },
    {
        id: 8,
        location: { latitude: 6.3341, longitude: 5.6037 },
        image: 'https://via.placeholder.com/150',
        locationName: 'Benin City',
        population: 1200000, // Estimated population
    },
    {
        id: 9,
        location: { latitude: 8.4905, longitude: 8.5167 },
        image: 'https://via.placeholder.com/150',
        locationName: 'Bauchi',
        population: 493000, // Estimated population
    },
    {
        id: 10,
        location: { latitude: 7.3775, longitude: 3.947 },
        image: 'https://via.placeholder.com/150',
        locationName: 'Ibadan',
        population: 3500000, // Estimated population
    },
];



const NearestLocation: React.FC = () => {
    const { location: userLocation, error } = useGeolocation();
    const [nearestLocation, setNearestLocation] = useState<LocationItem | null>(null);

    useEffect(() => {
        if (userLocation) {
            const nearest = findNearestLocation(userLocation, locations);
            setNearestLocation(nearest);
        }
    }, [userLocation])

    const calculationDistance = (loc1: GeoLocation, loc2: GeoLocation): number => {
        const toRadians = (degress: number): number => degress * (Math.PI / 180);

        const Radius = 6371; // Earth' radius in km

        const dLat = toRadians(loc2.latitude - loc1.latitude);
        const dLong = toRadians(loc2.longitude - loc1.longitude);


        const latitute1 = toRadians(loc1.latitude)
        const latitute2 = toRadians(loc2.latitude)

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLong / 2) * Math.sin(dLong / 2) * Math.cos(latitute1) * Math.cos(latitute2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return Radius * c;

    }

    const findNearestLocation = (userLocation: GeoLocation, locations: LocationItem[]): LocationItem | null => {
        let nearest: LocationItem | null = null;
        let minDistance = Infinity;
        locations.forEach((location) => {
            const distance = calculationDistance(userLocation, location.location);
            if (distance < minDistance) {
                minDistance = distance;
                nearest = location;
            }
        })

        return nearest;

    }

    return (
        <div className='p-4'>
            <h1 className='text-2xl font-bold mb-4'> Nearest Location</h1>
            {error && <p className='text-red-500'>{error}</p>}
            {nearestLocation ? (
                <NearestLocationCard location={nearestLocation} />
            ) : (
                !error && <p>Loading nearest location ...</p>
            )

            }
        </div>
    )
}

export default NearestLocation
