import React, { useEffect, useRef, useState } from 'react'
import Ordero from './Ordero'
import styles from './index.module.css'
import Tools from './Tools'
import ProductManager from './Product'
import CategoryManager from './Category'
import ClientManager from './Client'
import Tab from './Navigation/Tab'
import Drawer from './Navigation/Drawer'
import ChatsManager from './Chats'
import { io } from 'socket.io-client'
import { Category, ProductInterface } from '@/Interfaces'
import { Toast } from 'primereact/toast'

const Admin: React.FC = () => {
  const [contentId, setContentId] = useState<number>(0)
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)
  const [data, setData] = useState<ProductInterface[]>([])
  const [categories, setCategories] = useState<Category[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const toast = useRef<Toast>(null)

  const dataCache = useRef<{
    category: Category[]
  } | null>(null)
  const getData = async () => {
    if (dataCache.current) {
      setCategories(dataCache.current.category)
      setIsLoading(false)
      return
    }
    try {
      const response = await fetch('/api/data/Post/Admin/Product/GET', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authType: '^c(a)ta*sEa0c(Tzol&i^*o%l#sA!',
        }),
      })

      if (response.ok) {
        const result = await response.json()
        setCategories(result.category)
        setIsLoading(false)
        dataCache.current = result
      } else {
        toast.current?.show({
          severity: 'error',
          summary: 'Secondary',
          detail: ' نا موفق',
          life: 3000,
        })
        setIsLoading(false)
      }
    } catch (error) {
      toast.current?.show({
        severity: 'error',
        summary: 'Secondary',
        detail: ' نا موفق',
        life: 3000,
      })
      setIsLoading(false)
    }
  }
  useEffect(() => {
    !categories && getData()

    const socket = io({
      path: '/api/socket/Store',
    })
    socket.emit('getStore', { authType: '(m&n)w%I@t!n^O%l%a&v*E)' })
    socket.on('product', (product: ProductInterface) => {
      setData((prevProducts) => [...prevProducts, product])
    })
    socket.on('done', () => {
      socket.disconnect()
    })
    socket.on('unauthorized', (message: string) => {
      socket.disconnect()
    })
    socket.on('error', (message: string) => {
      socket.disconnect()
    })
    return () => {
      socket.disconnect()
    }
  }, [])
  const content = [
    <ProductManager
      data={data}
      isLoading={isLoading}
      category={categories}
      toast={toast}
    />,
    <CategoryManager />,
    <Ordero />,
    <Tools />,
    <ChatsManager />,
    <ClientManager />,
  ]

  return (
    <>
      <Toast ref={toast} />
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
