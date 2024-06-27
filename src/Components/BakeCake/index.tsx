/** @format */

import { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './index.module.css'
import { Tools, Tags } from '../../Interfaces'
import { FaBirthdayCake, FaCheck, FaEdit } from 'react-icons/fa'
import { GiCrossMark, GiReturnArrow } from 'react-icons/gi'
import { FaAnglesDown } from 'react-icons/fa6'
import { Knob } from 'primereact/knob'
const BackeCake: React.FC = () => {
  const [data, setData] = useState<[Tools[], Tags[]] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [showTag, setShowTag] = useState<number[]>([])
  const [cakeState, setCakeState] = useState<[number, number, boolean][]>([]) //[toolIndex,weight,isEdditing]
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
      const response = await fetch('/api/data/Post/Client/bakeTool', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authType: '^c(a)ta*sEa0c(Tzol&i^*o%l#sA!',
        }),
      })

      if (response.ok) {
        const result = await response.json()
        setData([result.tools, result.tags])
        setIsLoading(false)
      } else {
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const lastCakeState: [number, number, boolean][] = JSON.parse(
      localStorage.getItem('*c&w^e^w%s%i$n#') || '[]'
    )
    setCakeState(lastCakeState)

    !data && fetchData()
  }, [])
  useEffect(() => {
    localStorage.setItem('*c&w^e^w%s%i$n#', JSON.stringify(cakeState))
  }, [cakeState])
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
    <div className={styles.container}>
      <div className={styles.tags}>
        {data &&
          data[1].map((tag, index) => (
            <>
              {/* // نمایش تگ ها */}
              <div
                className={styles.tagBox}
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
                  showTag?.map((toolIndex) => (
                    <div
                      className={styles.tools}
                      onClick={() =>
                        setCakeState((prevState) => {
                          if (
                            !prevState.some((item) => item[0] === toolIndex)
                          ) {
                            return [...prevState, [toolIndex, 0, false]]
                          }
                          return prevState
                        })
                      }
                    >
                      <Image
                        src={`data:image/jpeg;base64,${data[0][toolIndex].src}`}
                        alt={data[0][index].name}
                        width={313}
                        height={313}
                        className={styles.image}
                      />
                      <div className={styles.toolName}>
                        {data[0][toolIndex].name}
                      </div>
                      <div className={styles.toolPrice}>
                        {data[0][toolIndex].price}
                      </div>
                    </div>
                  ))}
              </div>
            </>
          ))}
      </div>
      {cakosition.isCakopen ? (
        <div
          className={styles.cake}
          style={{
            left: `${cakosition.x}px`,
            top: `${cakosition.y}px`,
            position: 'absolute',
          }}
        >
          <div className={styles.cakeStatePrice}>
            <GiCrossMark
              className={styles.closeIcon}
              onClick={() =>
                setCakosition((prv) => ({ ...prv, isCakopen: false }))
              }
            />
            <div className={styles.headerText}>قیمت نهایی</div>
            <div className={styles.headerText}>
              {data && data[0].length > 0
                ? cakeState.reduce(
                    (sum, item) =>
                      sum + item[1] * data[0][data[0].length - 1].price,
                    0
                  )
                : 0}
              تومان
            </div>
          </div>
          <div className={styles.cakheader}>
            <p>
              وزن کیک : {cakeState.reduce((acc, [, second]) => acc + second, 0)}
              &nbsp; کیلوگرم
            </p>
          </div>
          <div
            className={styles.cakimage}
            style={{
              transform: `${showcakimage ? '' : 'translateY(22vh)'}`,
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
                      valueTemplate={'{value}%'}
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
                <div
                  className={styles.cakedetail}
                  onClick={() =>
                    setCakeState((prevState) =>
                      prevState.map((item, i) =>
                        i === index
                          ? [item[0], item[1], true]
                          : [item[0], item[1], false]
                      )
                    )
                  }
                >
                  <p>
                    <FaEdit className={styles.editicon} />
                  </p>
                  <p>{data && data[0][tool[0]].name} </p>
                  <p>
                    {data && (data[0][tool[0]].price * tool[1]).toFixed(0)}
                    تومان
                  </p>
                  <GiCrossMark
                    className={styles.closeIcon}
                    onClick={() =>
                      setCakeState((prevState) =>
                        prevState.filter((item, i) => i !== index)
                      )
                    }
                  />
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

export default BackeCake
