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
    const parseStudentData = [{
        nombre: data.name,
        apellido: data.last_name,
        dni: data.dni,
        email: data.email,
        legajo: data.legajo,
        fecha_nacimiento: data.fecha_nacimiento,
        fecha_inscripcion: data.fecha_inscripcion,
        direccion: data.direccion,
        localidad: data.localidad,
        provincia: data.provincia,
        instutucion: data.institucion,
       }]
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
  const parseStudentData ={
    id: data.id,
    nombre: data.name,
    apellido: data.last_name,
    dni: data.dni,
    email: data.email,
    legajo: data.legajo,
    fecha_nacimiento: data.fecha_nacimiento,
    fecha_inscripcion: data.fecha_inscripcion,
    direccion: data.direccion,
    localidad: data.localidad,
    provincia: data.provincia,
    instutucion: data.institucion,
   }
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
