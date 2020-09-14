import TitlePage from "../../../src/components/commons/title_page/title_page";
import styles from './styles.module.css'
import { useSelector } from "react-redux";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import config from "../../utils/Config"
import BackgroundLoader from "../commons/background_loader/background_loader";
import { getSolicitudesService, addSolicitudesService } from "../../../src/utils/Solicitudes/services/Solicitudes_services";
import { motion } from "framer-motion";
import { Row, Col } from "react-bootstrap";
import MUIDataTable from "mui-datatables";
import MTConfig from "../../../src/utils/table_options/MT_config";
import Modal from '../../../src/components/commons/modals/modal';
import RechazarSolicitudForm from "./forms/rechazar_solicitud_form";


const INITIAL_DATA = [{
    nombre: "Seguimiento Francisco Perez y Juan Rodriguez",
    descripcion: "Seguimiento para francisco Perez",
    fecha: "20/10/2020",
    alumnos: ["Francisco Perez", "Juan Rodriguez"],
    estado: "Pendiente",
    docente: "John Doe"
}]

const SolicitudesPedagogo = () => {

    const url = `${config.api_url}/`
    const [selectedData, setSelectedData] = useState(INITIAL_DATA)
    const user = useSelector((store) => store.user);
    const [isLoading, setIsLoading] = useState(false)

    console.log(selectedData);

    async function aceptarSolicitud(data) {
        setIsLoading(true);
        return await aceptarSolicitudService(user.user.token, data).then((result) => {
            setIsLoading(false);
            mutate(url);
            return result;
        })
    }

    async function rechazarSolicitud(data) {
        setIsLoading(true);
        return await rechazarSolicitudService(user.user.token, data).then((result) => {
            setIsLoading(false);
            mutate(url);
            return result;
        })
    }



    return (
        <>
            {isLoading && <BackgroundLoader show={isLoading} />}
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <Row lg={12} md={12} sm={12} xs={12} style={{ margin: 0 }}>
                    <Col lg={12} md={12} sm={12} xs={12} style={{ padding: 0 }}>
                        <TitlePage title="Solicitudes de Seguimiento" />
                    </Col>
                </Row>
                <Row lg={12} md={12} sm={12} xs={12} style={{ margin: '5%' }}>
                    <Col
                        md={12}
                        sm={12}
                        xs={12}
                    >
                        <MUIDataTable
                            title={"Solicitudes Pendientes"}
                            data={selectedData}
                            options={MTConfig("Solicitudes").options}
                            components={MTConfig().components}
                            localization={MTConfig().localization}
                            columns={[

                                {
                                    name: "id",
                                    label: "Id",
                                    options: {
                                        display: false
                                    },

                                },
                                {
                                    name: "fecha",
                                    label: "Fecha",
                                },
                                {
                                    name: "descripcion",
                                    label: "Descripción",
                                },
                                {
                                    name: "alumnos",
                                    label: "Alumnos",
                                    options: {
                                        customBodyRender: (value, tableMeta, updateValue) => (
                                            <div>{value.join(",")}</div>
                                        )
                                    }
                                },
                                {
                                    name: "docente",
                                    label: "Docente",
                                },
                                {
                                    name: "estado",
                                    label: "Estado"
                                },
                                {
                                    name: "actions",
                                    label: "Acciones",
                                    options: {
                                        customBodyRender: (dataIndex) => {
                                            return (
                                                <div className=" d-flex flex-lg-row flex-column">
                                                    <button className="ontrack_btn add_btn mr-2 mb-lg-0 mb-2" variant="contained" onClick={() => aceptarSolicitud(dataIndex)} >
                                                        Aceptar
                                                    </button>
                                                    <Modal
                                                        title="Rechazar Solicitud"
                                                        body={<RechazarSolicitudForm data={selectedData} handleSubmitAction={rechazarSolicitud} />}
                                                        button={
                                                            <button className="ontrack_btn delete_btn" variant="contained" onClick={() => setSelectedData(INITIAL_DATA)} >
                                                                Rechazar
                                                            </button>
                                                        }
                                                    />

                                                </div>
                                            )
                                        },
                                    },
                                }
                            ]}
                        />
                    </Col>
                </Row>


            </motion.div>
        </>
    )
}

export default SolicitudesPedagogo