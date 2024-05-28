/** @format */

import FlowChart from '@/Components/FlowChart'
const Register = () => {
	return (
		<FlowChart
			flowStates={[
				'نمایش محصولات',
				'تکمیل اطلاعات',
				'تعیین بازه های زمانی ممکن',
				'ثبت و پرداخت',
			]}
		/>
	)
}
export default Register
