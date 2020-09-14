import { getUserCrud, getUsersCrud, addUserCrud, editUserCrud, editUserProfile, changeUserPassword, editUserStateCrud, getGroupsCrud } from "../cruds/user_cruds";
import Alert from "react-s-alert";

export async function getOneUserService(token, id_user) {
    return await getUserCrud(token, id_user).then((result) => {
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

export async function getUserService(token) {
    return await getUsersCrud(token).then((result) => {
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

export async function addUserService(data, token) {
    return await addUserCrud(data, token).then((result) => {
        if (result.success) {
            Alert.success("Usuario creado correctamente", {
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

export async function editUserService(data, token) {
    return await editUserCrud(data, token).then((result) => {
        if (result.success) {
            Alert.success("Usuario editado correctamente", {
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

export async function editUserProfileService(data, token) {
    return await editUserProfile(data, token).then((result) => {
        if (result.success) {
            Alert.success("Perfil de usuario editado correctamente", {
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

export async function changeUserPasswordService(data, token) {
    return await changeUserPassword(data, token).then((result) => {
        if (result.success) {
            Alert.success("Contraseña modificada, vuelva a loguearse con sus nuevas credenciales por favor", {
                effect: "stackslide",
            });

        } else {
            Alert.error("La contraseña ingresada es incorrecta!")
        }
        return result;
    })
}


export async function editUserStateService(data, token) {
    return await editUserStateCrud(data, token).then((result) => {
        if (result.success) {
            Alert.success("Estado del usuario editado correctamente", {
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

export async function getGroupsService(token) {
    return await getGroupsCrud(token).then((result) => {
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
