import config from '../../config';
import axios from 'axios';
import errorHandler from "../../error_handler";


export async function getStudentCrud(token){
    return await axios
    .get(`${config.api_url}/alumnos/list/`,{ 
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


export async function getStudentCourseCrud(token,student_id){
  console.log(token)
  return await axios
  .get(`${config.api_url}/alumnos/curso/list/`,{ 
      headers:{
          Authorization: `Token ${token}`
      },
      params:{
        alumno: student_id
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

export async function addStudentCrud(token,data){
    return await axios
    .post(`${config.api_url}/alumnos/`,data,{
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


export async function addStudentCourseCrud(token,data){
  return await axios
  .post(`${config.api_url}/alumnos/curso/`,data,{
      headers:{
          Authorization: `Token ${token}`
      }
  })
  .then((json) => {
    console.log(json)
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



export async function editStudentCrud(token,data){
  return await axios
  .patch(`${config.api_url}/alumnos/${data.id}/`,data,{
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



export async function deleteStudentCrud(token,data){
  return await axios
  .delete(`${config.api_url}/alumnos/${data}/`,{ 
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