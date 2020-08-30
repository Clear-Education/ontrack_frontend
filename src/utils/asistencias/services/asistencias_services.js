import { getAsistenciasCrud, addAsistenciasCrud, editAsistenciasCrud, deleteAsistenciasCrud } from "../cruds/asistencias_cruds";
import Alert from "react-s-alert";


export async function getAsistenciasService(token, curso_id, fecha_desde) {
    return await getAsistenciasCrud(token, curso_id, fecha_desde).then((result) => {
        if (result.success) {

        } else {
            result.result.forEach((element) => {
                Alert.error(element.message, {
                    effect: "stackslide",
                });
            });
        }
        return result;
    })
}

export async function addAsistenciasService(data, token) {
    return await addAsistenciasCrud(data, token).then((result) => {
        if (result.success) {
            Alert.success("Asistencia creada correctamente", {
                effect: "stackslide",
            });
        } else {
            result.result.forEach((element) => {
                Alert.error(element.message, {
                    effect: "stackslide",
                });
            });
        }
        return result;
    })
}

export async function editAsistenciasService(token, data) {
    return await editAsistenciasCrud(token, data).then((result) => {
        if (result.success) {
            Alert.success("Asistencias editado correctamente", {
                effect: "stackslide",
            });
        } else {
            result.result.forEach((element) => {
                Alert.error(element.message, {
                    effect: "stackslide",
                });
            });
        }
        return result;
    })
}


export async function deleteAsistenciasService(token, data) {
    return await deleteAsistenciasCrud(token, data).then((result) => {
        if (result.success) {
            Alert.success("Asistencia eliminada correctamente", {
                effect: "stackslide",
            });
        } else {
            result.result.forEach((element) => {
                Alert.error(element.message, {
                    effect: "stackslide",
                });
            });
        }
        return result;
    })
}
