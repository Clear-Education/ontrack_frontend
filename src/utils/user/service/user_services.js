import { getUsersCrud, addUserCrud, deleteUserCrud, editUserCrud, editUserStateCrud, getGroupsCrud } from "../cruds/user_cruds";
import Alert from "react-s-alert";
import { useDispatch, useSelector } from "react-redux";

export async function getUserService(token) {
    return await getUsersCrud(token).then((result) => {
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

export async function addUserService(data, token) {
    return await addUserCrud(data, token).then((result) => {
        if (result.success) {
            Alert.success("Usuario creado correctamente", {
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

export async function editUserService(data, token) {
    return await editUserCrud(data, token).then((result) => {
        if (result.success) {
            Alert.success("Usuario editado correctamente", {
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

export async function editUserStateService(data, token) {
    return await editUserStateCrud(data, token).then((result) => {
        if (result.success) {
            Alert.success("Estado del usuario editado correctamente", {
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

export async function getGroupsService(token) {
    return await getGroupsCrud(token).then((result) => {
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
