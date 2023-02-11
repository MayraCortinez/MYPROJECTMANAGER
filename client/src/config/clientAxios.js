
import Axios from 'axios'


export const clientAxios = Axios.create( {
    
    baseURL : 'http://localhost:4000/api'

  
})