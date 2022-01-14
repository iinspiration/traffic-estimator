import React, { useState, useEffect } from "react";
import styles from '../../../../public/static/css/Home.module.css'

import * as EstimatorService from '@modules/estimator/services'

export default function Estimator() {
    const [currentLocation,setCurrentLocation] = useState(false)
    const [result,setResult] = useState(false)

    useEffect( ()=>{
        navigator.geolocation.getCurrentPosition(function(position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);

        if(!currentLocation && !result){
            setCurrentLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            })

            EstimatorService.estimateDistrance({
                origin: `${position.coords.latitude},${position.coords.longitude}`,
                destination: `Bangkok`,
              })
            .then(function (response) {
                const result = response         
                // console.log('result.data',result);
                // console.log('result.origin_addresses',result.origin_addresses[0]);
                // console.log('result.destination_addresses',result.destination_addresses[0]);
                // console.log('result.distance',result.rows[0]);
                setResult({
                    origin:result.origin_addresses[0],
                    destination:result.destination_addresses[0],
                    distance:result.rows[0].elements[0].distance.text,
                    duration_in_traffic:result.rows[0].elements[0].duration_in_traffic.text,
                })
            })


        }


        });
    })

    return (currentLocation && result)
        && <div className={styles.result}>
                <p >
                    Your Current coordinate : ( latitude: {currentLocation.latitude} long: {currentLocation.longitude} )
                </p>
                <p >
                    Origin : {result.origin}
                </p>
                <p >
                    Destination : Victory Monument {result.destination}
                </p>
                <p >
                    Distance : {result.distance}
                </p>
                <p >
                    Estimation Time : {result.duration_in_traffic}
                </p>
                
                
            </div>
      
}