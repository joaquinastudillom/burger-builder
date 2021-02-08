import axios from 'axios'

const instance = axios.create({
	baseURL: 'https://react-burger-builder-72c69-default-rtdb.firebaseio.com/'
})

export default instance
