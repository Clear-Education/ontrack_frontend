import store from '../../redux/store'
import { forcedLogout } from '../../redux/actions/userActions';

const handleCrudErrors = (error) => {
    let response = {};
    if (error.response) {
      if (error.response.status === 400) {
        response = {
          success: false,
          unauthorized: false,
          result: [
            {
              message: error.response.data.length > 0 ? error.response.data[0] : error.response.data.detail,
            },
          ],
        };
      } else if (error.response.status === 401) {
        setTimeout(()=>{
          store.dispatch(forcedLogout());
          window.location = "/";
        },1500)
        response = {
          success: false,
          unauthorized: true,
          result: [
            {
              message: "Sesión expirada, vuelva a logearse",
            },
          ],
        };
      } else if (error.response.status === 403) {
        response = {
          success: false,
          unauthorized: false,
          result: [
            {
              message: "No tenes permisos suficientes para realizar acción!",
            },
          ],
        };
      } else if (error.response.status === 404) {
        response = {
          success: false,
          unauthorized: false,
          result: [
            {
              message: error.response.data.detail
            },
          ],
        };
      } else if (error.response.status === 500) {
        response = {
          success: false,
          unauthorized: false,
          result: [
            {
              message: "Error interno del servidor",
            },
          ],
        };
      } else if (error.response.status === 409) {
        response = {
          success: false,
          unauthorized: false,
          error: 409,
          result: [
            {
              message: error.response.data.detail
            },
          ],
        };
      } else if (error.response.status === 402) {
        response = {
          success: false,
          unauthorized: false,
          error: 402,
          result: error.response.data.data,
        };
      } else {
        response = {
          success: false,
          unauthorized: false,
          result: [
            {
              message: "Error de conexión",
            },
          ],
        };
      }
    }else{
      response = {
          success: false,
          unauthorized: false,
          result: [
            {
              message: "Error interno del servidor",
            },
          ],
      }
    }
  
    return response;
  };
  
  export default handleCrudErrors;
  