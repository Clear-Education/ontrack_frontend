import Config from './Config';
import axios from 'axios';

const User = {
    async getUsers() {
        return axios.get(`${Config.api_url}/users/list`)
            .then(res => res)
    }
}