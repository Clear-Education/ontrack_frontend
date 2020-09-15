import * as types from "../types";


let initialTrackingState = {
    current_step: 0,
    motivo_solicitud: '',
    department: '',
    year: '',
    curso: '',
    anio_lectivo: '',
    alumnos: [],
}


const trackingSolicitudReducer = (state = initialTrackingState, action) => {
    switch (action.type) {
        case types.SAVE_TRACKING_SOLICITUD_DATA:
            return {
                ...state,
                current_step: action.payload.current_step,
                motivo_solicitud: action.payload.motivo_solicitud,
                department: action.payload.department,
                anio_lectivo: action.payload.anio_lectivo,
                year: action.payload.year,
                curso: action.payload.curso,
                alumnos: action.payload.alumnos,
            }
        case types.RESET_TRACKING_SOLICITUD_DATA:
            return initialTrackingState;
        default:
            return state;
    }
};

export default trackingSolicitudReducer;