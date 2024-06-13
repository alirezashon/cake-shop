// components/MapComponent.jsx
import React from 'react'
import dynamic from 'next/dynamic'

const Map = dynamic(() => import('./jest'), {
  ssr: false, // This line is crucial to prevent SSR issues
})

const Home = () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Map />
    </div>
  )
}

export default Home
