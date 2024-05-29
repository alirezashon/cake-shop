import Image from "next/image"
import { MdEditDocument } from "react-icons/md"
import styles from "../../../List.module.css"
import { Tags } from "@/DTO"
interface Props {
  data: Tags[] | null
  isLoading: boolean
}
const TagList: React.FC<Props> = ({ data, isLoading }) => {
  return (
    <div className={styles.tableContainer}>
      <div className={styles.header}>تگ های ساخت کیک</div>
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
              {["Name", "Image"].map((header) => (
                <th key={header}>{header}</th>
              ))}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((brand) => (
              <tr key={brand._id}>
                <td>{brand.name}</td>
                <td>
                  <Image
                    src={`data:image/jpeg;base64,${brand.src}`}
                    alt={brand.name}
                    className={styles.image}
                    width={222}
                    height={222}
                  />
                </td>

                <td>
                  <MdEditDocument className={styles.actionButton} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default TagList
