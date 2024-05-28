/** @format */

import { useState } from 'react'
import styles from './index.module.css'
interface Switch {
	handleState: (state: boolean) => void
}
const Switch: React.FC<Switch> = ({ handleState }) => {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true)

	const handleAction = (state: boolean) => {
		setIsLoggedIn(state)
		handleState(state)
	}
	return (
		<>
			<div className={styles.switchWrapper}>
				<label
					className={`${styles.label} ${
						isLoggedIn ? styles.selectedRadio : ''
					}`}
					onClick={() => handleAction(false)}>
					ثبت نام
				</label>
				<input
					type='checkbox'
					className={styles.switch}
					checked={isLoggedIn}
					onChange={() => handleAction(!isLoggedIn)}
				/>
				<label
					className={`${styles.label} ${
						isLoggedIn ? '' : styles.selectedRadio
					}`}
					onClick={() => handleAction(true)}>
					ورود
				</label>
			</div>
		</>
	)
}
export default Switch
