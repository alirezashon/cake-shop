/** @format */

import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { MdEditDocument } from "react-icons/md"
import styles from "../../List.module.css" // Update with your CSS file path
import { Category, Product } from "@/DTO"

interface Props {
  data: Product[] | null
  category: Category[] | null
  isLoading: boolean
  setEditItemId: (id: string) => void
}
const List: React.FC<Props> = ({
  data,
  category,
  isLoading,
  setEditItemId,
}) => {
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
              {["title", "src",'price','colories', "category", "description", "Keywords"].map(
                (header) => (
                  <th key={header}>{header}</th>
                )
              )}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data?.map((product, index) => (
                <tr key={product._id}>
                  <td>{product.title}</td>

                  <td>
                    <Image
                      src={`data:image/jpeg;base64,${product.src}`}
                      alt={``}
                      width={77}
                      height={77}
                    />
                  </td>
                  <td>
                    {category &&
                      category.find((cat) => cat._id === product.categories)
                        ?.name}
                  </td>
                  <td>{product?.price}</td>
                  <td>{product?.calories}</td>
                  <td>{product?.description}</td>

                  <td>{product.keywords}</td>
                  <td>
                    <MdEditDocument
                      className={styles.actionButton}
                      onClick={() => setEditItemId(product._id)}
                    />
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
