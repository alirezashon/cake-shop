/** @format */

import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import Image from "next/image"
import styles from "./index.module.css" // Update with your CSS file path
import { Tools, Tags } from "../../DTO"

const List: React.FC = () => {
  const [data, setData] = useState<[Tools[], Tags[]] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [showTag, setShowTag] = useState<string>("")
  const fetchData = async () => {
    try {
      const response = await fetch("/api/data/Post/Client/bakeTool", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          authType: "^c(a)ta*sEa0c(Tzol&i^*o%l#sA!",
        }),
      })

      if (response.ok) {
        const result = await response.json()
        setData([result.tools, result.tags])
        setIsLoading(false)
      } else {
        toast.error("خطا")
        setIsLoading(false)
      }
    } catch (error) {
      toast.error("خطا")
      setIsLoading(false)
    }
  }
  useEffect(() => {
    !data && fetchData()
  }, [])

  return (
    <div className={styles.tableContainer}>
      <i className={styles.cako} ></i>
      <div className={styles.header}>ابزار ساخت کیک</div>
      {isLoading ? (
        Array.apply(0, Array(7)).map((x, i) => (
          <div key={i} className={styles.loading}>
            <div className={styles.loadingRect}></div>
            <div className={styles.loadingSquare}></div>
          </div>
        ))
      ) : (
        // نمایش تگ ها
        <div className={styles.container}>
          <div className={styles.tags}>
            {data &&
              data[1]?.map((tool) => (
                <div
                  className={styles.tagBox}
                  onClick={() => setShowTag(tool._id)}
                  onMouseOver={()=>showTag.length<0&& setShowTag(tool._id)}
                >
                  <Image
                    src={`data:image/jpeg;base64,${tool.src}`}
                    alt=''
                    width={313}
                    height={313}
                    className={styles.image}
                  />
                  <div className='tag'>{tool.name}</div>
                </div>
              ))}
          </div>
        </div>
      )}
      <div className={styles.toolBox}>
        {showTag &&
          data &&
          data[0].map(
            (tool) =>
              showTag === tool.tag && (
                // نمایش لوازم هر تگ
                <div className={styles.tools}>
                  <Image
                    src={`data:image/jpeg;base64,${tool.src}`}
                    alt={tool.name}
                    width={313}
                    height={313}
                    className={styles.image}
                  />
                  <div className={styles.toolName}>{tool.name}</div>
                  <div className={styles.toolPrice}>{tool.price}</div>
                </div>
              )
          )}
      </div>
    </div>
  )
}

export default List
