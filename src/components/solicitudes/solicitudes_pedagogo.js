import TitlePage from "../../../src/components/commons/title_page/title_page";
import styles from './styles.module.css'
import { useSelector } from "react-redux";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import config from "../../utils/Config"
import BackgroundLoader from "../commons/background_loader/background_loader";
import { getSolicitudesService, editEstadoSolicitudService } from "../../../src/utils/Solicitudes/services/Solicitudes_services";
import { motion } from "framer-motion";
import { Row, Col } from "react-bootstrap";
import MUIDataTable from "mui-datatables";
import MTConfig from "../../../src/utils/table_options/MT_config";


const SolicitudesPedagogo = () => {

    const url = `${config.api_url}/seguimientos/solicitudes/list/`;
    const [selectedData, setSelectedData] = useState([])
    const user = useSelector((store) => store.user);
    const [isLoading, setIsLoading] = useState(false)


    useSWR(url, () => {
        setIsLoading(true);
        return getSolicitudesService(user.user.token).then((result) => {
            setIsLoading(false)
            let trackings = [...result.result.results];
            let parsedTrackings = [];
            trackings.filter(trackings => trackings.estado[(trackings.estado.length - 1)].estado_solicitud == "Pendiente")
                .map((tracking) => {
                    let newTrackingData = {
                        id: tracking.id,
                        motivo_solicitud: tracking.motivo_solicitud,
                        alumnos: tracking.alumnos.map(alumno => alumno.alumno.nombre + " " + alumno.alumno.apellido),
                        creador: tracking.creador.name + " " + tracking.creador.last_name,
                        fecha_creacion: new Date(tracking.fecha_creacion).toLocaleDateString(),
                        estado: tracking.estado[0].estado_solicitud
                    }
                    parsedTrackings.push(newTrackingData);
                })
            setSelectedData(parsedTrackings);
        })
    }
    );


    async function editEstadoSolicitud(id, estado) {
        const data = {
            id,
            estado
        }
        setIsLoading(true);
        return await editEstadoSolicitudService(data, user.user.token).then((result) => {
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
                                    name: "fecha_creacion",
                                    label: "Fecha Solicitud",
                                },
                                {
                                    name: "motivo_solicitud",
                                    label: "Motivo",
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
                                    name: "creador",
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
                                        customBodyRender: (value, tableMeta, updateValue) => {
                                            return (
                                                <div className=" d-flex flex-lg-row flex-column">
                                                    <button className="ontrack_btn add_btn mr-2 mb-lg-0 mb-2" variant="contained" onClick={() => editEstadoSolicitud(tableMeta.rowData[0], "Aceptada") /* aceptarSolicitud(selectedData[dataIndex]) */} >
                                                        Aceptar
                                                    </button>
                                                    <button className="ontrack_btn delete_btn" variant="contained" onClick={() => editEstadoSolicitud(tableMeta.rowData[0], "Rechazada")} >
                                                        Rechazar
                                                    </button>
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