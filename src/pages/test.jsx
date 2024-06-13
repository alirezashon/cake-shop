// components/MapComponent.jsx
import React from 'react'
import dynamic from 'next/dynamic'
import Profile from '@/Components/Profile'
const Map = dynamic(() => import('./jest'), {
  ssr: false, // This line is crucial to prevent SSR issues
})

const Home = () => {
  return (
    <div
      style={{
        height: '100vh',
        marginTop: '11vh',
      }}
    >
      <Profile />
    </div>
  )
}

export default Home
