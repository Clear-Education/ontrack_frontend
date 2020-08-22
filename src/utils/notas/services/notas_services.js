import { getNotasCrud, addNotasCrud,editNotasCrud, deleteNotasCrud } from "../cruds/notas_cruds";
import Alert from "react-s-alert";


export async function getNotasService(token) {
    return await getNotasCrud(token).then((result) => {
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

export async function addNotasService(data, token) {
    return await addNotasCrud(data, token).then((result) => {
        if (result.success) {
            Alert.success("Notas creado correctamente", {
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

export async function editNotasService(data, token) {
    return await editNotasCrud(data, token).then((result) => {
        if (result.success) {
            Alert.success("Notas editado correctamente", {
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


export async function deleteNotasService(token,data){
  return await deleteNotasCrud(token,data).then((result)=>{
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
