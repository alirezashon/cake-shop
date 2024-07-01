import React, { useState } from 'react'
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs'

const StarRating: React.FC = () => {
  const [rating, setRating] = useState<number>(0)
  const [hoverRating, setHoverRating] = useState<number | null>(null)

  const handleClick = (index: number, isHalf: boolean) => {
    const newRating = isHalf ? index + 0.5 : index + 1
    setRating(newRating)
  }

  const handleMouseEnter = (index: number, isHalf: boolean) => {
    const newHoverRating = isHalf ? index + 0.5 : index + 1
    setHoverRating(newHoverRating)
  }

  const handleMouseLeave = () => {
    setHoverRating(null)
  }

  const displayRating = hoverRating ?? rating

  return (
    <div style={styles.container}>
      {Array.from({ length: 5 }, (_, index) => (
        <div key={index} style={styles.star}>
          <div
            style={{ ...styles.halfStar, left: 0 }}
            onClick={() => handleClick(index, true)}
            onMouseEnter={() => handleMouseEnter(index, true)}
            onMouseLeave={handleMouseLeave}
          />
          <div
            style={{ ...styles.halfStar, right: 0 }}
            onClick={() => handleClick(index, false)}
            onMouseEnter={() => handleMouseEnter(index, false)}
            onMouseLeave={handleMouseLeave}
          />
          {displayRating > index && displayRating < index + 1 ? (
            <BsStarHalf size={'3vh'} color='gold' />
          ) : displayRating >= index + 1 ? (
            <BsStarFill size={'3vh'} color='gold' />
          ) : (
            <BsStar size={'3vh'} color='gold' />
          )}
        </div>
      ))}
    </div>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    alignItems: 'center',
    direction:'ltr',
  },
  star: {
    position: 'relative',
    width: '24px',
    height: '24px',
    cursor: 'pointer',
  },
  halfStar: {
    position: 'absolute',
    width: '50%',
    height: '100%',
  },
}

export default StarRating
