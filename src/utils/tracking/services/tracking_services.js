import { getTrackingCrud, addTrackingCrud, editTrackingCrud, deleteTrackingCrud, getTrackingRolesCrud } from "../cruds/tracking_cruds";
import Alert from "react-s-alert";
import { convertDate, parseParticipants, parseTrackingData } from "./tracking_functions_services";
import { addMultipleGoalsService } from "../../goals/services/goals_services";


export async function getTrackingService(token,_id) {
    return await getTrackingCrud(token,_id).then((result) => {
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

export async function getTrackingRolesService(token) {
    return await getTrackingRolesCrud(token).then((result) => {
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


export async function addTrackingService(data, token) {
    const TRACKING_DATA = parseTrackingData(data);
    return await addTrackingCrud(TRACKING_DATA, token).then((result) => {
        if (result.success) {
            const DATA = {...data,seguimiento: result.result.id}
            return addMultipleGoalsService(DATA,token).then((result)=>{
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

export async function editTrackingService(data, token) {
    return await editTrackingCrud(data, token).then((result) => {
        if (result.success) {
            Alert.success("Tracking editado correctamente", {
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


export async function deleteTrackingService(token, data) {
    return await deleteTrackingCrud(token, data).then((result) => {
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


