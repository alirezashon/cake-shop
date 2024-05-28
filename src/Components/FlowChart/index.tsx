/** @format */

import styles from './index.module.css'
import Payment from './Payment'
import TimeHandling from './TimeHandling'
import ProductShow from './ProductShow'
import React, { useState } from 'react'
import { GiOrbDirection } from 'react-icons/gi'
import Information from './Information'

interface Props {
	flowStates: string[]
}

const FlowChart: React.FC<Props> = ({ flowStates }) => {
	const [state, setState] = useState<number>(0)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [registered, setRegistered] = useState<boolean>(false)
	const [isTimeHandling, setIsTimeHandling] = useState<boolean>(false)

	const handleFlowChange = async (index: number) => {
		try {
			setIsLoading(true)
			setState(index)
			await new Promise((resolve) => setTimeout(resolve, 77))
		} finally {
			setIsLoading(false)
		}
	}
	const changeState = (state: string) => {
		const newState = parseInt(`${flowStates.indexOf(state)} `)
 		setState(newState)
	}
	const nextState = () => {
		flowStates.length === 4
			? state === 1
				? registered === true
					? state + 1 < flowStates.length && setState(state + 1)
					: console.log('not registeralismaasism')
				: state === 2
				? isTimeHandling === true
					? state + 1 < flowStates.length && setState(state + 1)
					: console.log('not time handled')
				: state === 2
				? isTimeHandling === true
					? state + 1 < flowStates.length && setState(state + 1)
					: console.log('not time handled')
				: state + 1 < flowStates.length && setState(state + 1)
			: state + 1 < flowStates.length && setState(state + 1)
	}
	const checkRegister = (registered: boolean) => {
		setRegistered(registered)
		registered === true && setState(state + 1)
	}
	return (
		<>
			<div
				style={Container}
				className={styles.container}>
				<div className={styles.header}>
					<h2>{flowStates[state]}</h2>
				</div>
				<div
					className={styles.flow}
					style={Flow}>
					<div
						className={styles.flowBase}
						style={FlowBase}>
						{flowStates.map((domain, index) => (
							<div
								key={index}
								className={`${
									state !== index ? styles.flowDomain : styles.flowDomainActive
								}`}
								style={FlowDomain}
								onClick={() => handleFlowChange(index)}>
								{index + 1}
							</div>
						))}
					</div>
				</div>
				<div className={styles.stateContainer}>
					<GiOrbDirection
						className={styles.directionLeft}
						size={`6vh`}
						style={{
							background: `${
								flowStates.length < state + 2
									? 'gray'
									: 'radial-gradient(rgb(13, 255, 0), rgb(28, 149, 3))'
							}`,
						}}
						onClick={nextState}
					/>
					{isLoading ? (
						<p>Loading...</p>
					) : flowStates.includes('تکمیل اطلاعات') ? (
						state === 0 ? (
							<ProductShow setState={changeState} />
						) : state === 1 ? (
							<Information setRegistered={checkRegister} />
						) : state === 2 ? (
							<TimeHandling />
						) : (
							state === 3 && <Payment />
						)
					) : state === 0 ? (
						<ProductShow setState={changeState} />
					) : state === 1 ? (
						<TimeHandling />
					) : (
						state === 2 && <Payment />
					)}
					<GiOrbDirection
						className={styles.directionRight}
						size={`6vh`}
						style={{
							background: `${
								state - 1 < 0
									? 'gray'
									: 'radial-gradient(rgb(13, 255, 0), rgb(28, 149, 3))'
							}`,
						}}
						onClick={() => state - 1 >= 0 && setState(state - 1)}
					/>
				</div>
			</div>
		</>
	)
}
export default FlowChart

const Container: React.CSSProperties = {
	width: '100vw',
	height: '100vh',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	textAlign: 'center',
}
const Flow: React.CSSProperties = {
	width: '90%',
	height: '13%',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	borderRadius: '2vh',
}
const FlowBase: React.CSSProperties = {
	width: '80%',
	height: '10%',
	borderRadius: '7vh',
	display: 'flex',
	flexDirection: 'row-reverse',
	justifyContent: 'space-around',
	alignItems: 'center',
}
const FlowDomain: React.CSSProperties = {
	width: '7vh',
	height: '7vh',
	borderRadius: '7vh',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	cursor: 'pointer',
}
