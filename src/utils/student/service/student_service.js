import { getStudentCrud, addStudentCrud, deleteStudentCrud, editStudentCrud, addStudentCourseCrud,getStudentCourseCrud } from "../cruds/student_cruds";
import Alert from "react-s-alert";


export async function getStudentCourseService(token,student_id){
    return await getStudentCourseCrud(token,student_id).then((result)=>{
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

export async function getStudentService(token){
    return await getStudentCrud(token).then((result)=>{
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
          const parseStudentCourseData = {
            alumno: result.result[parseStudentData[0].dni],
            curso: data.curso,
            anio_lectivo: data.school_year
           }
          return addStudentCourseService(token,parseStudentCourseData).then((result)=>{
            return result;
          });
        } else {
          result.result.forEach((element) => {
            Alert.error(element.message, {
              effect: "stackslide",
            });
          });
          return result;
        }
  })
}



export async function addStudentCourseService(token,data){

  return await addStudentCourseCrud(token,data).then((result)=>{
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