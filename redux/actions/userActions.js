// Import Componentes
import * as types from "../types";
import { login, logout } from "../../src/utils/Auth";
//import { resetPassword } from "../../utils/auth";
//import { editUser, changePassword } from "../../utils/user_crud";

// Import Dependencias
import Alert from "react-s-alert";

// export const register = (data) => async (dispatch) => {
//   dispatch({ type: types.LOADING_USER });
//   return Auth.register(data).then((result) => {
//     if (result.success) {
//       return dispatch({ type: types.NO_LOADING_USER });
//     } else {
//       dispatch({ type: types.NO_LOADING_USER });
//       result.result.forEach((element) => {
//         Alert.error(element.message, {
//           position: "bottom",
//           effect: "stackslide",
//         });
//       });
//       return false;
//     }
//   });
// };

export const loginAction = (username, password) => {
  return async (dispatch) => {
    dispatch({ type: types.LOADING_USER });
    return login(username, password).then((result) => {
      if (result.isLoggedIn) {
        return dispatch({ type: types.LOGIN, payload: result.user });
      } else {
        dispatch({ type: types.NO_LOADING_USER });
        result.result.forEach((element) => {
          Alert.error(element.message,
            {
              position: "bottom", 
              effect: "stackslide",
              html: true,
            } 
          );
        });
        return false;
      }
    });
  };
};

export const logoutAction = (auth_token) => async (dispatch) => {
  dispatch({ type: types.LOADING_USER });
  return logout(auth_token).then((result) => {
    if (result.success) {
      return dispatch({ type: types.LOGOUT });
    } else {
      dispatch({ type: types.NO_LOADING_USER });
      if (result.unauthorized) {
        return "unauthorized";
      } else {
        result.result.forEach((element) => {
          Alert.error(element.message, {
            position: "bottom",
            effect: "stackslide",
          });
        });
        return false;
      }
    }
  });
};

// export const updateUser = (user, auth_token) => async (dispatch) => {
//   dispatch({ type: types.LOADING_USER });
//   return editUser(user, auth_token).then((result) => {
//     if (result.success) {
//       dispatch({ type: types.UPDATE_USER, payload: result.result });
//       return true;
//     } else {
//       dispatch({ type: types.NO_LOADING_USER });
//       if (result.unauthorized) {
//         return "unauthorized";
//       } else {
//         result.result.forEach((element) => {
//           Alert.error(element.message, {
//             position: "bottom",
//             effect: "stackslide",
//           });
//         });
//         return false;
//       }
//     }
//   });
// };

// export const updatePassword = (data, auth_token) => async (dispatch) => {
//   dispatch({ type: types.LOADING_USER });
//   return changePassword(data, auth_token).then((result) => {
//     if (result.success) {
//       dispatch({ type: types.UPDATE_PASSWORD, payload: result.result });
//       return true;
//     } else {
//       dispatch({ type: types.NO_LOADING_USER });
//       if (result.unauthorized) {
//         return "unauthorized";
//       } else {
//         result.result.forEach((element) => {
//           Alert.error(element.message, {
//             position: "bottom",
//             effect: "stackslide",
//           });
//         });
//         return false;
//       }
//     }
//   });
// };

// export const resetUserPassword = (data) => async (dispatch) => {
//   return resetPassword(data).then((result) => {
//     if (result.isLoggedIn) {
//       dispatch({ type: types.RESET_PASSWORD, payload: result.user });
//       return true;
//     } else {
//       if (result.unauthorized) {
//         return "unauthorized";
//       } else {
//         result.result.forEach((element) => {
//           Alert.error(element.message, {
//             position: "bottom",
//             effect: "stackslide",
//           });
//         });
//         return false;
//       }
//     }
//   });
// };

export const forcedLogout = () => async (dispatch) => {
  return dispatch({ type: types.LOGOUT });
};
