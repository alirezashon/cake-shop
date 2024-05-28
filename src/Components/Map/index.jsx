/** @format */

import React, { useRef, useEffect, useState } from 'react'
import mapboxgl from '!mapbox-gl'
import styles from './index.module.css'

const Map = ({ onDataChange }) => {
	const [formData, setFormData] = useState({
		address: '',
		houseNumber: null,
		houseUnit: null,
		zipCode: null,
	})
	const labels = ['آدرس', 'پلاک', 'واحد', 'کدپستی']
	const mapContainer = useRef(null)
	const map = useRef(null)
	const [lng, setLng] = useState(51.4067)
	const [lat, setLat] = useState(35.7514)
	const [zoom, setZoom] = useState(12)

	useEffect(() => {
		if (map.current) return // initialize map only once
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/streets-v12',
			center: [lng, lat],
			zoom: zoom,
			attributionControl: false,
			accessToken:
				'pk.eyJ1IjoiYWxpcmV6YWZoaSIsImEiOiJjbHBpYnM2NGMwYmU4Mmtydm92NXR0NmxsIn0.-pBP1vx01qdBL4yInmecBA',
		})

		map.current.on('move', () => {
			setLng(map.current.getCenter().lng.toFixed(4))
			setLat(map.current.getCenter().lat.toFixed(4))
			setZoom(map.current.getZoom().toFixed(2))
		})

		// Add event listener for map click
		map.current.on('click', (e) => {
			setFormData({
				...formData,
				address: `Latitude: ${e.lngLat.lat.toFixed(
					4
				)}, Longitude: ${e.lngLat.lng.toFixed(4)}`,
			})
			onDataChange({
				...formData,
				address: `Latitude: ${e.lngLat.lat.toFixed(
					4
				)}, Longitude: ${e.lngLat.lng.toFixed(4)}`,
			})
		})
	}, [])

	const handleChange = (e, field) => {
		setFormData({
			...formData,
			[field]: e.target.value,
		})
		onDataChange({
			...formData,
			[field]: e.target.value,
		})
	}

	return (
		<div className={styles.container}>
			<div
				ref={mapContainer}
				className={styles.map}
			/>
			<div className={styles.formBox}>
				{Object.keys(formData).map((field, index) => (
					<>
						{field !== 'address' && (
							<div
								key={index}
								className={styles.formBoxRow}>
								<input
									placeholder={labels[index]}
									dir='rtl'
									type={field !== 'zipCode' ? 'number' : 'text'}
									value={formData[field]}
									onChange={(e) => handleChange(e, field)}
								/>
							</div>
						)}
					</>
				))}
			</div>
			<div className={styles.addressBox}>
				<textarea
					id='address'
					className={styles.textarea}
					value={formData.address}
					onChange={(e) => handleChange(e, 'address')}
					placeholder=''></textarea>
				<label for='address'>آدرس</label>
			</div>
		</div>
	)
}

export default Map
