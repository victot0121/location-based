//Create a custom hook, useUserLocation, to encapsulate the geolocation logic.

import { useState , useEffect } from "react";

export interface GeoLocation{
    latitude: number;
    longitude: number;
}


const useGeolocation = ():  {location: GeoLocation | null; error: string | null } => {
   const [location, setLocation] = useState<GeoLocation | null>(null)
   const [error, setError] = useState<string | null>(null)


   useEffect(()=>{
     if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
           (position) => {
                setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    })
           },
           (err)=>{
            setError("Unable to retrieve location");
            console.log("Geolocation", err)
           },
           {enableHighAccuracy: true, timeout: 5000,  maximumAge: 0}
        )
     }else{
        setError("Geolocation is not supported by this browser");
     }
   }, [])

return {location, error}
}



export default useGeolocation;