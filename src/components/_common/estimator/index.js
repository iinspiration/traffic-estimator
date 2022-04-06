import React, { useState, useEffect } from 'react'
import styles from '@styles/Home.module.css'
import { get } from 'lodash'

import * as GoogleSheetService from '@modules/googlesheet/services'
import * as EstimatorService from '@modules/estimator/services'

export default function Estimator() {
  const [currentLocation, setCurrentLocation] = useState(false)
  const [results, setResults] = useState([])

  const refetchInterval = process.env.REFETCH_INTERVAL || 60000

  console.log('=== refetchInterval is :', refetchInterval)

  async function fetchingProcess({ originCoord, setResults }) {
    console.log('===== Start Fetching Location =====')

    const loadedDestinations = await GoogleSheetService.getLocationOnSheet()

    console.log('loadedDestinations', loadedDestinations)

    const estimatedResults = await Promise.all(
      loadedDestinations.map(destination => {
        console.log('destination.loc', destination.location)

        return EstimatorService.estimateDistrance({
          origin: originCoord,
          destination: destination.location,
        }).then(function(response) {
          const result = response
          return {
            ...destination,
            distance: get(result, 'rows[0].elements[0].distance.text', '-'),
            duration_in_traffic: get(
              result,
              'rows[0].elements[0].duration_in_traffic.text',
              '-',
            ),
          }
        })
      }),
    )

    setResults(estimatedResults)

    console.log('===== End Fetching Location =====')
  }

  useEffect(async () => {
    await navigator.geolocation.getCurrentPosition(async function(position) {
      console.log('Latitude is :', position.coords.latitude)
      console.log('Longitude is :', position.coords.longitude)

      if (!currentLocation && !results.length) {
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })

        const originCoord = `${position.coords.latitude},${position.coords.longitude}`

        await fetchingProcess({ originCoord, setResults })

        const interval = setInterval(async () => {
          await fetchingProcess({ originCoord, setResults })
        }, refetchInterval)

        return () => clearInterval(interval)
      }
    })
  }, [results])

  console.log('results', results)

  if (currentLocation && results.length) {
    return (
      <div>
        <div className={styles.result}>
          <p>
            Your Current location : (latitude: {currentLocation.latitude} long:{' '}
            {currentLocation.longitude})
          </p>
        </div>
        <div className={styles.result}>
          {results.map(dest => {
            return (
              <p key={`p-${dest.title}`}>
                {dest.distance || ''} to {dest.title} , takes{' '}
                {dest.duration_in_traffic || ''} from now
              </p>
            )
          })}
        </div>
      </div>
    )
  }
  return ''
}
