import { useRef, RefObject, useState, useEffect } from 'react'
import styles from '../List.module.css'
import { Toast } from 'primereact/toast'
import { MdEditDocument } from 'react-icons/md'
import { ClientInterface } from '@/Interfaces'
import Image from 'next/image'
const ClientManager: React.FC = () => {
  const toast = useRef<Toast>(null)
  const [data, setData] = useState<ClientInterface[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [showDetail, setShowDetail] = useState<string | null>(null)
  const getData = async () => {
    try {
      const response = await fetch('/api/data/Post/Admin/Client/GET', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authType: '^c&L(i*e$N&t#o(x&a^',
        }),
      })
      if (response.ok) {
        const result = await response.json()
        console.log(result)
        setData(result.clients)
        setIsLoading(false)
        console.log(result)
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
    !data && getData()
  }, [data])

  return (
    <>
      <Toast ref={toast} />
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
                {['phone'].map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data &&
                data?.map((client, index) => (
                  <tr key={client._id}>
                    <td>{client.phone}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}

export default ClientManager
