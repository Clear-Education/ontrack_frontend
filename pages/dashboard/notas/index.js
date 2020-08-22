import TitlePage from "../../../src/components/commons/title_page/title_page";
import styles from './styles.module.scss'
import { useSelector } from "react-redux";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import config from "../../../src/utils/config";
import BackgroundLoader from "../../../src/components/commons/background_loader/background_loader";
import { getNotasService, addNotasService, editNotasService, deleteNotasService } from "../../../src/utils/notas/services/notas_services";
import Modal from "../../../src/components/commons/modals/generic_modal/modal";
import { IconButton } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';


const Notas = () => {

    const url = `${config.api_url}/`
    const [selectedData, setSelectedData] = useState()
    const user = useSelector((store) => store.user);
    const [isLoading, setIsLoading] = useState(false)



/* 
    let { data } = useSWR(url, () => {
        setIsLoading(true);
        return getnotasService(user.user.token).then((result) => {
            setIsLoading(false)
            return result.result
        })
    }
    );
 */


    async function addnotas(e, data) {
        e.preventDefault();
        setIsLoading(true);
        return await addnotasService(user.user.token, data).then((result) => {
            setIsLoading(false);
            mutate(url);
            return result;
        })
    }

    async function editnotas(e, data) {
        e.preventDefault();
        setIsLoading(true);
        return await editnotasService(user.user.token, data).then((result) => {
            setIsLoading(false);
            mutate(url);
            return result;
        })
    }

    async function deletenotas(e, data) {
        e.preventDefault();
        setIsLoading(true);
        return await deletenotasService(user.user.token, data).then((result) => {
            setIsLoading(false);
            mutate(url);
            return result;
        })
    }


    return (
        <>
        {isLoading && <BackgroundLoader show={isLoading} />}
             <TitlePage title="notas" />  


                <Modal
                title="Agregar notas"
                body={ <AddIcon handleSubmitAction={addnotas}/>}
                button={
                    <IconButton>
                        <AddIcon />
                    </IconButton>
                }
                />

                <Modal
                    title="Editar notas"
                    body={ <EditIcon handleSubmitAction={editnotas}/>}
                    button={
                        <IconButton onClick={() => setSelectedData()} >
                            <EditIcon />
                        </IconButton>
                    }
                />

                <Modal
                title="¿Seguro que deseas eliminar?"
                body={ <Delete handleSubmitAction={deletenotas}/>}
                button={
                    <IconButton onClick={() => setSelectedData()} >
                        <Delete />
                    </IconButton>
                }
                />
        </>                          
    )

}


export default Notas;

