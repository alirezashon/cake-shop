import Image from 'next/image'
import styles from './index.module.css'
import Link from 'next/link'
import { Category } from '@/Interfaces'
interface Props {
  data: Category[]
}
const CircularLinks: React.FC<Props> = ({ data }) => {
  return (
    <>
      <div className={styles.container}>
        {data?.map((item, index) => (
          <Link
            key={index}
            href={`/Store/#${item.name}`}
            className={styles.name}
          >
            <Image
            src={`${item.src}`}
              // src={`data:image/jpeg;base64,${Buffer.from(item.src).toString(
              //   'base64'
              // )}`}
              alt={item.name}
              className={styles.image}
              width={99}
              height={99}
            />
            <h3>{item.name}</h3>
          </Link>
        ))}
      </div>
    </>
  )
}
export default CircularLinks
