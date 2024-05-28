/** @format */
import React, { CSSProperties, useState, useEffect } from "react"
import {
  FcCustomerSupport,
  FcDoughnutChart,
  FcSettings,
  FcShipped,
  FcSalesPerformance,
} from "react-icons/fc"
import externalStyles from "./index.module.css"
interface Style {
  drawer: CSSProperties
  item: CSSProperties
  icon: CSSProperties
  iconName: CSSProperties
}
interface Props {
  setDrawerOpen: (status: boolean) => void
  setContentId: (id: number) => void
}
const Drawer: React.FC<Props> = ({ setDrawerOpen, setContentId }) => {
  const [drawerWidth, setDrawerWidth] = useState<number>(5)
  const [isMouseOverDrawer, setIsMouseOverDrawer] = useState<boolean>(false)

  const icons = [
    {
      tag: <FcCustomerSupport />,
      name: "پشتیبانی",
    },
    {
      tag: <FcSettings />,
      name: "ساز و کار",
    },
    {
      tag: <FcDoughnutChart />,
      name: "جریان فروش",
    },
    {
      tag: <FcShipped />,
      name: "مرسولات",
    },
    {
      tag: <FcSalesPerformance />,
      name: "بازدهی",
    },
  ]
  const handleMouseEnter = () => {
    setIsMouseOverDrawer(true)
    setDrawerOpen(true)
  }

  const handleMouseLeave = () => {
    setIsMouseOverDrawer(false)
    setDrawerOpen(false)
  }

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isMouseOverDrawer) {
      interval = setInterval(() => {
        setDrawerWidth((prev) => Math.min(prev + 1, 20))
      }, 10)
    } else {
      // Decrease width gradually to 5% over 1 second
      interval = setInterval(() => {
        setDrawerWidth((prev) => Math.max(prev - 1, 3))
      }, 10)
    }

    return () => {
      clearInterval(interval)
    }
  }, [isMouseOverDrawer])

  const styles: Style = {
    drawer: {
      transition: "width 1s",
      width: `${drawerWidth}%`,
      display: "flex",
      height: "120vh",
      zIndex: "3",
    },
    item: {},
    icon: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      padding: "0vh",
      borderBottom: "dashed .4vh rgba(22,22,22,.80)",
      backgroundColor: "white",
    },
    iconName: {
      display: `${drawerWidth > 13 ? "block" : "none"}`,
      fontSize: "2vh",
    },
  }

  return (
    <div
      style={styles.drawer}
      className={externalStyles.drawer}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={styles.item} className={externalStyles.item}>
        {icons.map((icon, index) => (
          <div
            onClick={() => setContentId(index)}
            className={externalStyles.icon}
            style={styles.icon}
            key={index}
          >
            <div className={externalStyles.icon}>{icon.tag}</div>
            <div style={styles.iconName}>{icon.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Drawer
