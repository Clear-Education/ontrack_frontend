import { getStudentsCrud, 
         addStudentCrud, 
         deleteStudentCrud, 
         editStudentCrud, 
         getStudentsCourseCrud, 
         addMultipleStudentsCourseCrud, 
         deleteMultipleStudentsCourseCrud, 
         getStudentCrud } from "../cruds/student_cruds";
         
import Alert from "react-s-alert";


export async function getStudentsService(token,_schoolYearId){
    return await getStudentsCrud(token,_schoolYearId).then((result)=>{
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


export async function getStudentService(token,student_id){
  return await getStudentCrud(token,student_id).then((result)=>{
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

export async function getStudentsCourseService(token,course_id,schoolYearId){
  return await getStudentsCourseCrud(token,course_id,schoolYearId).then((result)=>{
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


export async function addStudentService(token,data){
    const parseStudentData = [data]
  return await addStudentCrud(token,parseStudentData).then((result)=>{
      if (result.success) {
        Alert.success("Alumno agregado correctamente", {
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



export async function addMultipleStudentsCourseService(token,data){

  return await addMultipleStudentsCourseCrud(token,data).then((result)=>{
      if (result.success) {
        Alert.success("Alumnos agregados correctamente", {
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

export async function editStudentService(token,data){
  let parseStudentData = {};
  Object.keys(data).map((key)=>{
    if(data[key] === null || data[key] === '32/12/1969'){
      delete data[key]
    }else{
      parseStudentData[key] = data[key];
    }
  })
  return await editStudentCrud(token,parseStudentData).then((result)=>{
      if (result.success) {
        Alert.success("Alumno editado correctamente", {
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

export async function deleteStudentService(token,data){
  return await deleteStudentCrud(token,data).then((result)=>{
      if (result.success) {
        Alert.success("Alumno eliminado correctamente", {
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


export async function deleteMultipleStudentsCourseService(token,data){

  return await deleteMultipleStudentsCourseCrud(token,data).then((result)=>{
      if (result.success) {
        Alert.success("Alumnos eliminados correctamente", {
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
