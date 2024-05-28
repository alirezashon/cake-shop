/** @format */

import styles from './index.module.css'
import { useState } from 'react'
import moment from 'jalali-moment'

const weekDays = [
	'دوشنبه',
	'سه‌شنبه',
	'چهارشنبه',
	'پنج‌شنبه',
	'جمعه',
	'شنبه',
	'یکشنبه',
]
const hours = ['ساعت 10 الی 14', 'ساعت 15 الی 19', 'ساعت 20 تا 24']

const TimeHandling: React.FC = () => {
	const [selectedTime, setSelectedTime] = useState<string[]>([])

	console.log(moment().locale('fa').date())
	return (
		<>
			<div className={styles.times}>
				{selectedTime.map((time) => (
					<div className={styles.time}>{time}</div>
				))}
			</div>
			<div className={styles.container}>
				{weekDays.map((day, index) => (
					<div
						key={index}
						className={styles.menuBox}>
						<div className={styles.daysSection}>
							<h3 className={styles.day}>{day}</h3>
						</div>
						<div className={styles.timeSection}>
							{hours.map((hour) => (
								<div
									key={hour}
									className={styles.timeRow}
									onClick={() =>
										!selectedTime.includes(`${day} - ${hour}`)
											? setSelectedTime((prevMessages) => [
													...prevMessages,
													`${day} - ${hour}`,
											  ])
											: setSelectedTime((prevMessages) =>
													prevMessages.filter(
														(msg) => msg !== `${day} - ${hour}`
													)
											  )
									}>
									<input
										className={styles.checkboxInput}
										type='checkbox'
										checked={selectedTime.includes(`${day} - ${hour}`)}
										value={hour}
									/>
									<label>{hour}</label>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</>
	)
}
export default TimeHandling
