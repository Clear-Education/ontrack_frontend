import config from '../../config';
import axios from 'axios';
import errorHandler from "../../error_handler";

export async function addGoalsCrud(data, auth_token) {
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

export async function addMultipleGoalsCrud(data, auth_token) {
    return axios.post(`${config.api_url}/objetivos/multiple/`, data, {
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

export async function getTrackingGoalsCrud(auth_token, tracking_id) {
    return axios
        .get(`${config.api_url}/objetivos/list/seguimiento/${tracking_id}/`, {
            headers: {
                Authorization: `Token ${auth_token}`,
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

export async function getStudentGoalsCrud(auth_token,student_id,seguimiento_id) {
    return axios
        .get(`${config.api_url}/objetivos/alumno/${student_id}/`, {
            headers: {
                Authorization: `Token ${auth_token}`,
            },
            params:{
                seguimiento:seguimiento_id
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


export async function getGoalsTypeCrud(auth_token) {
    return axios
        .get(`${config.api_url}/objetivos/tipo/list/`, {
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

export async function editGoalsCrud(data, auth_token) {

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


export async function deleteGoalsCrud(data, auth_token) {
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
