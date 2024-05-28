import React, { useState, useEffect } from "react"
import styles from "./index.module.css"
interface Props {
  text: string
  color: string
  direction: string
}
const Toast: React.FC<Props> = ({ text, color, direction }) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {isVisible && (
        <div className={`${styles.toast} ${styles[color]} ${styles[direction]}`}>
          <span>{text}</span>
        </div>
      )}
    </>
  )
}

export default Toast