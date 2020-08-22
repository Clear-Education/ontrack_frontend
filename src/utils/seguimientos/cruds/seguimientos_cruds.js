import config from '../../config';
import axios from 'axios';
import errorHandler from "../../error_handler";

export async function addSeguimientosCrud(data, auth_token) {
    return axios.post(`${config.api_url}/`, data, {
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
}

export async function getSeguimientosCrud(auth_token) {
    return axios
        .get(`${config.api_url}/`, {
            headers: {
                Authorization: `Token ${auth_token}`,
            },
        })
        .then(json => {
            let response = {
                success: true,
                result: json.data,
            };

            return response;
        })
        .catch(error => errorHandler(error));
}

export async function editSeguimientosCrud(data, auth_token) {

    return axios
        .patch(`${config.api_url}/`, data, {
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
}


export async function deleteSeguimientosCrud(data, auth_token) {
    return axios.delete(`${config.api_url}/${data.id}/`, {
        headers: {
            Authorization: `Token ${auth_token}`,
        },
    })
        .then((result) => {
            return result;
        }).catch((error) => {
            return errorHandler(error);
        });
}
