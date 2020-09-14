
export const parseGoals = (data, goalTypes) => {
    const PROMEDIO_TYPE = goalTypes.find((type) => type.nombre === 'promedio')
    const ASISTENCIA_TYPE = goalTypes.find((type) => type.nombre === 'asistencia')
    const CUALITATIVO_TYPE = goalTypes.find((type) => type.nombre === 'cualitativo')
    let goals = [];
    if (data.promedio) {
        let promedioGoal = {
            valor_objetivo_cuantitativo: data.promedio,
            tipo_objetivo: PROMEDIO_TYPE.id
        }
        goals.push(promedioGoal);
    }
    if (data.asistencia) {
        let asistenciaGoal = {
            valor_objetivo_cuantitativo: data.asistencia,
            tipo_objetivo: ASISTENCIA_TYPE.id
        }
        goals.push(asistenciaGoal);
    }
    if (data.cualitativos) {
        const C_GOALS = data.cualitativos;
        C_GOALS.map((goal) => {
            let cualitative_goal = {
                descripcion: goal,
                tipo_objetivo: CUALITATIVO_TYPE.id
            }
            goals.push(cualitative_goal);
        })
    }
    return goals;
}


export const parseGoalsData = (data, goalTypes) => {

    return {
        seguimiento: data.seguimiento,
        objetivos: parseGoals(data, goalTypes)
    }

}