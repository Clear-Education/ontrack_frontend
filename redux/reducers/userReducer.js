import * as types from "../types";


var initialState;
initialState = {
  user: {},
  isLoggedIn: false,
  isLoading: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      return { 
        ...state,
        user: action.payload,
        isLoggedIn: true,
        isLoading: false,
      };
    case types.LOGOUT:
      return { ...state, user: {}, isLoggedIn: false, isLoading: false };
    case types.LOADING_USER:
      return { ...state, isLoading: true };
    case types.NO_LOADING_USER:
      return { ...state, isLoading: false };
    case types.UPDATE_USER:
      return {
        ...state,
        user: {
          name: action.payload.name,
          surname: action.payload.surname,
          id: action.payload.id,
          role: action.payload.role,
          auth_token: state.user.auth_token,
          cellphone: action.payload.cellphone,
          email: action.payload.email,
        },
        isLoggedIn: true,
        isLoading: false,
      };
    case types.UPDATE_PASSWORD:
      return {
        ...state,
        user: {
          name: action.payload.name,
          surname: action.payload.surname,
          id: action.payload.id,
          role: action.payload.role,
          auth_token: action.payload.auth_token,
          cellphone: action.payload.cellphone,
          email: action.payload.email,
        },
        isLoggedIn: true,
        isLoading: false,
      };
    case types.RESET_PASSWORD:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
        isLoading: false,
      };
    case types.FORCED_LOGOUT:
      return { ...state, user: {}, isLoggedIn: false, isLoading: false };

    default:
      return state;
  }
};

export default userReducer;
