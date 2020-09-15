import { getSolicitudesCrud, addSolicitudesCrud, editSolicitudesCrud, editEstadoSolicitudCrud, deleteSolicitudesCrud } from "../cruds/solicitudes_cruds";
import Alert from "react-s-alert";


export async function getSolicitudesService(token) {
    return await getSolicitudesCrud(token).then((result) => {
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

export async function addSolicitudesService(data, token) {
    return await addSolicitudesCrud(data, token).then((result) => {
        if (result.success) {
            Alert.success("Solicitud creada correctamente", {
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

export async function editSolicitudesService(data, token) {
    return await editSolicitudesCrud(data, token).then((result) => {
        if (result.success) {
            Alert.success("Solicitudes editado correctamente", {
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

export async function editEstadoSolicitudService(data, token) {
    return await editEstadoSolicitudCrud(data, token).then((result) => {
        if (result.success) {
            Alert.success("Estado de la solicitud editado correctamente", {
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


export async function deleteSolicitudesService(token, data) {
    return await deleteSolicitudesCrud(token, data).then((result) => {
        if (result.success) {
            Alert.success("Materia eliminada correctamente", {
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
