import { getDepartments, newDepartment, deleteDepartment, editDepartment } from "../cruds/department_cruds";
import Alert from "react-s-alert";


export async function getDepartmentService(token){
    return await getDepartments(token).then((result)=>{
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

export async function addDepartmentService(token,data){
  return await newDepartment(token,data).then((result)=>{
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


export async function editDepartmentService(token,data){
  return await editDepartment(token,data).then((result)=>{
      if (result.success) {
        Alert.success("Carrera editado correctamente", {
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

export async function deleteDepartmentService(token,data){
  return await deleteDepartment(token,data).then((result)=>{
      if (result.success) {
        Alert.success("Carrera eliminado correctamente", {
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