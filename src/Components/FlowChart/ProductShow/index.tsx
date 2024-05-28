/** @format */

import Related from '../../Related'
import styles from './index.module.css'
import Products from './Products'
import { useEffect } from 'react'
interface Props {
	setState: (index: string) => void
}
const ProductShow: React.FC<Props> = ({ setState }) => {

	return (
		<>
 			<div className={styles.container}>
				<div className={styles.related}>
					<Related searchString={'یخچال'} />
				</div>
				<div>
					<Products setLoading />
				</div>
			</div>
		</>
	)
}
export default ProductShow
