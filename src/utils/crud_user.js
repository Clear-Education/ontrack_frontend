import Config from './Config';
import axios from 'axios';

const CrudUser = {

    async addUser(data, auth_token) {
        return axios.post(`${Config.api_url}/users/`, data, {
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
            .get(`${Config.api_url}/users/list`, {
                headers: {
                    Authorization: `Token ${auth_token}`,
                },
            })
            .then(result => {
                return result;
            })
            .catch(error => error);
    },

    async editUser(data, auth_token) {
        const {
            email,
            name,
            phone,
            dni,
            last_name,
            cargo,
            legajo,
            direccion,
            localidad,
            provincia,
        } = data;

        let dataEditUser = {
            email,
            name,
            phone,
            dni,
            last_name,
            cargo,
            legajo,
            direccion,
            localidad,
            provincia,
        }
        return axios
            .patch(`${Config.api_url}/users/${data.id}/`, dataEditUser, {
                headers: {
                    Authorization: `Token ${auth_token}`,
                },
            })
            .then((result) => {
                console.log(result);
                return result;
            })
    },

    async deleteUser(data, auth_token) {
        return axios.delete(`${Config.api_url}/users/${data.id}/`, {
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