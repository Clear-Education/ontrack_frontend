import config from './config';
import axios from 'axios';

const CrudUser = {

    async addUser(data, auth_token) {
        return axios.post(`${config.api_url}/users/`, data, {
            headers: {
                Authorization: `Token ${auth_token}`,
            },
        })
            .then((result) => {
                console.log(result);
                return result;
            })
    },

    async getUsers(auth_token) {
        return axios
            .get(`${config.api_url}/users/list`, {
                headers: {
                    Authorization: `Token ${auth_token}`,
                },
            })
            .then(result => {
                console.log(result);
                return result;
            })
            .catch(error => error);
    },

    async editUser(data, auth_token) {
        console.log(data);
        return axios
            .patch(`${config.api_url}/users/${data.id}/`, data, {
                headers: {
                    Authorization: `Token ${auth_token}`,
                },
            })
            .then((result) => {
                console.log(result);
                return result;
            })
    }
}



export default CrudUser;