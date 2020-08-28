import TitlePage from "../../../src/components/commons/title_page/title_page";
import styles from './styles.module.scss'
import { useSelector } from "react-redux";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import config from "../../../src/utils/config";
import BackgroundLoader from "../../../src/components/commons/background_loader/background_loader";
import { getAsistenciasService, addAsistenciasService, editAsistenciasService, deleteAsistenciasService } from "../../../src/utils/asistencias/services/asistencias_services";
import Modal from "../../../src/components/commons/modals/modal";
import { IconButton } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';


const Asistencias = () => {

    const url = `${config.api_url}/`
    const [selectedData, setSelectedData] = useState()
    const user = useSelector((store) => store.user);
    const [isLoading, setIsLoading] = useState(false)



/* 
    let { data } = useSWR(url, () => {
        setIsLoading(true);
        return getasistenciasService(user.user.token).then((result) => {
            setIsLoading(false)
            return result.result
        })
    }
    );
 */


    async function addasistencias(e, data) {
        e.preventDefault();
        setIsLoading(true);
        return await addasistenciasService(user.user.token, data).then((result) => {
            setIsLoading(false);
            mutate(url);
            return result;
        })
    }

    async function editasistencias(e, data) {
        e.preventDefault();
        setIsLoading(true);
        return await editasistenciasService(user.user.token, data).then((result) => {
            setIsLoading(false);
            mutate(url);
            return result;
        })
    }

    async function deleteasistencias(e, data) {
        e.preventDefault();
        setIsLoading(true);
        return await deleteasistenciasService(user.user.token, data).then((result) => {
            setIsLoading(false);
            mutate(url);
            return result;
        })
    }


    return (
        <>
        {isLoading && <BackgroundLoader show={isLoading} />}
             <TitlePage title="asistencias" />  


                <Modal
                title="Agregar asistencias"
                body={ <AddIcon handleSubmitAction={addasistencias}/>}
                button={
                    <IconButton>
                        <AddIcon />
                    </IconButton>
                }
                />

                <Modal
                    title="Editar asistencias"
                    body={ <EditIcon handleSubmitAction={editasistencias}/>}
                    button={
                        <IconButton onClick={() => setSelectedData()} >
                            <EditIcon />
                        </IconButton>
                    }
                />

                <Modal
                title="¿Seguro que deseas eliminar?"
                body={ <Delete handleSubmitAction={deleteasistencias}/>}
                button={
                    <IconButton onClick={() => setSelectedData()} >
                        <Delete />
                    </IconButton>
                }
                />
        </>                          
    )

}


export default Asistencias;

