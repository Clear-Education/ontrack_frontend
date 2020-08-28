import { getDepartmentCrud, addDepartmentCrud, editDepartmentCrud, deleteDepartmentCrud } from "../cruds/department_cruds";
import Alert from "react-s-alert";


export async function getDepartmentService(token) {
    return await getDepartmentCrud(token).then((result) => {
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

export async function addDepartmentService(data, token) {
    return await addDepartmentCrud(data, token).then((result) => {
        if (result.success) {
            Alert.success("Carrera creada correctamente", {
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

export async function editDepartmentService(data, token) {
    return await editDepartmentCrud(data, token).then((result) => {
        if (result.success) {
            Alert.success("Carrera editada correctamente", {
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


export async function deleteDepartmentService(token, data) {
    return await deleteDepartmentCrud(token, data).then((result) => {
        if (result.success) {
            Alert.success("Carrera eliminada correctamente", {
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
