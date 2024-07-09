import Image from 'next/image'
import { MdEditDocument } from 'react-icons/md'
import styles from '../../List.module.css' // Update with your CSS file path
import { Category } from '@/Interfaces'

interface Props {
  data: Category[] | null
  isLoading: boolean
  setEditItemId: (id: string) => void
}
const List: React.FC<Props> = ({ data, isLoading, setEditItemId }) => {
  return (
    <div className={styles.tableContainer}>
      <div className={styles.header}>لیست عکس های کتگوری</div>
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
              {['اسم', 'تصویر', 'کلمات کلیدی'].map((header) => (
                <th key={header}>{header}</th>
              ))}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data?.map((category) => (
                <tr key={category._id}>
                  <td>{category.name}</td>
                  <td>
                    <Image
                      src={`data:image/jpeg;base64,${Buffer.from(
                        category.src
                      ).toString('base64')}`}
                      alt={``}
                      width={77}
                      height={77}
                    />
                  </td>
                  <td>
                    {Object.values(category.keywords).map((keyword, index) => (
                      <div key={index} className={styles.colorBox}>
                        {keyword}
                      </div>
                    ))}
                  </td>
                  <td>
                    <MdEditDocument
                      className={styles.actionButton}
                      onClick={() => setEditItemId(category._id)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default List
