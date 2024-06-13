/** @format */

import { useEffect, useState } from "react"
import Image from "next/image"
import styles from "./index.module.css" // Update with your CSS file path
import { Tools, Tags } from "../../Interfaces"
import { FaBirthdayCake, FaCheck, FaEdit } from "react-icons/fa"
import { GiCrossMark, GiReturnArrow } from "react-icons/gi"
import { FaAnglesDown } from "react-icons/fa6"
import { Knob } from "primereact/knob"
const List: React.FC = () => {
  const [data, setData] = useState<[Tools[], Tags[]] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [showTag, setShowTag] = useState<number[]>([])
  const [cakeState, setCakeState] = useState<[number, number, boolean][]>([
    [1, 2.22, false],
    [2, 0.25, false],
    [2, 0.25, true],
    [4, 0.22, false],
    [3, 0.25, false],
    [0, 2.22, false],
  ]) //[toolIndex,weight,[maxPercentage,minPercentage],isEdditing]
  const [showcakimage, setShowcakimage] = useState<boolean>(true)
  const [cakosition, setCakosition] = useState<{
    isCakopen: boolean
    x: number | null
    y: number | null
  }>({
    isCakopen: true,
    x: null,
    y: null,
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
        setIsLoading(false)
      }
    } catch (error) {
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
              x: (window.innerWidth * 66) / 100,
            }))
          : setCakosition((prevState) => ({
              ...prevState,
              x: (window.innerWidth * 4) / 100,
            }))
      }
    }
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
      {cakosition.isCakopen ? (
        <div
          className={styles.cake}
          style={{
            left: `${cakosition.x}px`,
            top: `${cakosition.y}px`,
            position: "absolute",
          }}
        >
          <p>
            {data && data[0] && data[0].length > 0
              ? cakeState.reduce(
                  (sum, item) =>
                    sum + item[1] * data[0][data[0].length - 1].price,
                  0
                )
              : 0}
          </p>
          <div className={styles.cakheader}>
            <GiCrossMark
              className={styles.closeIcon}
              onClick={() =>
                setCakosition((prv) => ({ ...prv, isCakopen: false }))
              }
            />
            <p>
              وزن کیک : {cakeState.reduce((acc, [, second]) => acc + second, 0)}
              &nbsp; کیلوگرم
            </p>
          </div>
          <div
            className={styles.cakimage}
            style={{
              transform: `${showcakimage ? "" : "translateY(22vh)"}`,
              zIndex: 0,
            }}
          >
            <FaAnglesDown
              className={styles.showimgicon}
              onClick={() => setShowcakimage(!showcakimage)}
              style={{ transform: `rotate(${showcakimage ? 0 : 180}deg)` }}
            />
            <FaBirthdayCake className={styles.icon} />
          </div>
          <div className={styles.cakedetails}>
            {cakeState.map((tool, index) => (
              <div key={index}>
                {tool[2] && (
                  <div className={styles.cakedetailoption}>
                    <Knob
                      value={tool[1]}
                      valueTemplate={"{value}%"}
                      className={styles.range}
                      min={
                        data?.[0]?.[tool[0]]?.minMax?.[0] !== undefined &&
                        !isNaN(data[0][tool[0]].minMax[0])
                          ? parseInt(`${data[0][tool[0]].minMax[0]}`)
                          : 0
                      }
                      max={
                        data?.[0]?.[tool[0]]?.minMax?.[1] !== undefined &&
                        !isNaN(data[0][tool[0]].minMax[1])
                          ? parseInt(`${data[0][tool[0]].minMax[1]}`)
                          : 20
                      }
                      onChange={(e) =>
                        setCakeState((prevState) =>
                          prevState.map((item, i) =>
                            i === index ? [item[0], e.value, item[2]] : item
                          )
                        )
                      }
                      valueColor='yellow'
                      rangeColor='white'
                    />
                    <div className={styles.inputiconos}>
                      <FaCheck
                        className={styles.checko}
                        onClick={() =>
                          setCakeState((prevState) =>
                            prevState.map((item, i) =>
                              i === index ? [item[0], item[1], false] : item
                            )
                          )
                        }
                      />
                      <GiReturnArrow
                        className={styles.returnarrow}
                        onClick={() =>
                          setCakeState((prevState) =>
                            prevState.map((item, i) =>
                              i === index ? [item[0], item[1], false] : item
                            )
                          )
                        }
                      />
                    </div>
                  </div>
                )}
                <div className={styles.cakedetail}>
                  <p>
                    <FaEdit
                      className={styles.editicon}
                      onClick={() =>
                        setCakeState((prevState) =>
                          prevState.map((item, i) =>
                            i === index ? [item[0], item[1], true] : item
                          )
                        )
                      }
                    />
                  </p>
                  <p>{data && data[0][tool[0]].name} </p>
                  <p>
                    {data && (data[0][tool[0]].price * tool[1]).toFixed(0)}
                    تومان
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          className={styles.cakolate}
          onClick={() => setCakosition((prv) => ({ ...prv, isCakopen: true }))}
        >
          <FaBirthdayCake />
        </div>
      )}
    </div>
  )
}

export default List
