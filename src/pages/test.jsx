// components/MapComponent.jsx
import React from 'react'
import dynamic from 'next/dynamic'
import Chat from '@/Components/Chat'
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
      <Chat />
    </div>
  )
}

export default Home
