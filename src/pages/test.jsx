import Store from "../Components/Store"
import {sampleData} from '../Components/Store/content'
const Home = () => {
  return (
    <div>
      <Store data={sampleData}/>
    </div>
  )
}
export default Home
