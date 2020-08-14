import config from '../../config';
import axios from 'axios';
import errorHandler from "../../error_handler";

export async function getSchoolYearsCrud(token) {
    return await axios
        .get(`${config.api_url}/anio_lectivo/list/`, {
            headers: {
                Authorization: `Token ${token}`
            }
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

export async function addSchoolYearCrud(token, data) {

    return await axios
        .post(`${config.api_url}/anio_lectivo/`, data, {
            headers: {
                Authorization: `Token ${token}`
            }
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

export async function editSchoolYearCrud(token, data) {
    const parsedData = {
        nombre: data.nombre,
        fecha_desde: data.fecha_desde,
        fecha_hasta: data.fecha_hasta
    }

    console.log(parsedData);
    return await axios
        .patch(`${config.api_url}/anio_lectivo/${data.id}/`, parsedData, {
            headers: {
                Authorization: `Token ${token}`
            }
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

export async function deleteSchoolYearCrud(token, data) {
    return await axios
        .delete(`${config.api_url}/anio_lectivo/${data.id}/`, {
            headers: {
                Authorization: `Token ${token}`
            }
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