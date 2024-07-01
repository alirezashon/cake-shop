// components/Modal.tsx
import React, { useEffect } from 'react'

type ModalProps = {
  show: boolean
  data: {
    title: string
    message: string
  }
  onClose: () => void
}

const Modal: React.FC<ModalProps> = ({ show, data, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose()
      }, 5000) // Hide after 5 seconds

      return () => clearTimeout(timer)
    }
  }, [show, onClose])

  if (!show) return null

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.content}>
        <span style={modalStyles.close} onClick={onClose}>
          &times;
        </span>
        <h2 style={modalStyles.title}>{data.title}</h2>
        <p style={modalStyles.message}>{data.message}</p>
        <button style={modalStyles.button} onClick={onClose}>
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
    zIndex:7
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
  close: {
    position: 'absolute' as 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer' as 'pointer',
    fontSize: '18px',
  },
  title: {
    color: '#4CAF50', // Green color for the title
    fontSize: '18px',
    marginBottom: '10px',
  },
  message: {
    color: '#333', // Darker color for the message
    fontSize: '16px',
    marginBottom: '20px',
  },
  button: {
    backgroundColor: '#FF4D4F', // Red color for the button
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 20px',
    cursor: 'pointer' as 'pointer',
    fontSize: '16px',
  },
}

export default Modal
