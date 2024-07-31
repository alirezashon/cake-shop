import React, { RefObject } from 'react'
import { Category } from '@/Interfaces'
import Image from 'next/image'
import styles from '../index.module.css'
import { IoIosArrowForward } from 'react-icons/io'

interface CategoryListProps {
  categories: Category[]
  categoryBoxRef: RefObject<HTMLDivElement>
  scrollLeft: () => void
  scrollRight: () => void
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  categoryBoxRef,
  scrollLeft,
  scrollRight,
}) => {
  return (
    <div className={styles.categoryBox} ref={categoryBoxRef}>
      <IoIosArrowForward
        className={styles.leftDirection}
        onClick={scrollLeft}
      />
      {categories.map((cat, catIndex) => (
        <div key={catIndex} className={styles.category}>
          <Image
            src={`data:image/jpeg;base64,${Buffer.from(cat.src).toString(
              'base64'
            )}`}
            alt={cat.name}
            width={200}
            height={200}
            className={styles.categoryImage}
          />
          <div className={styles.categoryName}>{cat.name}</div>
        </div>
      ))}
      <IoIosArrowForward
        className={styles.rightDirection}
        onClick={scrollRight}
      />
    </div>
  )
}

export default CategoryList