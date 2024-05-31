/** @format */

import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import Image from "next/image"
import styles from "./index.module.css" // Update with your CSS file path
import { Tools, Tags } from "../../DTO"
import { FaBirthdayCake } from "react-icons/fa"

const List: React.FC = () => {
  const [data, setData] = useState<[Tools[], Tags[]] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [showTag, setShowTag] = useState<number[]>([])
  const [cakeState, setCakeState] = useState<[number, number][]>([
    [2, 0.25],
    [1, 12.22],
    [0, 0.6],
  ])
  const [cakosition, setCakosition] = useState<{
    isDrago: boolean
    x: number
    y: number
    offsetX: number
    offsetY: number
  }>({
    isDrago: false,
    x: 110,
    y: 110,
    offsetX: 0,
    offsetY: 0,
  })

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
    //check Cake Place
    if (data && showTag.length > 0) {
      const tagIndex = data[1].findIndex(
        (tag) => tag._id === data[0][showTag[0]].tag
      )
      if (tagIndex !== -1) {
        ;[0, 1].includes(tagIndex)
          ? setCakosition((prevState) => ({
              ...prevState,
              x: (window.innerWidth * 44) / 100,
            }))
          : setCakosition((prevState) => ({
              ...prevState,
              x: (window.innerWidth * 44) / 100,
            }))
      }
    }
  }

  // drap and drog

  const handleMouseDown = (e: React.MouseEvent) => {
    const cakeElement = e.currentTarget.parentElement
    if (!cakeElement) return

    const { left, top } = cakeElement.getBoundingClientRect()
    const offsetX = e.clientX - left
    const offsetY = e.clientY - top

    setCakosition({
      isDrago: true,
      x: left,
      y: top,
      offsetX,
      offsetY,
    })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cakosition.isDrago) return
    else {
      setCakosition((prevState) => ({
        ...prevState,
        x: e.clientX - prevState.offsetX,
        y: e.clientY - prevState.offsetY,
      }))
    }
  }

  const handleMouseUp = () => {
    setCakosition((prevState) => ({
      ...prevState,
      isDragging: false,
    }))
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
      <div
        className={styles.cake}
        style={{
          left: `${cakosition.x}px`,
          top: `${cakosition.y}px`,
          position: "absolute",
        }}
        >
        <div
          className={styles.cakheader}
          onMouseMove={(e) => handleMouseMove(e)} // Add the onMouseMove to the parent div
          onMouseDown={(e) => handleMouseDown(e)}
          // onMouseUp={handleMouseUp} // Add the onMouseUp to the parent div
        ></div>
        <div className={styles.cakimage}>
          <FaBirthdayCake className={styles.icon} />
        </div>
        <div className={styles.cakedetails}>
          <h1>{cakeState.reduce((acc, [, second]) => acc + second, 0)}</h1>
          {cakeState.map((tool) => (
            <div key={tool[0]}>
              <div>{data && data[0][tool[0]].price * tool[1]}</div>
              <div>{data && data[0][tool[0]].name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default List
