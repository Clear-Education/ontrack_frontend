import { getSeguimientosCrud, addSeguimientosCrud,editSeguimientosCrud, deleteSeguimientosCrud } from "../cruds/Seguimientos_cruds";
import Alert from "react-s-alert";


export async function getSeguimientosService(token) {
    return await getSeguimientosCrud(token).then((result) => {
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

export async function addSeguimientosService(data, token) {
    return await addSeguimientosCrud(data, token).then((result) => {
        if (result.success) {
            Alert.success("Seguimientos creado correctamente", {
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

export async function editSeguimientosService(data, token) {
    return await editSeguimientosCrud(data, token).then((result) => {
        if (result.success) {
            Alert.success("Seguimientos editado correctamente", {
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


export async function deleteSeguimientosService(token,data){
  return await deleteSeguimientosCrud(token,data).then((result)=>{
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
