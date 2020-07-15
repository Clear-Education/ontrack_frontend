import React from 'react'

// Import Componentes
import * as types from "../types";

// Import Dependencias
import Alert from "react-s-alert";
import { Link } from "@material-ui/core";

export const register = (data) => async (dispatch) => {

};

export function login(username, password) {

}

export const logout = (auth_token) => async (dispatch) => {

};

export const updateUser = (user, auth_token) => async (dispatch) => {

};

export const updatePassword = (data, auth_token) => async (dispatch) => {

};

export const resetUserPassword = (data) => async (dispatch) => {
 
};

export const forcedLogout = () => async (dispatch) => {
  return dispatch({ type: types.FORCED_LOGOUT });
};
