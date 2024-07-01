import React, { useState } from 'react'
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs'

interface Props {
  displayRating: number
}
const ShowRating: React.FC<Props> = ({ displayRating }) => {
  return (
    <div style={styles.container}>
      {Array.from({ length: 5 }, (_, index) => (
        <div key={index} style={styles.star}>
          <div style={{ ...styles.halfStar, left: 0 }} />
          <div style={{ ...styles.halfStar, right: 0 }} />
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
    direction: 'ltr',
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

export default ShowRating
