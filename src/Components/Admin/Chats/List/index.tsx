import styles from '../../List.module.css' 
import { MessageInterface } from '@/Interfaces'

interface Props {
  data: MessageInterface[] | null
  isLoading: boolean
  setEditItemId: (id: string) => void
}
const List: React.FC<Props> = ({ data, isLoading, setEditItemId }) => {
  return (
    <div className={styles.tableContainer}>
      <div className={styles.header}>فهرست پیام ها</div>
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
              {['کاربر', 'تعداد پیام ها'].map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data &&
              data?.map((chat) => (
                <tr key={chat.client}>
                  <td>{chat.client}</td>
                  <td>{chat.chats.length}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default List
