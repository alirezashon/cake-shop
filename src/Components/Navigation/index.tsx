/** @format */

import { useState, useEffect } from 'react'
import Mobile from './Mobile'
import DesktopNav from './PC'
import styles from './index.module.css'


const Navbar: React.FC= () => {
  const [isMobile, setIsMobile] = useState(true)
  const [isBasketOpen, setIsBasketOpen] = useState<boolean>(false)

  useEffect(() => {
    if (window.innerWidth < 954) {
      setIsMobile(true)
    }
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 954)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <nav className={styles.nav} style={{ marginBottom: `${isMobile ? '5  vh' : '6vh'}`, zIndex: 44 }}>
      {isMobile ? (
        <div className={styles.moblie}>
          <Mobile
            isBasketOpen={isBasketOpen}
            setIsBasketOpen={setIsBasketOpen}
          />
        </div>
      ) : (
        <div className={styles.pc}>
          <DesktopNav
            isBasketOpen={isBasketOpen}
            setIsBasketOpen={setIsBasketOpen}
          />
        </div>
      )}
    </nav>
  )
}
export default Navbar
