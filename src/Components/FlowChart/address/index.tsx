import styles from './index.module.css'
import { Toast } from 'primereact/toast'
import Add from './add'
import { useRef, useState } from 'react'
import { Information } from '@/Interfaces'

const Address: React.FC = () => {
 
  const toast = useRef<Toast>(null)
  return (
    <>
      <Toast ref={toast} />
        hie
      <div className={styles.container}>
        <Add />
      </div>
    </>
  )
}

export default Address
