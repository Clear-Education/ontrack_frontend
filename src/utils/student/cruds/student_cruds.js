import config from '../../config';
import axios from 'axios';
import errorHandler from "../../error_handler";


export async function getStudentsCrud(token,_schoolYearId){
    return await axios
    .get(`${config.api_url}/alumnos/list/`,{ 
        headers:{
            Authorization: `Token ${token}`
        },
        params: _schoolYearId ? {anio_lectivo: _schoolYearId} : null
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

export async function getStudentCrud(token,student_id){
  return await axios
  .get(`${config.api_url}/alumnos/${student_id}/`,{ 
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

export async function editStudentCrud(token,data){
  debugger;
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





//ALUMNO CURSO



export async function getStudentsCourseCrud(token,course_id,schoolYearId){ //trae los alumnos de un curso para un año lectivo
  return await axios
  .get(`${config.api_url}/alumnos/curso/list/`,{ 
      headers:{
          Authorization: `Token ${token}`
      },
      params:{
        curso: course_id,
        anio_lectivo: schoolYearId
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

export async function addMultipleStudentsCourseCrud(token,data){
  return await axios
  .post(`${config.api_url}/alumnos/curso/multiple/`,data,{
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


export async function deleteMultipleStudentsCourseCrud(token,data){
  return await axios
  .delete(`${config.api_url}/alumnos/curso/multiple/`,{
      headers:{
          Authorization: `Token ${token}`
      },
      data:data
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
