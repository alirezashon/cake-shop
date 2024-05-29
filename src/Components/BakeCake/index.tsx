/** @format */

import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import Image from "next/image"
import styles from "./index.module.css" // Update with your CSS file path
import { Tools, Tags } from "../../DTO"

const List: React.FC = () => {
  const [data, setData] = useState<[Tools[], Tags[]] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [showTag, setShowTag] = useState<number[]>([])
  const [cakeState,setCakeState] = useState<[number,number][]>([])
  const [tagribute, setTagribute] = useState<[number, number] | [] | null>(null) //[index of tool ,weight]
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
        console.table(result)
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
  const showTools = (tag: string) => {
    const toolsid: number[] | null =
      data &&
      data[0]
        .map((tool, index) => (tool.tag === tag ? index : -1))
        .filter((index) => index !== -1)
    toolsid && setShowTag(toolsid)
  }
  return (
    <div className={styles.tags}>
      {data &&
        data[1].map((tag, index) => (
          <>
            {/* // نمایش تگ ها */}

            <div
              className={styles.tagBox}
              onClick={() => showTools(tag._id)}
              onMouseOver={() => showTools(tag._id)}
            >
              <Image
                src={`data:image/jpeg;base64,${tag.src}`}
                alt=''
                width={313}
                height={313}
                className={styles.image}
              />
              <div className='tag'>{tag.name}</div>
              {/* // نمایش لوازم هر تگ */}
              {showTag.length > 0 &&
                data[0][showTag[0]].tag === tag._id &&
                showTag?.map((indx) => (
                  <div className={styles.tools}>
                    <Image
                      src={`data:image/jpeg;base64,${data[0][indx].src}`}
                      alt={data[0][index].name}
                      width={313}
                      height={313}
                      className={styles.image}
                    />
                    <div className={styles.toolName}>{data[0][indx].name}</div>
                    <div className={styles.toolPrice}>
                      {data[0][indx].price}
                    </div>
                  </div>
                ))}
            </div>
          </>
        ))}
    </div>
  )
}

export default List
