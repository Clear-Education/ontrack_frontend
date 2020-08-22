import TitlePage from "../../../src/components/commons/title_page/title_page";
import styles from './styles.module.scss'
import { useSelector } from "react-redux";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import config from "../../../src/utils/config";
import BackgroundLoader from "../../../src/components/commons/background_loader/background_loader";
import { getCursosService, addCursosService, editCursosService, deleteCursosService } from "../../../src/utils/cursos/services/cursos_services";
import Modal from "../../../src/components/commons/modals/generic_modal/modal";
import { IconButton } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';


const Cursos = () => {

    const url = `${config.api_url}/`
    const [selectedData, setSelectedData] = useState()
    const user = useSelector((store) => store.user);
    const [isLoading, setIsLoading] = useState(false)



/* 
    let { data } = useSWR(url, () => {
        setIsLoading(true);
        return getcursosService(user.user.token).then((result) => {
            setIsLoading(false)
            return result.result
        })
    }
    );
 */


    async function addcursos(e, data) {
        e.preventDefault();
        setIsLoading(true);
        return await addcursosService(user.user.token, data).then((result) => {
            setIsLoading(false);
            mutate(url);
            return result;
        })
    }

    async function editcursos(e, data) {
        e.preventDefault();
        setIsLoading(true);
        return await editcursosService(user.user.token, data).then((result) => {
            setIsLoading(false);
            mutate(url);
            return result;
        })
    }

    async function deletecursos(e, data) {
        e.preventDefault();
        setIsLoading(true);
        return await deletecursosService(user.user.token, data).then((result) => {
            setIsLoading(false);
            mutate(url);
            return result;
        })
    }


    return (
        <>
        {isLoading && <BackgroundLoader show={isLoading} />}
             <TitlePage title="cursos" />  


                <Modal
                title="Agregar cursos"
                body={ <AddIcon handleSubmitAction={addcursos}/>}
                button={
                    <IconButton>
                        <AddIcon />
                    </IconButton>
                }
                />

                <Modal
                    title="Editar cursos"
                    body={ <EditIcon handleSubmitAction={editcursos}/>}
                    button={
                        <IconButton onClick={() => setSelectedData()} >
                            <EditIcon />
                        </IconButton>
                    }
                />

                <Modal
                title="¿Seguro que deseas eliminar?"
                body={ <Delete handleSubmitAction={deletecursos}/>}
                button={
                    <IconButton onClick={() => setSelectedData()} >
                        <Delete />
                    </IconButton>
                }
                />
        </>                          
    )

}


export default Cursos;

