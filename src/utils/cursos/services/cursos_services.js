import { getCursosCrud, addCursosCrud,editCursosCrud, deleteCursosCrud } from "../cruds/cursos_cruds";
import Alert from "react-s-alert";


export async function getCursosService(token) {
    return await getCursosCrud(token).then((result) => {
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

export async function addCursosService(data, token) {
    return await addCursosCrud(data, token).then((result) => {
        if (result.success) {
            Alert.success("Cursos creado correctamente", {
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

export async function editCursosService(data, token) {
    return await editCursosCrud(data, token).then((result) => {
        if (result.success) {
            Alert.success("Cursos editado correctamente", {
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


export async function deleteCursosService(token,data){
  return await deleteCursosCrud(token,data).then((result)=>{
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
