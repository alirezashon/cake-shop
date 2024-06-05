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
              {["title", "src", "link", "description", "Keywords"].map(
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
                  <td>
                    {product.title &&
                      Object.values(product?.title).map((title, index) => (
                        <div key={index} className={styles.colorBox}>
                          {`${title}`}
                        </div>
                      ))}
                  </td>

                  <td>
                    <Image
                      src={`data:image/jpeg;base64,${product.src}`}
                      alt={``}
                      width={77}
                      height={77}
                    />
                  </td>
                  <td>
                  {category && category.find(cat => cat._id === product.link)?.name.fa}

                  </td>
                  <td>
                    {product?.description &&
                      Object.values(product.description).map(
                        (description, index) => (
                          <div key={index} className={styles.colorBox}>
                            {`${description}`}
                          </div>
                        )
                      )}
                  </td>

                  <td>
                    {product.keywords &&
                      Object?.values(product?.keywords).map(
                        (keyword, index) => (
                          <div key={index} className={styles.colorBox}>
                            {`${keyword}`}
                          </div>
                        )
                      )}
                  </td>
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
