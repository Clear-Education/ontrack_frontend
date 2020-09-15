export const convertDate = (inputFormat) => {
    function pad(s) {
        return s < 10 ? "0" + s : s;
    }
    var d = new Date(inputFormat);
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join("/");
}

export const parseParticipants = (participants) => {
    let participantsData = [];
    participants.map((participant) => {
        let newParticipant = {
            usuario: participant.id,
            rol: participant.role
        }
        participantsData.push(newParticipant);
    })
    return participantsData;
}


export const parseTrackingData = (data) => {
    return {
        nombre:  data.nombre,
        descripcion: data.descripcion,
        fecha_cierre: convertDate(data.fecha_fin_seguimiento),
        alumnos: data.alumnos,
        materias: data.materias,
        integrantes: parseParticipants(data.integrantes),
        anio_lectivo: data.anio_lectivo
    }

}