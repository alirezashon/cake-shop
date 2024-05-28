/** @format */

import { useEffect, useState } from 'react'
interface Option {
	name: string
	options?: string[] | Option[]
}
interface MenuItems {
	name: string
	options: string[] | Option[]
}
interface Props {
	structure: MenuItems[]
	displayName?: string
}
const SelectList: React.FC<Props> = ({ structure, displayName }) => {
	const [selectedItem, setSelectedItem] = useState('')
	const [isOpen, setIsOpen] = useState(false)
	
	// const menuItems: MenuItems[] = [
	// 	{
	// 		name: 'محصولات',
	// 		options: [
	// 			{ name: 'ازینا', options: ['گیر خامه عصرشون', 'تیپ یک یکشون'] },
	// 			{
	// 				name: 'ازونا',
	// 				options: [
	// 					{ name: 'پرتقالوزادنن', options: ['دوشواریشکن'] },
	// 					{ name: 'همهدارن', options: ['ایناندارن'] },
	// 				],
	// 			},
	// 		],
	// 	},
	// 	{ name: 'سفارشی سازی', options: ['سرتاتشو', 'فقط وسطاشو', 'بغلاشو'] },
	// 	{ name: 'پروفایل کاربری', options: ['تاریخچه خرید', 'مدیریت '] },
	// 	{ name: 'خدمات', options: ['ماساژ غضروف'] },
	// 	{ name: 'تماس با ما', options: ['0700600500137'] },
	// 	{ name: 'درباره ی ما', options: ['همیشه خفناسا'] },
	// ]

	const handleSelectChange = (value: string) => {
		setSelectedItem(value)
		setIsOpen(false)
	}

	const toggleOptions = () => {
		setIsOpen(!isOpen)
	}

	return (
		<>
			<div className={`select-container ${isOpen ? 'open' : ''}`}>
				<div
					className='select'
					onClick={toggleOptions}>
					<div className='selected-item'>
						{selectedItem || displayName || structure[0]?.name}
					</div>
					{isOpen && (
						<div
							className='options'
						>
							{structure.map((menuItem, index) => (
								<div
									key={index}
									className='option'>
									{menuItem.name}
									{menuItem.options && menuItem.options.length > 0 && (
										<div className='nested-options'>
											{menuItem.options.map((option, optionIndex) => (
												<div
													key={optionIndex}
													className='nested-option'
													onClick={() =>
														handleSelectChange(
															typeof option === 'string' ? option : option.name
														)
													}>
													{typeof option === 'string' ? option : option.name}
												</div>
											))}
										</div>
									)}
								</div>
							))}
						</div>
					)}
				</div>
			</div>

			<style jsx>{`
				.select-container {
					position: relative;
					width: 30vh;
					z-index: 2;
					background-color: yellow;
				}

				.select {
					border: ${isOpen ? 'none' : '.4vh ridge rgb(199, 255, 252)'};
					cursor: pointer;
					display: flex;
					flex-direction: column;
					background-color: yellow;
					text-align: center;
				}

				.selected-item {
					background: linear-gradient(
						90deg,
						rgb(230, 226, 173),
						rgb(179, 255, 252),
						rgb(173, 216, 230)
					);
					padding: 1vh;
				}

				.options {
					display: none;
					position: absolute;
					top: 100%;
					left: 0;
					right: 0;
					background-color: #fff;
					border: 1px solid #ccc;
				}

				.option {
					padding: 10px;
					border-bottom: 1px solid #ccc;
				}

				.nested-options {
					padding-left: 20px;
				}

				.nested-option:hover {
					background-color: #79bdb6;
				}
				.nested-option {
					padding: 5px;
					cursor: pointer;
				}

				.select-container.open .options {
					display: block;
				}
			`}</style>
		</>
	)
}

export default SelectList
