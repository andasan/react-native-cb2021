import React, { useState, useEffect } from 'react'
import { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps'
import { StyleSheet, Dimensions, Image, Text } from 'react-native'
import MapView from 'react-native-map-clustering'
import * as Location from 'expo-location'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import {BACKEND_URL} from "@env"

import { MapStyle } from '../utils/MapStyle'
import CherryIcon from '../utils/CherryIcon'
import Preloader from './Preloader'
import SakuraData from '../../assets/sakura.json'

const height = Dimensions.get('window').height

const queryClient = new QueryClient()



const renderRandomMarkers = (n, initialRegion) => {
  const { latitude, longitude, latitudeDelta, longitudeDelta } = initialRegion
  return new Array(n).fill().map((x, i) => (
    <Marker
      key={i}
      coordinate={{
        latitude: latitude + (Math.random() - 0.5) * latitudeDelta,
        longitude: longitude + (Math.random() - 0.5) * longitudeDelta,
      }}
    />
  ))
}

const MapComponent = () => {
  const [location, setLocation] = useState(null)
  const { isLoading, error, data } = useQuery('repoData', () => [...SakuraData].filter((sakura) => sakura.cultivar === 'Somei-yoshino')
  // fetch(`${BACKEND_URL}/sakura`).then((res) => res.json())
  
  )

  const initialRegion = {
    latitude: location?.coords.latitude || 49.210724,
    longitude: location?.coords.longitude || -123.130188,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  }

  useEffect(() => {
    ;(async () => {
      let { status } = await Location.requestPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied')
        return
      }

      let geoLocation = await Location.getCurrentPositionAsync({})
      setLocation(geoLocation)
    })()
  }, [])

  if (isLoading) return <Preloader />

  if (error) return <Text>An error has occurred: {error.message}</Text>

  return (
    <>
      <MapView
        style={styles.map}
        zoom={9}
        loadingEnabled={true}
        clustering={true}
        clusterColor={"#c284a0"}
        showsUserLocation={true}
        initialRegion={initialRegion}
        zoomEnabled={true}
        zoomControlEnabled={true}
        customMapStyle={MapStyle}
        provider={PROVIDER_GOOGLE}
      >
        {data &&
          data.map((dt, index) => {
            if (dt.coords ) {
              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: dt.coords.latitude,
                    longitude: dt.coords.longitude,
                  }}
                >
                  <CherryIcon />
                </Marker>
              )
            }
          })}
      </MapView>
    </>
  )
}

export default function Map() {
  return (
    <QueryClientProvider client={queryClient}>
      <MapComponent />
    </QueryClientProvider>
  )
}

const styles = StyleSheet.create({
  map: {
    height,
  },
})
