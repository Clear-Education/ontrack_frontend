import config from '../../config';
import axios from 'axios';
import errorHandler from "../../error_handler";

export async function addAsistenciasCrud(data, auth_token) {

    if (data.descripcion == "") {
        data = {
            alumno_curso: data.alumno_curso,
            fecha: data.fecha,
            asistio: data.asistio

        }
    }
    return axios.post(`${config.api_url}/asistencias/`, data, {
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


//OBTENER LA LISTA DE ASISTENCIAS DE UN CURSO PARA UN FECHA DETERMINADA
export async function getAsistenciasCrud(auth_token, curso_id, fecha_desde) {
    return axios
        .get(`${config.api_url}/asistencias/list`, {
            headers: {
                Authorization: `Token ${auth_token}`,
            },
            params: {
                curso: curso_id,
                fecha_desde: fecha_desde
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

export async function editAsistenciasCrud(auth_token, data) {
    let parsedData
    if (data.descripcion == "" || data.descripcion == null) {
        parsedData = {
            asistio: data.asistio === "Asistió" ? 1 : 0
        }
    } else {
        parsedData = {
            asistio: data.asistio === "Asistió" ? 1 : 0,
            descripcion: data.descripcion
        }
    }

    return axios
        .patch(`${config.api_url}/asistencias/${data.id_asistencia}/`, parsedData, {
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


export async function deleteAsistenciasCrud(auth_token, data) {
    return axios.delete(`${config.api_url}/asistencias/${data.id_asistencia}/`, {
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
