import TitlePage from "../../../src/components/commons/title_page/title_page";
import styles from './styles.module.css'
import { useSelector } from "react-redux";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import config from "../../utils/Config"
import BackgroundLoader from "../commons/background_loader/background_loader";
import { getSolicitudesService, addSolicitudesService } from "../../../src/utils/Solicitudes/services/Solicitudes_services";
import { IconButton, Link } from "@material-ui/core";
import VisibilityIcon from '@material-ui/icons/Visibility';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { motion } from "framer-motion";
import { Row, Col } from "react-bootstrap";
import MUIDataTable from "mui-datatables";
import MTConfig from "../../../src/utils/table_options/MT_config";

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';


const SolicitudesDocente = () => {


    const url = `${config.api_url}/seguimientos/solicitudes/list/`;
    const [selectedData, setSelectedData] = useState([]);
    const user = useSelector((store) => store.user);
    const [isLoading, setIsLoading] = useState(false)


    let { data } = useSWR(url, () => {
        setIsLoading(true);
        return getSolicitudesService(user.user.token).then((result) => {
            setIsLoading(false)
            let trackings = [...result.result.results];
            let parsedTrackings = [];
            trackings.map((tracking) => {
                let newTrackingData = {
                    motivo_solicitud: tracking.motivo_solicitud,
                    alumnos: tracking.alumnos.map(alumno => alumno.alumno.nombre + " " + alumno.alumno.apellido),
                    fecha_creacion: new Date(tracking.fecha_creacion).toLocaleDateString(),
                    estado: tracking.estado[tracking.estado.length - 1].estado_solicitud
                }
                parsedTrackings.push(newTrackingData);
            })
            setSelectedData(parsedTrackings);
        })
    }
    );

    async function addSolicitudes(e, data) {
        e.preventDefault();
        setIsLoading(true);
        return await addSolicitudesService(user.user.token, data).then((result) => {
            setIsLoading(false);
            mutate(url);
            return result;
        })
    }

    const getMuiTheme = () => createMuiTheme({
        overrides: {
            MuiTableCell: {
                root: {
                    '@media (max-width:959.95px)': {
                        borderBottom: "none",
                    },
                }
            },
            MUIDataTableBodyCell: {
                stackedCommon: {
                    '@media (max-width:959.95px)': {
                        whiteSpace: "normal",
                        height: "100%",
                        paddingLeft: "5px",
                        display: "inherit"
                    },
                },
                cellHide: {
                    fontWeight: "bold",
                    paddingTop: "15px",
                }
            },
            MuiTableRow: {
                root: {
                    borderBottom: "1px solid rgba(224, 224, 224, 1)",
                }
            }
        }
    });


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
                        <TitlePage title="Solicitudes" />
                    </Col>
                </Row>
                <Row lg={12} md={12} sm={12} xs={12} style={{ margin: '5%' }}>
                    <Col
                        md={12}
                        sm={12}
                        xs={12}
                    >
                        <MuiThemeProvider theme={getMuiTheme()}>
                            <MUIDataTable
                                title={"Solicitudes"}
                                data={selectedData}
                                options={MTConfig("Solicitudes").options}
                                components={MTConfig().components}
                                localization={MTConfig().localization}
                                columns={[
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
                                        name: "estado",
                                        label: "Estado",
                                    },
                                    /*  {
                                         name: "actions",
                                         label: "Acciones",
                                         options: {
                                             customBodyRender: (value, tableMeta, updateValue) => {
                                                 return (
                                                     <>
                                                         <IconButton onClick={() => setSelectedData(tableMeta.rowData[0])} >
                                                             <VisibilityIcon />
                                                         </IconButton>
                                                     </>
                                                 )
                                             },
                                         },
                                     } */
                                ]}
                            />
                        </MuiThemeProvider>

                    </Col>
                    <Col className={styles.add_btn_container}>
                        <Link href="solicitudes/nueva">
                            <button className="ontrack_btn add_btn">Nueva Solicitud</button>
                        </Link>
                    </Col>
                </Row>


            </motion.div>
        </>
    )

}


export default SolicitudesDocente;