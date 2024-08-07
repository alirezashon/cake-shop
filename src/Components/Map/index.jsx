/** @format */

import React, { useRef, useEffect, useState } from "react"
import mapboxgl from "!mapbox-gl"
import styles from "./index.module.css"

const Map = ({ onDataChange }) => {
  const [formData, setFormData] = useState({
    address: "",
    houseNumber: null,
    houseUnit: null,
    zipCode: null,
  })
  const labels = ["آدرس", "پلاک", "واحد", "کدپستی"]
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [lng, setLng] = useState(51.4067)
  const [lat, setLat] = useState(35.7514)
  const marker = useRef(null) // Add a ref to hold the marker

  const getAddress = async (lat, lng) => {
    const response = await fetch(
      `https://api.neshan.org/v2/reverse?lat=${lat}&lng=${lng}`,
      {
        method: "GET",
        headers: {
          "Api-Key": "service.406fb49d15be4a65bf05a950e7ef5baa",
        },
      }
    )
    const result = await response.json()
    console.log(result.formatted_address)

    // Update the formData with the retrieved address
    const updatedFormData = {
      ...formData,
      address: result.formatted_address || `Latitude: ${lat}, Longitude: ${lng}`,
    }
    setFormData(updatedFormData)
    onDataChange(updatedFormData)
  }

  useEffect(() => {
    if (map.current) return // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: 12,
      attributionControl: false,
      accessToken:
        "pk.eyJ1IjoiYWxpcmV6YWZoaSIsImEiOiJjbHBpYnM2NGMwYmU4Mmtydm92NXR0NmxsIn0.-pBP1vx01qdBL4yInmecBA",
    })

    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4))
      setLat(map.current.getCenter().lat.toFixed(4))
    })

    map.current.on("click", (e) => {
      const lat = e.lngLat.lat.toFixed(4)
      const lng = e.lngLat.lng.toFixed(4)

      // Call the getAddress function
      getAddress(lat, lng)

      // Set the marker on the map
      if (marker.current) {
        marker.current.setLngLat([lng, lat])
      } else {
        marker.current = new mapboxgl.Marker()
          .setLngLat([lng, lat])
          .addTo(map.current)
      }
    })
  }, [formData, lng, lat, onDataChange])

  const handleChange = (e, field) => {
    const updatedFormData = {
      ...formData,
      [field]: e.target.value,
    }
    setFormData(updatedFormData)
    onDataChange(updatedFormData)
  }

  return (
      <div ref={mapContainer} className={styles.map} >
     </div>
    
  )
}

export default Map
