import config from './config';
import axios from 'axios';
import errorHandler from "./error_handler";


export async function getStudents(token){
    return await axios
    .get(`${config.api_url}/alumnos/list`,{
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


 
