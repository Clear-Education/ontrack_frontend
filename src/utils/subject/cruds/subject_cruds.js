import config from '../../config';
import axios from 'axios';
import errorHandler from "../../error_handler";


export async function getSubjectsCrud(token,year_id){
    return await axios
    .get(`${config.api_url}/carrera/list`,{ //TODO cambiar cuando tenga year id
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