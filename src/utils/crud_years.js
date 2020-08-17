import config from './config';
import axios from 'axios';
import errorHandler from "./error_handler";

export async function getYears(data, token) {
    return await axios
        .get(`${config.api_url}/carrera/${data}/anio/list`, {
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

export async function newYear(token, data, idCarrera) {
    const carrera = idCarrera;
    const {
        nombre,
        color
    } = data;

    let newYear = {
        nombre,
        color,
        carrera
    }

    return await axios
        .post(`${config.api_url}/anio/`, newYear, {
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