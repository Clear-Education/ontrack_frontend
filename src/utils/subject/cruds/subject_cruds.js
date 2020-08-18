import config from '../../config';
import axios from 'axios';
import errorHandler from "../../error_handler";


export async function getSubjectsCrud(token,year_id){
    return await axios
    .get(`${config.api_url}/anio/${year_id}/materia/list/`,{
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

export async function addSubjectsCrud(token,data){
    return await axios
    .post(`${config.api_url}/materia/`,data,{
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



export async function editSubjectsCrud(token,data){
  const parsedData = {
    nombre: data.nombre,
    color: data.color
  }
  return await axios
  .patch(`${config.api_url}/materia/${data.id}/`,parsedData,{
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



export async function deleteSubjectsCrud(token,data){
  return await axios
  .delete(`${config.api_url}/materia/${data.id}/`,{ 
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