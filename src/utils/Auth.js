// Axios
import axios from "axios";
import config from "./config";
import { loadState } from "../../redux/immutableState";
import errorHandler from "./error_handler";

export function validateLoggedInUser() {
  const state = loadState();
  return state;
}

export async function login(user, password) {
  var formData = new FormData();
  formData.append("username", user);
  formData.append("password", password);
  return axios
    .post(`${config.api_url}/users/login/`, formData)
    .then((json) => {
      if (json.status == 200) {
        const {
          name,
          last_name,
          cargo,
          token,
          phone,
          date_of_birth,
          dni,
          picture,
          direccion,
          localidad,
          provincia,
          email,
          legajo,
          institucion,
          groups
        } = json.data;
        let userData = {
          name,
          last_name,
          cargo,
          token,
          phone,
          date_of_birth,
          dni,
          picture,
          direccion,
          localidad,
          provincia,
          email,
          legajo,
          institucion,
          groups
        };
        let appState = {
          isLoggedIn: true,
          user: userData,
        };
        return appState;
      } else {
        let response = {
          isLoggedIn: false,
          result: [{ message: `${json.data.data}. Intenta nuevamente!` }],
        };
        return response;
      }
    })
    .catch((error) => {
      return errorHandler(error);
    });
}

export async function logout(auth_token) {
  return axios
    .get(`${config.api_url}/users/logout/`, {
      headers: {
        Authorization: `Token ${auth_token}`,
      },
    })
    .then((json) => {
      return { success: true, data: json.data };
    })
    .catch((error) => {
      return errorHandler(error);
    });
}
