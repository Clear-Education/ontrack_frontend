import TitlePage from "../../../src/components/commons/title_page/title_page";
import styles from './styles.module.scss'
import { useSelector } from "react-redux";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import config from "../../../src/utils/config";
import BackgroundLoader from "../../../src/components/commons/background_loader/background_loader";
import { getDepartmentService, addDepartmentService, editDepartmentService, deleteDepartmentService } from "../../../src/utils/department/services/department_services";
import Modal from "../../../src/components/commons/modals/modal";
import { IconButton } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';


const Department = () => {

    const url = `${config.api_url}/`
    const [selectedData, setSelectedData] = useState()
    const user = useSelector((store) => store.user);
    const [isLoading, setIsLoading] = useState(false)



/* 
    let { data } = useSWR(url, () => {
        setIsLoading(true);
        return getdepartmentService(user.user.token).then((result) => {
            setIsLoading(false)
            return result.result
        })
    }
    );
 */


    async function adddepartment(e, data) {
        e.preventDefault();
        setIsLoading(true);
        return await adddepartmentService(user.user.token, data).then((result) => {
            setIsLoading(false);
            mutate(url);
            return result;
        })
    }

    async function editdepartment(e, data) {
        e.preventDefault();
        setIsLoading(true);
        return await editdepartmentService(user.user.token, data).then((result) => {
            setIsLoading(false);
            mutate(url);
            return result;
        })
    }

    async function deletedepartment(e, data) {
        e.preventDefault();
        setIsLoading(true);
        return await deletedepartmentService(user.user.token, data).then((result) => {
            setIsLoading(false);
            mutate(url);
            return result;
        })
    }


    return (
        <>
        {isLoading && <BackgroundLoader show={isLoading} />}
             <TitlePage title="department" />  


                <Modal
                title="Agregar department"
                body={ <AddIcon handleSubmitAction={adddepartment}/>}
                button={
                    <IconButton>
                        <AddIcon />
                    </IconButton>
                }
                />

                <Modal
                    title="Editar department"
                    body={ <EditIcon handleSubmitAction={editdepartment}/>}
                    button={
                        <IconButton onClick={() => setSelectedData()} >
                            <EditIcon />
                        </IconButton>
                    }
                />

                <Modal
                title="¿Seguro que deseas eliminar?"
                body={ <Delete handleSubmitAction={deletedepartment}/>}
                button={
                    <IconButton onClick={() => setSelectedData()} >
                        <Delete />
                    </IconButton>
                }
                />
        </>                          
    )

}


export default Department;

