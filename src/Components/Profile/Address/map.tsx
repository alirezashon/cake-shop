import React, { useState } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import iconUrl from '/node_modules/leaflet/dist/images/marker-icon.png'
import shadowUrl from '/node_modules/leaflet/dist/images/marker-shadow.png'
  
const defaultIcon = new L.Icon({
  iconUrl: iconUrl.src, // Use .src to get the URL
  iconRetinaUrl: iconUrl.src, // Use .src to get the URL
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41],
  shadowUrl: shadowUrl.src, // Use .src to get the URL
  shadowSize: [41, 41],
})

interface Props{
  data:[number, number]
}
const Map: React.FC<Props> = ({data}) => {

  return (
    <div>
      <MapContainer
        style={{
          height: '40vh',
          width: '50vw',
        }}
        center={data}
        zoom={13}
        scrollWheelZoom={true}
        attributionControl={false} // Disable the default attribution control
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        <Marker icon={defaultIcon} position={data}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

export default Map













// import React, { useState } from 'react'
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   useMapEvents,
// } from 'react-leaflet'
// import L from 'leaflet'
// import 'leaflet/dist/leaflet.css'
// import iconUrl from '/node_modules/leaflet/dist/images/marker-icon.png'
// import shadowUrl from '/node_modules/leaflet/dist/images/marker-shadow.png'

// interface Props {
//   coord: [number, number]
//   setCoord: (numbers: [number, number]) => void
// }

// const defaultIcon = new L.Icon({
//   iconUrl: iconUrl.src, // Use .src to get the URL
//   iconRetinaUrl: iconUrl.src, // Use .src to get the URL
//   iconSize: [25, 41],
//   iconAnchor: [12.5, 41],
//   popupAnchor: [0, -41],
//   shadowUrl: shadowUrl.src, // Use .src to get the URL
//   shadowSize: [41, 41],
// })

// const LocationMarker: React.FC<{
//   setCoord: (coord: [number, number]) => void
// }> = ({ setCoord }) => {
//   useMapEvents({
//     click(e) {
//       setCoord([e.latlng.lat, e.latlng.lng])
//     },
//   })

//   return null
// }
// const MapComponent: React.FC<Props> = ({coord,setCoord}) => {

//   return (
//     <div>
//       {coord}
//       <MapContainer
//         style={{
//           height: '40vh',
//           width: '50vw',
//         }}
//         center={coord}
//         zoom={13}
//         scrollWheelZoom={true}
//         attributionControl={false} // Disable the default attribution control
//       >
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
//         />

//         <Marker icon={defaultIcon} position={coord}>
//           <Popup>
//             A pretty CSS3 popup. <br /> Easily customizable.
//           </Popup>
//         </Marker>
//         <LocationMarker setCoord={setCoord} />
//       </MapContainer>
//     </div>
//   )
// }

// export default MapComponent
