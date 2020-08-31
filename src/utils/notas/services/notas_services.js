import { getNotasCrud, getNotasCursoCrud, addNotasCrud, editNotasCrud, deleteNotasCrud } from "../cruds/notas_cruds";
import Alert from "react-s-alert";


export async function getNotasService(token) {
    return await getNotasCrud(token).then((result) => {
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

export async function getNotasCursoService(token, id_curso, id_evaluacion) {
    return await getNotasCursoCrud(token, id_curso, id_evaluacion).then((result) => {
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

export async function addNotasService(token, data) {
    return await addNotasCrud(token, data).then((result) => {
        if (result.success) {
            Alert.success("Calificación cargada correctamente", {
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

export async function editNotasService(token, data) {
    return await editNotasCrud(token, data).then((result) => {
        if (result.success) {
            Alert.success("Calificación modificada correctamente", {
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


export async function deleteNotasService(token, data) {
    return await deleteNotasCrud(token, data).then((result) => {
        if (result.success) {
            Alert.success("Calificación eliminada correctamente", {
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
