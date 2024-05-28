/** @format */

import { useState, useEffect } from "react"
import Mobile from "./Mobile"
import DesktopNav from "./PC"
import { Post } from "../../DTO"

interface NavProps {
  basket: string[][]
  setBasketStore: (items: string[][]) => void
  basketData: Post[]
  totalPrice: [number, number]
}
const Navbar: React.FC<NavProps> = ({
  basket,
  setBasketStore,
  basketData,
  totalPrice,
}) => {
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
          basket={basket}
          basketData={basketData}
          setBasketStore={setBasketStore}
          totalPrice={totalPrice}
          isBasketOpen={isBasketOpen}
          setIsBasketOpen={setIsBasketOpen}
        />
      ) : (
        <div>
          <DesktopNav
            isBasketOpen={isBasketOpen}
            setIsBasketOpen={setIsBasketOpen}
            basket={basket}
            basketData={basketData}
            setBasketStore={setBasketStore}
            totalPrice={totalPrice}
          />
        </div>
      )}
    </nav>
  )
}

export default Navbar
