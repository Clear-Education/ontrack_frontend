import * as types from "../types";


var initialTrackingState = {
    current_step: 0,
    nombre: '',
    descripcion: '',
    anio_lectivo: '',
    alumnos: [],
    materias: [],
    integrantes: [],
    dates: {
        from: '',
        to: ''
    },
    goals: []
};


const trackingReducer = (state = initialTrackingState, action) => {
    switch (action.type) {
        case types.SAVE_TRACKING_DATA:
            return {
                ...state,
                current_step: action.payload.current_step,
                nombre: action.payload.nombre,
                descripcion: action.payload.descripcion,
                alumnos: action.payload.alumnos,
                materias: action.payload.materias,
                integrantes: action.payload.integrantes,
                dates: {
                    from: action.payload.dates.from,
                    to: action.payload.dates.to,
                },
                goals: action.payload.goals,
            }
        case types.RESET_TRACKING_DATA:
            return initialTrackingState;
        default:
            return state;
    }
};

export default trackingReducer;