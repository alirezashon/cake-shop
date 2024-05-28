/** @format */
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, Zoom } from 'react-toastify'
import { useState } from 'react'
import Image from 'next/image'
import styles from './index.module.css'
import Switch from '../Form/Switch'
import { SignUp, SignIn } from '../Auth'

const Login: React.FC = () => {
	const [phone, setPhone] = useState<number>(-1)
	const [password, setPassword] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [state, setState] = useState<string>('&L^a^g@y&N*')

	const submiter = async () => {
		if (state === '*R(e&d%i^s$T#e@r$') {
			const result = await SignUp(setIsLoading, phone, password)
			if (result === 'S!A@k%s$e^x%f^u*l^e@x^R%e$j*i3e%R&') {
				location.href = '/profile'
				console.log(result)
				window.location.href = '/profile'
			}
		} else if (state === '&L^a^g@y&N*') {
			const result = await SignIn(setIsLoading, phone, password)
			if (result === 'S!A@k%s$e^x%f^u*l^') {
				location.href = '/profile'
			}
		}
	}

	return (
		<>
			<ToastContainer
				position={'top-right'}
				newestOnTop
				pauseOnHover
				style={{
					transform: 'rotate(-7deg)',
					margin: '2vh',
				}}
				transition={Zoom}
			/>
			<div className={styles.container}>
				<div className={`${styles.formBox}  ${isLoading && styles.animate}`}>
					{!isLoading && (
						<>
							<Image
								className={styles.logo}
								src={'/images/icon.png'}
								width={1111}
								height={1111}
								alt='Kalimogo'
							/>
							<div className={styles.formShadow}>
								<form
									className={styles.formInnerBox}
									onSubmit={submiter}>
									<Switch
										handleState={() =>
											setState(
												state === '*R(e&d%i^s$T#e@r$'
													? '&L^a^g@y&N*'
													: '*R(e&d%i^s$T#e@r$'
											)
										}
									/>
									<div className={styles.formRow}>
										<label> شماره موبایل</label>
										<input
											onChange={(e) => setPhone(parseInt(e.target.value))}
											type='input'
											placeholder='نام کاربری ...'
											required
										/>
									</div>
									<div className={styles.formRow}>
										<label>رمز عبور </label>
										<input
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											type='password'
											placeholder='رمز عبور ...'
											required
										/>
									</div>
									<div className={styles.buttonBox}>
										<input
											type='submit'
											value={'ورود'}
											className={styles.submit}
										/>
									</div>
								</form>
							</div>
						</>
					)}
				</div>
			</div>
		</>
	)
}
export default Login
