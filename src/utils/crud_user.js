import Config from './Config';
import axios from 'axios';

const CrudUser = {
    async getUsers() {
        return axios.get(`${Config.api_url}/users/list`)
            .then(res => res)
    },
    async editUser(data){
        return axios.post(`${Config.api_url}/users/list`,data).then((result)=>{
            return result
        })
    }
}



export default CrudUser