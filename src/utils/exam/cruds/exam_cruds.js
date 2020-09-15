import config from '../../config';
import axios from 'axios';
import errorHandler from "../../error_handler";


export async function getExamsCrud(token,subject_id,_anio_lectivo_id){
    return await axios
    .get(`${config.api_url}/materia/${subject_id}/evaluacion/list/`,{ 
        headers:{
            Authorization: `Token ${token}`
        },
        params:{anio_lectivo:_anio_lectivo_id}
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

export async function addExamsCrud(token,data){
    return await axios
    .post(`${config.api_url}/evaluacion/`,data,{
        headers:{
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



export async function editExamsCrud(token,data){
  return await axios
  .put(`${config.api_url}/evaluacion/`,data,{
      headers:{
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



export async function deleteExamsCrud(token,data){
  const parseData = {
    anio_lectivo:data.anio_lectivo,
    materia: data.materia
  }
  return await axios
  .delete(`${config.api_url}/evaluacion/`,{ 
      headers:{
          Authorization: `Token ${token}`
      },
      data: parseData
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