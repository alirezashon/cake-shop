import Image from 'next/image'
import styles from './test.module.css'
import CupcakeDisplay from '@/Components/CupCakes'

const Cupcake = () => {
  return (
    <div className={styles.container}>
<CupcakeDisplay/>
    </div>
  )
}

export default Cupcake
