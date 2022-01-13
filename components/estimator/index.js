import React, { useState, useEffect } from "react";
import axios from 'axios'
import styles from '@styles/Home.module.css'

export default function Estimator({ api }) {
    console.log("Estimator api", api)
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

            axios({
                method: 'post',
                url: '/api/estimate',
                data: {
                    origin: `${position.coords.latitude},${position.coords.longitude}`,
                  }
            })
            .then(function (response) {
                const result = response
                // return response.data
                console.log('result.data',result.data);
                console.log('result.data.origin_addresses',result.data.origin_addresses[0]);
                console.log('result.data.destination_addresses',result.data.destination_addresses[0]);
                console.log('result.data.distance',result.data.rows[0]);
                setResult({
                    origin:result.data.origin_addresses[0],
                    destination:result.data.destination_addresses[0],
                    distance:result.data.rows[0].elements[0].distance.text,
                    duration_in_traffic:result.data.rows[0].elements[0].duration_in_traffic.text,
                })
            })

        }


        });
    })

    console.log('resultsss',result);
    console.log('results origin',result.origin);

    return (currentLocation && result)
        && <div>
                <p className={styles.code}>
                    Your Current coordinate : ( latitude: {currentLocation.latitude} long: {currentLocation.longitude} )
                </p>
                <p className={styles.code}>
                    Origin : {result.origin}
                </p>
                <p className={styles.code}>
                    Destination : Victory Monument {result.destination}
                </p>
                <p className={styles.code}>
                    Distance : {result.distance}
                </p>
                <p className={styles.code}>
                    Estimation Time : {result.duration_in_traffic}
                </p>
                
                
            </div>
      
}