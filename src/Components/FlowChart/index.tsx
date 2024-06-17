import { useEffect, useState } from 'react'
import styles from './index.module.css'
import Payment from './Payment'
import ProductShow from './ProductShow'
import { Information } from '@/Interfaces'

interface Props {
  registered: boolean
}

const FlowChart: React.FC<Props> = () => {
  const [addresses, setAddresses] = useState<Information[]>()
  const [selectedAddresses, setSelectedAddresses] = useState<string>()

  const getAddress = async () => {
    const response = await fetch('/api/data/Post/Client/userinfo/address/GET', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        authType: 'C%a&d*s$r)e)u%p&d$a%t^r@i#R',
      }),
    })
    const data = await response.json()
    setAddresses(data.information)
  }
  useEffect(() => {
    getAddress()
  }, [])

  return (
    <>
      <div style={Container} className={styles.container}>
        <div className={styles.header}>
          <select                     className={styles.selectList}
          >
            {addresses?.map((addr) => (
              <option>{addr.address}</option>
            ))}
          </select>
        </div>

        <div className={styles.stateContainer}>
          <Payment />
          <ProductShow />
        </div>
      </div>
    </>
  )
}
export default FlowChart

const Container: React.CSSProperties = {
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
}
const Flow: React.CSSProperties = {
  width: '90%',
  height: '13%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '2vh',
}
const FlowBase: React.CSSProperties = {
  width: '80%',
  height: '10%',
  borderRadius: '7vh',
  display: 'flex',
  flexDirection: 'row-reverse',
  justifyContent: 'space-around',
  alignItems: 'center',
}
const FlowDomain: React.CSSProperties = {
  width: '7vh',
  height: '7vh',
  borderRadius: '7vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
}
