import config from './config';
import axios from 'axios';
import errorHandler from "./error_handler";

const CrudUser = {

    async addUser(data, auth_token) {
        return axios.post(`${config.api_url}/users/`, data, {
            headers: {
                Authorization: `Token ${auth_token}`,
            },
        })
            .then((json) => {
                let response = {
                    success: true,
                    result: json.data,
                };

                return response;

            })
            .catch((error) => {
                return errorHandler(error);
            });
    },

    async getUsers(auth_token) {
        return axios
            .get(`${config.api_url}/users/list`, {
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
        const groups = data.groups.id;
        const {
            email,
            name,
            phone,
            dni,
            last_name,
            cargo,
            legajo,
            date_of_birth,
            direccion,
            localidad,
            provincia
        } = data;

        let dataEditUser = {
            email,
            name,
            phone,
            dni,
            last_name,
            cargo,
            legajo,
            date_of_birth,
            groups,
            direccion,
            localidad,
            provincia
        }

        return axios
            .patch(`${config.api_url}/users/${data.id}/`, dataEditUser, {
                headers: {
                    Authorization: `Token ${auth_token}`,
                },
            })
            .then((json) => {
                let response = {
                    success: true,
                    result: json.data,
                };

                return response;

            })
            .catch((error) => {
                return errorHandler(error);
            });
    },
    async editUserState(data, auth_token) {
        let { is_active } = data;
        let dataEditUser = {
            is_active
        }
        return axios.patch(`${config.api_url}/users/${data.id}/status/`, dataEditUser, {
            headers: {
                Authorization: `Token ${auth_token}`,
            },
        })
            .then((json) => {
                let response = {
                    success: true,
                    result: json.data,
                };

                return response;

            })
            .catch((error) => {
                return errorHandler(error);
            });
    },

    async deleteUser(data, auth_token) {
        return axios.delete(`${config.api_url}/users/${data.id}/`, {
            headers: {
                Authorization: `Token ${auth_token}`,
            },
        })
            .then((result) => {
                return result;
            })
    },

    async getGroups(auth_token) {
        return await axios
            .get(`${config.api_url}/users/groups/list/`, {
                headers: {
                    Authorization: `Token ${auth_token}`,
                },
            })
            .then(result => {
                return result;
            })
            .catch(error => error);
    }
}



export default CrudUser;