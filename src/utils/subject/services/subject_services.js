import { getSubjectsCrud, addSubjectsCrud, deleteSubjectsCrud, editSubjectsCrud } from "../cruds/subject_cruds";
import Alert from "react-s-alert";


export async function getSubjectsService(token,year_id){
    return await getSubjectsCrud(token,year_id).then((result)=>{
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

export async function addSubjectsService(token,data){
  return await addSubjectsCrud(token,data).then((result)=>{
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


export async function editSubjectsService(token,data){
  return await editSubjectsCrud(token,data).then((result)=>{
      if (result.success) {
        Alert.success("Materia editada correctamente", {
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

export async function deleteSubjectsService(token,data){
  return await deleteSubjectsCrud(token,data).then((result)=>{
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