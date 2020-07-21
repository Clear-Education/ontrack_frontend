// Axios
import axios from "axios";
import Config from "./config";
import { loadState } from "../../redux/immutableState";
import errorHandler from "./Errorhandler";

export function checkAuth() {
  const state = loadState();
  return state;
}

export async function login(user, password) {
  var formData = new FormData();
  formData.append("email", user);
  formData.append("password", password);

  return axios
    .post(`${Config.api_url}/user/login/`, formData)
    .then((json) => {
      if (json.data.success) {
        const {
          name,
          surname,
          id,
          role,
          auth_token,
          cellphone,
          email,
        } = json.data.data;
        let userData = {
          name,
          surname,
          id,
          auth_token,
          role,
          cellphone,
          email,
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
