import React, { useEffect, useRef, useState } from 'react'
import styles from '../../List.module.css' // Update with your CSS file path
import { ClientInterface } from '@/Interfaces'

interface Props {
  isLoading: boolean
  data: ClientInterface[]
}

const List: React.FC<Props> = ({ isLoading, data }) => {
  return (
    <div className={styles.tableContainer}>
      <div className={styles.header}>لیست محصولات</div>
      {isLoading ? (
        Array.apply(0, Array(7)).map((x, i) => (
          <div key={i} className={styles.loading}>
            <div className={styles.loadingRect}></div>
            <div className={styles.loadingSquare}></div>
          </div>
        ))
      ) : (
        <table>
          <thead>
            <tr>
              {[
                'title',
                'src',
                'price',
                'colories',
                'category',
                'description',
                'Keywords',
              ].map((header) => (
                <th key={header}>{header}</th>
              ))}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data?.map((product, index) => (
                <tr key={product._id}>
                  <td>
                   
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default List
