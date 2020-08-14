import config from '../../config';
import axios from 'axios';
import errorHandler from "../../error_handler";


export async function getExamsCrud(token,subject_id){
    return await axios
    .get(`${config.api_url}/materia/${subject_id}/evaluacion/list/`,{ //TODO cambiar cuando tenga year id
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
  debugger;
  return await axios
  .delete(`${config.api_url}/evaluacion/`,{ 
      headers:{
          Authorization: `Token 984b229bf46e444407c3ca65a9be87b8d3bc37eb`
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