// Axios
import axios from "axios";
import Config from "./config";
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
    .post(`${Config.api_url}/users/login/`, formData)
    .then((json) => {
      console.log(json)
      if (json.status == 200) {
     const {
          name,
          last_name,
          cargo,
          token,
          phone,
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
    .get(`${Config.api_url}/user/logout/`, {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    })
    .then((json) => {
      if (json.data.success) {
        return { success: true, data: json.data.data };
      } else {
        return {
          success: false,
          unauthorized: false,
          result: [{ message: `${json.data.data}. Intenta nuevamente!` }],
        };
      }
    })
    .catch((error) => {
      return errorHandler(error);
    });
}
