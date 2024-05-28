/** @format */

import React, { useEffect, useState } from "react"
import PostAdmin from "./PostAdmin"
import CateBrand from "./CateBrand"
import Carousel from "./Carousel"
import Story from "./Story"
import Ordero from "./Ordero"
import styles from "./index.module.css"
import Drawer from "./Navigation/Drawer"
import Tab from "./Navigation/Tab"
interface Post {
  _id: string
  title: string
  src: string
  subImages: string[]
  price: number
  categories: string[]
  type: string
  size: string
  color: string[]
  quantity: number
  description: string
  keywords: string[]
}
const Admin: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [data, setData] = useState<Post[]>([])
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)
  const [contentId, setContentId] = useState<number>(0)

  const content = [
    <PostAdmin data={data} isLoading={isLoading} />,
    <CateBrand />,
    <Carousel />,
    <Story />,
    <Ordero />,
  ]
  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await fetch(`/api/data/Post/Client`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            category: "@L$L%O%F#D%M^",
            authType: "G&E!T*P^R$O#D$U^C@T*S",
          }), // Update with your authType
        })

        if (res.ok) {
          const result = await res.json()
          setIsLoading(false)
          setData(result.products)
          console.log(result.products)
        } else {
          console.error("Error:", res.status)
        }
      } catch (err) {
        console.error("Error:", err)
      }
    }

    fetcher()
  }, [])

  return (
    <>
      <Drawer setDrawerOpen={setIsDrawerOpen} setContentId={setContentId} />
      <Tab setContentId={setContentId} />
      <div className={styles.container}>
        <div className={styles.block}>
          <div className={styles.contentBox}>
            <div className={styles.content}>{content[contentId]}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Admin
