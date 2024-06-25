import { useRef, RefObject, useState, useEffect } from 'react'
import styles from '../List.module.css'
import { Toast } from 'primereact/toast'
import { ClientInterface, ClientProfile } from '@/Interfaces'
import Detail from './Details'
const ClientManager: React.FC = () => {
  const toast = useRef<Toast>(null)
  const [data, setData] = useState<[ClientInterface[], ClientProfile[]] | null>(
    null
  )
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [showDetail, setShowDetail] = useState<string | null>(null)
  const [showProfile, setShowProfile] = useState<ClientProfile | null>(null)
  const getData = async () => {
    try {
      const response = await fetch('/api/data/Post/Admin/ClientDetails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authType: '^c&L(i*e$N&t#o(x&a^',
        }),
      })
      if (response.status === 200) {
        const result = await response.json()
        setData([result.clients, result.profiles])
        setIsLoading(false)
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
        <div className={styles.header}>لیست کاربر ها</div>
        {isLoading ? (
          Array.apply(0, Array(7)).map((x, i) => (
            <div key={i} className={styles.loading}>
              <div className={styles.loadingRect}></div>
              <div className={styles.loadingSquare}></div>
            </div>
          ))
        ) : (
          <div className={styles.container}>
            <table>
              <thead>
                <th>phone</th>
              </thead>
              <tbody>
                {data &&
                  data[0]?.map((client, index) => (
                    <tr key={index}>
                      <td
                        onClick={() =>
                          data[1] &&
                          setShowProfile(
                            data[1][
                              data[1]?.findIndex((d) => d.client === client._id)
                            ]
                          )
                        }
                      >
                        {client.phone}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {showProfile && (
              <div className='profileBox'>
                <Detail
                  data={showProfile}
                  phone={parseInt(
                    `${
                      data &&
                      data[0][
                        data[0]?.findIndex((d) => d._id === showProfile?.client)
                      ].phone
                    }`
                  )}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default ClientManager
