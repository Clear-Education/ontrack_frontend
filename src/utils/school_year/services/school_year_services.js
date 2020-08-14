import { getSchoolYearCrud, addSchoolYearCrud, deleteSchoolYearCrud, editSchoolYearCrud } from "../cruds/school_year_cruds";
import Alert from "react-s-alert";


export async function getSchoolYearService(token){
    return await getSchoolYearCrud(token).then((result)=>{
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

export async function addSchoolYearService(token,data){
  return await addSchoolYearCrud(token,data).then((result)=>{
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


export async function editSchoolYearService(token,data){
  return await editSchoolYearCrud(token,data).then((result)=>{
      if (result.success) {
        Alert.success("Año lectivo editado correctamente", {
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

export async function deleteSchoolYearService(token,data){
  return await deleteSchoolYearCrud(token,data).then((result)=>{
      if (result.success) {
        Alert.success("Año lectivo eliminado correctamente", {
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