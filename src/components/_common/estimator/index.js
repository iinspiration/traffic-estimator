import React, { useState, useEffect } from "react";
import styles from '../../../../public/static/css/Home.module.css'

import * as EstimatorService from '@modules/estimator/services'

export default function Estimator() {
    const [currentLocation,setCurrentLocation] = useState(false)
    const [results,setResults] = useState([])

    let destinations = [
        {
            title : "Victory Monument (Bangkok)",
            loc : "Victory Monument,BKK",
        },
        {
            title : "Siam Paragon (Bangkok)",
            loc : "Siam Paragon,BKK"
        },
        {
            title : "Asoke Intersection (Bangkok)",
            loc : "Asoke Intersection,BKK"
        },
        {
            title : "Suvarnabhumi Airport (Bangkok)",
            loc : "Suvarnabhumi Airport,BKK"
        }
    ]

    useEffect( ()=>{

        navigator.geolocation.getCurrentPosition(async function(position) {

            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);

            if(!currentLocation && !results.length){
                setCurrentLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                })

                const originCoord = `${position.coords.latitude},${position.coords.longitude}`


                const results = await Promise.all(destinations.map( destination => {
                    console.log('destination.loc',destination.loc)
                    return  EstimatorService.estimateDistrance({
                        origin: originCoord,
                        destination: destination.loc,
                    })
                    .then(function (response) {
                        const result = response         
                        return {
                            ...destination,
                            distance: result.rows[0].elements[0].distance.text,
                            duration_in_traffic: result.rows[0].elements[0].duration_in_traffic.text,
                        }
                    })
                    
                }))
                setResults(results)
            }
        });
    })

    console.log('results',results);

    if(currentLocation && results.length){
        return <div>
            <div className={styles.result}>
                <p >
                    Your Current location : (latitude: {currentLocation.latitude} long: {currentLocation.longitude})
                </p>
            </div>
            <div className={styles.result}>
                {results.map(dest => {
                    return <p key={`p-${dest.title}`}>
                        {dest.distance} to {dest.title} , takes {dest.duration_in_traffic} from now
                    </p>
                })}
                
            </div>
        </div>
        
    }
    return ''
      
}