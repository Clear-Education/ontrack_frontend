import { addYearsCrud, editYearsCrud, deleteYearsCrud } from "../cruds/year_cruds";
import Alert from "react-s-alert";

export async function addYearsService(token, data, idCarrera) {
    return await addYearsCrud(token, data, idCarrera).then((result) => {
        if (result.success) {
            Alert.success("Año creado correctamente", {
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

export async function editYearsService(token, data) {
    return await editYearsCrud(token, data).then((result) => {
        if (result.success) {
            Alert.success("Año editado correctamente", {
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

export async function deleteYearsService(token, data) {
    return await deleteYearsCrud(token, data).then((result) => {
        if (result.success) {
            Alert.success("Año eliminado correctamente", {
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


