import { addCoursesCrud, editCoursesCrud, deleteCoursesCrud, getCourses } from "../cruds/course_cruds";
import Alert from "react-s-alert";




export async function getCourseService(token,year_id){
    return await getCourses(token,year_id).then((result)=>{
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



export async function addCoursesService(token, data) {
    return await addCoursesCrud(token, data).then((result) => {
        if (result.success) {
            Alert.success("Curso creado correctamente", {
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

export async function editCoursesService(token, data) {
    return await editCoursesCrud(token, data).then((result) => {
        if (result.success) {
            Alert.success("Curso editado correctamente", {
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

export async function deleteCoursesService(token, data) {
    return await deleteCoursesCrud(token, data).then((result) => {
        if (result.success) {
            Alert.success("Curso eliminado correctamente", {
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
