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
          id: action.payload.id,
          name: action.payload.name,
          last_name: action.payload.last_name,
          cargo: action.payload.cargo,
          token: action.payload.token,
          email: action.payload.email,
          legajo: action.payload.legajo,
          date_of_birth: action.payload.date_of_birth,
          phone: action.payload.phone,
          direccion: action.payload.direccion,
          provincia: action.payload.provincia,
          localidad: action.payload.localidad,
          picture: action.payload.picture,
          groups: action.payload.groups.name,
          institucion: action.payload.institucion.id,
          dni: action.payload.dni
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
