import config from '../../config';
import axios from 'axios';
import errorHandler from "../../error_handler";



export async function getCourses(token,year_id) {
    return await axios
        .get(`${config.api_url}/anio/${year_id}/curso/list/`, {
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



export async function addCoursesCrud(token, data) {

    return await axios
        .post(`${config.api_url}/curso/`, data, {
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

export async function editCoursesCrud(token, data) {
    return await axios
        .patch(`${config.api_url}/curso/${data.id}/`, data, {
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

export async function deleteCoursesCrud(token, id) {
    return await axios
        .delete(`${config.api_url}/curso/${id}/`, {
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