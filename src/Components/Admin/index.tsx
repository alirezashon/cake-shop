/** @format */

import React, { useState } from 'react'
import Ordero from './Ordero'
import styles from './index.module.css'
import Tools from './Tools'
import ProductManager from './Product'
import CategoryManager from './Category'
import Tab from './Navigation/Tab'
import Drawer from './Navigation/Drawer'
import ChatsManager from './Chats'
const Admin: React.FC = () => {
  const [contentId, setContentId] = useState<number>(0)
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)

  const content = [
    <ProductManager />,
    <CategoryManager />,
    <Ordero />,
    <Tools />,
    <ChatsManager/>,
  ]

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
