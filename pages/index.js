import React, { useState } from "react";
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [currentLocation,setCurrentLocation] = useState(false)
  useEffect(()=>{
    console.log("useEffect")
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);

      if(!currentLocation){
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      }

    });
  })

  return (
    <div className={styles.container}>
      <Head>
        <title>Traffic Estimator</title>
        <meta name="description" content="Traffic Estimatorapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

        <h1 className={styles.title}>
         Traffic <a href="">Estimator!</a>
        </h1>

        <p className={styles.description}>
         Get live traffic, For better decision
        </p>
        {
          currentLocation 
          && <p className={styles.code}>
              Current coordinate : ( latitude: {currentLocation.latitude} long: {currentLocation.longitude} )
            </p>
        }
        

      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
         Traffic Estimator System @2022
        </a>
      </footer>
    </div>
  )
}
