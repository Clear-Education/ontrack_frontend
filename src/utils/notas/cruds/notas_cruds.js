import config from '../../config';
import axios from 'axios';
import errorHandler from "../../error_handler";

export async function addNotasCrud(auth_token, data) {
    return axios.post(`${config.api_url}/calificaciones/`, data, {
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

export async function getNotasCrud(auth_token) {
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

export async function getNotasCursoCrud(auth_token, id_curso, id_evaluacion) {
    return axios
        .get(`${config.api_url}/calificaciones/list/`, {
            headers: {
                Authorization: `Token ${auth_token}`,
            },
            params: {
                curso: id_curso,
                evaluacion: id_evaluacion
            }
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

export async function editNotasCrud(auth_token, data) {

    const parsedData = {
        puntaje: data.puntaje,
        fecha: data.fecha
    }

    return axios
        .patch(`${config.api_url}/calificaciones/${data.id_calificacion}/`, parsedData, {
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


export async function deleteNotasCrud(auth_token, data) {
    return axios.delete(`${config.api_url}/calificaciones/${data.id_calificacion}/`, {
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
        }).catch((error) => {
            return errorHandler(error);
        });
}
