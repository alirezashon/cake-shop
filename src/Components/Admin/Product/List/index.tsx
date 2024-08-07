import Image from 'next/image'
import { MdEditDocument } from 'react-icons/md'
import styles from '../../List.module.css'
import { Category, ProductInterface } from '@/Interfaces'

interface Props {
  data: ProductInterface[] | null
  category: Category[] | null
  isLoading: boolean
  setEditItemId: (id: string) => void
  setPrvState: () => void
}
const List: React.FC<Props> = ({
  data,
  category,
  isLoading,
  setEditItemId,
  setPrvState,
}) => {
  return (
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
              {[
                'سرتیتر',
                'تصویر',
                'قیمت',
                'دسته بندی',
                'توضیحات',
                'کلمات کلیدی',
              ].map((header) => (
                <th key={header}>{header}</th>
              ))}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data?.map((product, index) => (
                <tr key={index}>
                  <td>{product.title}</td>

                  <td>
                    <Image
                      src={`data:image/jpeg;base64,${product.src}`}
                      alt={``}
                      width={77}
                      height={77}
                    />
                  </td>
                  <td>{product?.price}</td>
                  <td>
                    {category &&
                      category.find((cat) => cat._id === product.categories)
                        ?.name}
                  </td>
                  <td>{product?.description}</td>
                  <td>{product.keywords}</td>
                  <td>
                    <MdEditDocument
                      className={styles.actionButton}
                      onClick={() => {
                        setPrvState()
                        setEditItemId(product._id)
                      }}
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
