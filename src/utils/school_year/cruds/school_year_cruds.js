import config from '../../config';
import axios from 'axios';
import errorHandler from "../../error_handler";


export async function getSchoolYearCrud(token) {
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

export async function getOneSchoolYearCrud(token, id_anio_lectivo) {
  return await axios
    .get(`${config.api_url}/anio_lectivo/${id_anio_lectivo}/`, {
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
  return await axios
    .patch(`${config.api_url}/anio_lectivo/${data.id}/`, data, {
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