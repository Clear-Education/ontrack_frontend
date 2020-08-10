import config from './config';
import axios from 'axios';
import errorHandler from "./error_handler";


export async function getDepartments(token){
    return await axios
    .get(`${config.api_url}/carrera/list`,{
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


export async function newDepartment(token,data){
  return await axios
  .post(`${config.api_url}/carrera/`,data,{
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



export async function editDepartment(token,data){
  const parsedData = {
    nombre: data.nombre,
    descripcion: data.descripcion,
    color: data.color
  }
  return await axios
  .patch(`${config.api_url}/carrera/${data.id}/`,parsedData,{
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


export async function deleteDepartment(token,data){
  return await axios
  .delete(`${config.api_url}/carrera/${data.id}/`,{
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

 