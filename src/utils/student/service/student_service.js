import { getStudentCrud, addStudentCrud, deleteStudentCrud, editStudentCrud, addStudentCourseCrud } from "../cruds/student_cruds";
import Alert from "react-s-alert";


export async function getStudentService(token){
    return await getStudentCrud(token).then((result)=>{
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
          const parseStudentCourseData = {
            alumno: result.result,
            curso: data.curso,
            anio_lectivo: data.school_year
           }
          addStudentCourseService(token,parseStudentCourseData);
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



export async function addStudentCourseService(token,data){

  return await addStudentCourseCrud(token,data).then((result)=>{
      if (result.success) {
        Alert.success("Alumno agregado correctamente", {
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

export async function editStudentService(token,data){
  return await editStudentCrud(token,data).then((result)=>{
      if (result.success) {
        Alert.success("Alumno editado correctamente", {
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

export async function deleteStudentService(token,data){
  return await deleteStudentCrud(token,data).then((result)=>{
      if (result.success) {
        Alert.success("Alumno eliminado correctamente", {
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