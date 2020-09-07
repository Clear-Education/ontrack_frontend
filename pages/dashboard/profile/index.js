import { useDispatch, useSelector } from "react-redux";
import Modal from '../../../src/components/commons/modals/modal';
import UserProfileForm from '../../../src/components/Users/profile/profile_user_form';
import { useEffect, useState } from "react";
import { updateUser } from "../../../redux/actions/userActions";
import { editUserProfileService } from '../../../src/utils/user/service/user_services';


const UserProfile = () => {

    const user = useSelector((store) => store.user);
    const [profileData, setProfileData] = useState(user.user);
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch();


    useEffect(() => {
        let dataUser = {
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
            dispatch(updateUser(data)).then(
                (status) => {
                    if (status) {
                        console.log("ok")
                    }
                }
            );
            setIsLoading(false);
            return result;
        })
    }

    return (
        <div>
            <h1 className="mb-5">Perfil de Usuario</h1>
            {/* <Modal
                title="Edit Perfil de Usuario"
                show={false}
                button={
                    <button className="ontrack_btn add_btn">Nuevo Alumno</button>
                }
                body={<UserProfileForm handleSubmitAction={editUserProfile}
                    user={profileData} />}

            /> */}

            <UserProfileForm handleSubmitAction={editUserProfile}
                user={profileData}></UserProfileForm>

        </div>
    )
}

export default UserProfile;