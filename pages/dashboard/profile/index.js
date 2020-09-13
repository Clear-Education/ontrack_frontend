import { useDispatch, useSelector } from "react-redux";
import Modal from '../../../src/components/commons/modals/modal';
import UserProfileForm from '../../../src/components/Users/profile/profile_user_form';
import { useEffect, useState } from "react";
import { updateUser } from "../../../redux/actions/userActions";
import { getOneUserService, editUserProfileService, changeUserPasswordService } from '../../../src/utils/user/service/user_services';


const UserProfile = () => {

    const user = useSelector((store) => store.user);
    const [profileData, setProfileData] = useState(user.user);
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch();


    useEffect(() => {
        let dataUser = {
            id: user.user.id,
            email: user.user.email,
            name: user.user.name,
            phone: user.user.phone,
            dni: user.user.dni,
            last_name: user.user.last_name,
            cargo: user.user.cargo,
            legajo: user.user.legajo,
            date_of_birth: user.user.date_of_birth,
            direccion: user.user.direccion,
            localidad: user.user.localidad,
            provincia: user.user.provincia
        }

        setProfileData(dataUser)

    }, [])


    async function editUserProfile(e, data) {
        e.preventDefault();
        setIsLoading(true);
        return await editUserProfileService(data, user.user.token).then((result) => {
            if (result.success) {
                getOneUserService(user.user.token, profileData.id).then((result) => {
                    let data_user = { ...result.result, "token": user.user.token, "id": user.user.id }
                    dispatch(updateUser(data_user)).then(
                        (status) => {
                            if (status) {
                            }
                        }
                    );
                    setIsLoading(false);
                    return result;
                })

            }

        })
    }

    async function changeUserPassword(e, data) {
        e.preventDefault();
        setIsLoading(true);
        return await changeUserPasswordService(data, user.user.token).then(result => {
            setIsLoading(false);
            return result;
        })

    }

    return (
        <div>
            <h1 className="mb-5">Perfil de Usuario</h1>
            <UserProfileForm
                handleSubmitAction={editUserProfile}
                handleChangePassword={changeUserPassword}
                user={profileData}></UserProfileForm>

        </div>
    )
}

export default UserProfile;