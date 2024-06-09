/** @format */

import { useState, useEffect } from "react"
import Mobile from "./Mobile"
import DesktopNav from "./PC"
import { Product } from "@/DTO"

interface NavProps {
  basketData: Product[]
}
const Navbar: React.FC<NavProps> = ({ basketData }) => {
  const [isMobile, setIsMobile] = useState(false)
  const [isBasketOpen, setIsBasketOpen] = useState<boolean>(false)

  useEffect(() => {
    if (window.innerWidth < 777) {
      setIsMobile(true)
    }
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 777)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <nav style={{ marginBottom: `${isMobile ? "7vh" : "8vh"}`, zIndex: 44 }}>
      {isMobile ? (
        <Mobile
          basketData={basketData}
          isBasketOpen={isBasketOpen}
          setIsBasketOpen={setIsBasketOpen}
        />
      ) : (
        <div>
          <DesktopNav
            basketData={basketData}
            isBasketOpen={isBasketOpen}
            setIsBasketOpen={setIsBasketOpen}
          />
        </div>
      )}
    </nav>
  )
}

export default Navbar
