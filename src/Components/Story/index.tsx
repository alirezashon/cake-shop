/** @format */

import { AiFillCloseCircle, AiOutlineShoppingCart } from "react-icons/ai"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Add } from "../Basket/Actions"
import styles from "./index.module.css"
import { PiHandHeartThin } from "react-icons/pi"
import { Story } from "@/DTO"

interface Structure {
  structure: Story[]
}
const StoryComponent: React.FC<Structure> = ({ structure }) => {
  const [openStory, setOpenStory] = useState<string | null>(null)
  const [seens, setSeens] = useState<string[]>([])
  // const [isLiked, setIsLiked] = useState<boolean>(false)
  useEffect(() => {
    const storyHistory: string[] = JSON.parse(
      sessionStorage.getItem("^S&T#o@r%i($*i&N0") || "[]"
    )
    storyHistory && setSeens(storyHistory)
  }, [])

  const showStory = (_id: string) => {
    setOpenStory(_id)
    const storyHistory: string[] = JSON.parse(
      sessionStorage.getItem("^S&T#o@r%i($*i&N0") || "[]"
    )
    if (storyHistory.indexOf(_id) === -1) {
      storyHistory.push(_id)
      console.log(storyHistory)
      setSeens(storyHistory)
      sessionStorage.setItem("^S&T#o@r%i($*i&N0", JSON.stringify(storyHistory))
    }
  }

  return (
    <>
      <div className={styles.storyBox}>
        {structure.map((story, index) => (
          <div key={story._id}>
            <div
              className={`${styles.story} ${
                openStory === story._id && styles.storySeen
              }
							`}
              onClick={() => showStory(story._id)}
            >
              <Image
                src={`data:image/jpeg;base64,${story.src}`}
                alt={`Story ${index + 1}`}
                width={1111}
                height={1111}
                className={styles.storyBanner}
              />
            </div>
          </div>
        ))}
      </div>
      {openStory && (
        <div className={styles.openStoryContainer}>
          <div className={styles.openStoryTitle}>برترین های هفته</div>
          <div className={styles.openStoryInnerSide}>
            {structure.map((story) => (
              <div key={story._id} className={styles.openStoryBox}>
                <div className={styles.openStoryHeader}>
                  <h3 className={styles.title}>{story.title}</h3>
                </div>
                <div className={styles.openStory}>
                  <Image
                    width={1111}
                    height={1111}
                    src={`data:image/jpeg;base64,${story.src}`}
                    alt={story.title || story.description}
                    className={styles.storyShowImage}
                    onClick={() =>
                      (location.href = `http://localhost:3000/Post/${story.title}`)
                    }
                  />
                  <h6>{story.description}</h6>
                </div>
                <div className={styles.belowContainer}>
                  <AiOutlineShoppingCart
                    className={styles.basketBall}
                    color={"white"}
                    size={"5vh"}
                    onClick={() => Add(story._id, story.price)}
                  />
                  <PiHandHeartThin
                    size={"5vh"}
                    style={{
                      color: seens.includes(story._id + "l2I7k3t1d")
                        ? "white"
                        : "#ec6a1a",
                      backgroundColor: seens.includes(story._id + "l2I7k3t1d")
                        ? "#ec6a1a"
                        : "white",
                    }}
                    className={styles.like}
                    onClick={() =>
                      setSeens((sew) => {
                        const idWithStr = story._id + "l2I7k3t1d"
                        const newState = new Set<string>(sew)

                        if (newState.has(idWithStr)) {
                          newState.delete(idWithStr)
                          newState.add(story._id)
                        } else {
                          if (newState.has(story._id)) {
                            newState.delete(story._id)
                          }
                          newState.add(idWithStr)
                        }

                        return Array.from(newState)
                      })
                    }
                  />
                </div>
              </div>
            ))}
          </div>
          <AiFillCloseCircle
            className={styles.closeStoryContainer}
            onClick={() => setOpenStory(null)}
            size={"5vh"}
          />
        </div>
      )}
    </>
  )
}

export default StoryComponent
