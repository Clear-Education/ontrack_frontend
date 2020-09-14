import TitlePage from "../../../src/components/commons/title_page/title_page";
import styles from './styles.module.scss'
import { useSelector } from "react-redux";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import config from "../../../src/utils/config";
import BackgroundLoader from "../../../src/components/commons/background_loader/background_loader";
import { getSolicitudesService, addSolicitudesService } from "../../../src/utils/Solicitudes/services/Solicitudes_services";
import Modal from "../../../src/components/commons/modals/modal";
import { IconButton, Link } from "@material-ui/core";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { motion } from "framer-motion";
import { Row, Col } from "react-bootstrap";
import MUIDataTable from "mui-datatables";
import MTConfig from "../../../src/utils/table_options/MT_config";
import SolicitudesDocente from "../../../src/components/solicitudes/solicitudes_docente";
import SolicitudesPedagogo from "../../../src/components/solicitudes/solicitudes_pedagogo";


const Solicitudes = () => {

    const url = `${config.api_url}/`
    const [selectedData, setSelectedData] = useState()
    const user = useSelector((store) => store.user);


    return (
        <>
            {
                user.user.groups == "Docente" ? <SolicitudesDocente /> : <SolicitudesPedagogo />
            }
        </>
    )

}


export default Solicitudes;



