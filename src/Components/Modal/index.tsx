// components/Modal.tsx
import React, { useEffect, useState } from 'react'

type ModalProps = {
  show: boolean
  data: {
    title: string
    message: string
  }
  onClose: () => void
}

const Modal: React.FC<ModalProps> = ({ show, data, onClose }) => {
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    if (show) {
      setProgress(100)
      const totalDuration = 2000 // total duration of the timer in milliseconds
      const updateInterval = 100 // update the progress bar every 100 milliseconds
      const decrement = (100 / totalDuration) * updateInterval // decrement percentage per update

      const timer = setInterval(() => {
        setProgress((prev) => {
          const nextProgress = prev - decrement
          if (nextProgress <= 0) {
            clearInterval(timer)
            onClose()
            return 0
          }
          return nextProgress
        })
      }, updateInterval)

      return () => clearInterval(timer)
    }
  }, [show, onClose])

  if (!show) return null
  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.content}>
        <div style={{ ...modalStyles.progressBar, width: `${progress}%` }} />
        <span style={modalStyles.close} onClick={onClose}>
          &times;
        </span>
        <h2 style={modalStyles.title}>{data.title}</h2>
        <p style={modalStyles.message}>{data.message}</p>
        <button style={modalStyles.button} onClick={()=>open('/newReq/pay')}>
          برو به سبد خرید
        </button>
      </div>
    </div>
  )
}

const modalStyles = {
  overlay: {
    position: 'fixed' as 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 7,
  },
  content: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '320px',
    textAlign: 'center' as 'center',
    position: 'relative' as 'relative',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  progressBar: {
    position: 'absolute' as 'absolute',
    top: 0,
    left: 0,
    height: '2px',
    backgroundColor: '#4CAF50',
    transition: 'width 0.1s linear',
  },
  close: {
    position: 'absolute' as 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer' as 'pointer',
    fontSize: '18px',
  },
  title: {
    color: '#4CAF50',
    fontSize: '18px',
    marginBottom: '10px',
  },
  message: {
    color: '#333',
    fontSize: '16px',
    marginBottom: '20px',
  },
  button: {
    backgroundColor: '#FF4D4F',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 20px',
    cursor: 'pointer' as 'pointer',
    fontSize: '16px',
  },
}

export default Modal
