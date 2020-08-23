import { addYearsCrud, editYearsCrud, deleteYearsCrud, getYears } from "../cruds/year_cruds";
import Alert from "react-s-alert";




export async function getYearService(token,subject_id){
    return await getYears(token,subject_id).then((result)=>{
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


export async function addYearsService(token, data, idCarrera) {
    return await addYearsCrud(token, data, idCarrera).then((result) => {
        if (result.success) {
            Alert.success("Año creado correctamente", {
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

export async function editYearsService(token, data) {
    return await editYearsCrud(token, data).then((result) => {
        if (result.success) {
            Alert.success("Año editado correctamente", {
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

export async function deleteYearsService(token, data) {
    return await deleteYearsCrud(token, data).then((result) => {
        if (result.success) {
            Alert.success("Año eliminado correctamente", {
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


