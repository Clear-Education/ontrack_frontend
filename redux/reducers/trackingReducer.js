import * as types from "../types";


var initialTrackingState = {
    current_step: 0,
    nombre: '',
    descripcion: '',
    department: '',
    year:'',
    curso: '',
    anio_lectivo: '',
    alumnos: [],
    materias: [],
    integrantes: [],
    fecha_desde: '',
    fecha_hasta: '',
    goals: [],
};


const trackingReducer = (state = initialTrackingState, action) => {
    switch (action.type) {
        case types.SAVE_TRACKING_DATA:
            return {
                ...state,
                current_step: action.payload.current_step,
                nombre: action.payload.nombre,
                descripcion: action.payload.descripcion,
                department: action.payload.department,
                anio_lectivo: action.payload.anio_lectivo,
                year: action.payload.year,
                curso: action.payload.curso,
                alumnos: action.payload.alumnos,
                materias: action.payload.materias,
                integrantes: action.payload.integrantes,
                fecha_desde: action.payload.fecha_desde,
                fecha_hasta: action.payload.fecha_hasta,
                goals: action.payload.goals,
                
            }
        case types.RESET_TRACKING_DATA:
            return initialTrackingState;
        default:
            return state;
    }
};

export default trackingReducer;