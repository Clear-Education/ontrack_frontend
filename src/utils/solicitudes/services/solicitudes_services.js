import { getSolicitudesCrud, addSolicitudesCrud,editSolicitudesCrud, deleteSolicitudesCrud } from "../cruds/Solicitudes_cruds";
import Alert from "react-s-alert";


export async function getSolicitudesService(token) {
    return await getSolicitudesCrud(token).then((result) => {
        if (result.success) {

        } else {
            result.result.forEach((element) => {
                Alert.error(element.message, {
                    position: "bottom",
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
            Alert.success("Solicitudes creado correctamente", {
                position: "bottom",
                effect: "stackslide",
            });
        } else {
            result.result.forEach((element) => {
                Alert.error(element.message, {
                    position: "bottom",
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
                position: "bottom",
                effect: "stackslide",
            });
        } else {
            result.result.forEach((element) => {
                Alert.error(element.message, {
                    position: "bottom",
                    effect: "stackslide",
                });
            });
        }
        return result;
    })
}


export async function deleteSolicitudesService(token,data){
  return await deleteSolicitudesCrud(token,data).then((result)=>{
      if (result.success) {
        Alert.success("Materia eliminada correctamente", {
          position: "bottom",
          effect: "stackslide",
        });
        } else {
          result.result.forEach((element) => {
            Alert.error(element.message, {
              position: "bottom",
              effect: "stackslide",
            });
          });
        }
        return result;
  })
}