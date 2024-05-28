/** @format */

import React, { useState, MouseEvent } from 'react'
import { FaSearchengin } from 'react-icons/fa'
import styles from './index.module.css'
const SearchBarComponent: React.FC = () => {
	const [searchText, setSearchText] = useState<string>('')
	const [inputWidth, setInputWidth] = useState<number>(0)

	const changeTextBoxWidth = () => {
		let interval: NodeJS.Timeout

		if (inputWidth === 0) {
			interval = setInterval(() => {
				setInputWidth((prev) => Math.min(prev + 5, 100))
			}, 3)
		}

		return () => {
			clearInterval(interval)
		}
	}

	return (
		<div className={styles.container}>
			<div className={styles.searchBar}>
				<input
					style={{
						width: `${inputWidth}%`,
						display: `${inputWidth < 5 ? 'none' : 'block'}`,
					}}
					type='search'
					className={styles.textBox}
					value={searchText}
					onChange={(e) => setSearchText(e.currentTarget.value)}
					placeholder='جستجو ...'
				/>

				<div
					className={styles.submitButton}
					style={{
						borderRadius: `${inputWidth < 5 ? '5vh' : '.4vh 0 0 .4vh'}`,
						width: `${inputWidth < 5 && '7vh'}`,
						height: `${inputWidth < 5 ? '7vh' : '5vh'}`,
						border: `${inputWidth > 5 && 'none'}`,
					}}
					onClick={changeTextBoxWidth}>
					<FaSearchengin className={styles.searchIcon} />
				</div>
			</div>
			{/* <div className={styles.searchOptionBox}>t</div> */}
		</div>
	)
}

export default SearchBarComponent
