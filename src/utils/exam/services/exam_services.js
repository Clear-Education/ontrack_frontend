import { getExamsCrud, addExamsCrud, deleteExamsCrud, editExamsCrud } from "../cruds/exam_cruds";
import Alert from "react-s-alert";


export async function getExamsService(token,subject_id){
    return await getExamsCrud(token,subject_id).then((result)=>{
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

export async function addExamsService(token,data){
  return await addExamsCrud(token,data).then((result)=>{
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


export async function editExamsService(token,data){
  return await editExamsCrud(token,data).then((result)=>{
      if (result.success) {
        Alert.success("Exámen editado correctamente", {
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

export async function deleteExamsService(token,data){
  return await deleteExamsCrud(token,data).then((result)=>{
      if (result.success) {
        Alert.success("Exámen eliminado correctamente", {
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