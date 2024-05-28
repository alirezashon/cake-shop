/** @format */

import { CSSProperties } from 'react'
import styles from './index.module.css'
const Tabs = [
	'درخواست های باز',
	'مرجوعی',
	'مدیریت محصولات',
	'تبلیغات',
	'جریان بازدید',
]
interface Styles {
	tabBar: CSSProperties
	tab: CSSProperties
}
interface Props {
	setContentId: (id: number) => void
}
const Tab: React.FC<Props> = ({ setContentId }) => {
	return (
		<>
			<div className={styles.tabBar}>
				{Tabs.map((tab, index) => (
					<div
						key={index}
						className={styles.tab}
						onClick={() => setContentId(index + 5)}>
						{tab}
					</div>
				))}
			</div>
		</>
	)
}
export default Tab
