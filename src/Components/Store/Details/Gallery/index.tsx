import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from './ImageGallery.module.css'

interface Carousel {
  src: string
  alt: string
}

interface Props {
  structure: Carousel[]
}

const ImageGallery: React.FC<Props> = ({ structure }) => {
  const [selectedImage, setSelectedImage] = useState(structure[0])
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isFullscreen) {
        if (event.key === 'ArrowLeft') {
          prevImage()
        } else if (event.key === 'ArrowRight') {
          nextImage()
        } else if (event.key === 'Escape') {
          setIsFullscreen(false)
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isFullscreen, selectedImage])

  const handleImageClick = (image: Carousel) => {
    setSelectedImage(image)
    setIsFullscreen(true)
  }

  const nextImage = () => {
    const currentIndex = structure.indexOf(selectedImage)
    const nextIndex = (currentIndex + 1) % structure.length
    setSelectedImage(structure[nextIndex])
  }

  const prevImage = () => {
    const currentIndex = structure.indexOf(selectedImage)
    const prevIndex = (currentIndex - 1 + structure.length) % structure.length
    setSelectedImage(structure[prevIndex])
  }

  const closeFullscreen = () => {
    setIsFullscreen(false)
  }

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImageContainer}>
        <Image
          layout='fill'
          objectFit='cover'
          src={selectedImage?.src}
          alt={selectedImage?.alt}
          className={`${styles.mainImage} ${
            isFullscreen ? styles.fullscreen : ''
          }`}
          onClick={() => handleImageClick(selectedImage)}
        />
      </div>
      <div className={styles.thumbnailContainer}>
        {structure.map((image, index) => (
          <div
            key={index}
            className={styles.thumbnail}
            onClick={() => handleImageClick(image)}
          >
            <Image
              layout='fill'
              objectFit='cover'
              src={image.src}
              alt={image.alt}
            />
          </div>
        ))}
      </div>
      {isFullscreen && (
        <div className={styles.fullscreenOverlay} onClick={closeFullscreen}>
          <div className={styles.closeButton} onClick={closeFullscreen}>
            ✕
          </div>
          <div className={styles.fullscreenContent}>
            <Image
              layout='fill'
              objectFit='contain'
              src={selectedImage.src}
              alt='Fullscreen Image'
              className={styles.fullscreenImage}
            />
            <div
              className={styles.navigation}
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.prevButton} onClick={prevImage}>
                ‹
              </button>
              <button className={styles.nextButton} onClick={nextImage}>
                ›
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageGallery
