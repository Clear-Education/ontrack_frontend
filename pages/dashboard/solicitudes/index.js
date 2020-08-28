import TitlePage from "../../../src/components/commons/title_page/title_page";
import styles from './styles.module.scss'
import { useSelector } from "react-redux";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import config from "../../../src/utils/config";
import BackgroundLoader from "../../../src/components/commons/background_loader/background_loader";
import { getSolicitudesService, addSolicitudesService } from "../../../src/utils/Solicitudes/services/Solicitudes_services";
import Modal from "../../../src/components/commons/modals/modal";
import { IconButton } from "@material-ui/core";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { motion } from "framer-motion";
import { Row, Col } from "react-bootstrap";
import MUIDataTable from "mui-datatables";
import MTConfig from "../../../src/utils/table_options/MT_config";


const Solicitudes = () => {

    const url = `${config.api_url}/`
    const [selectedData, setSelectedData] = useState()
    const user = useSelector((store) => store.user);
    const [isLoading, setIsLoading] = useState(false)



    /* 
        let { data } = useSWR(url, () => {
            setIsLoading(true);
            return getSolicitudesService(user.user.token).then((result) => {
                setIsLoading(false)
                return result.result
            })
        }
        );
     */


    async function addSolicitudes(e, data) {
        e.preventDefault();
        setIsLoading(true);
        return await addSolicitudesService(user.user.token, data).then((result) => {
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
                        <TitlePage title="Solicitudes" />
                    </Col>
                </Row>
                <Row lg={12} md={12} sm={12} xs={12} style={{ margin: '5%' }}>
                    <Col
                        md={12}
                        sm={12}
                        xs={12}
                    >
                        <MUIDataTable
                            title={"Solicitudes"}
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
                                    name: "nombre",
                                    label: "Nombre",
                                },
                                {
                                    name: "descripcion",
                                    label: "Descripción",
                                },
                                {
                                    name: "encargado",
                                    label: "Encargado",
                                },
                                {
                                    name: "estado",
                                    label: "Estado",
                                },
                                {
                                    name: "actions",
                                    label: "Acciones",
                                    options: {
                                        customBodyRender: (value, tableMeta, updateValue) => {
                                            return (
                                                <>
                                                    <IconButton onClick={() => setSelectedData(tableMeta.rowData[0])} >
                                                        <ArrowForwardIosIcon />
                                                    </IconButton>
                                                </>
                                            )
                                        },
                                    },
                                }
                            ]}
                        />
                    </Col>
                    {
                        user.user.groups === 2 &&

                        <Col className={styles.add_btn_container}>
                            <Modal
                                title="Nueva Solicitud"
                                body={<button className="ontrack_btn add_btn">Enviar</button>}
                                button={
                                    <button className="ontrack_btn add_btn">Nueva Solicitud</button>
                                }
                            />
                        </Col>
                    }
                </Row>


            </motion.div>
        </>
    )

}


export default Solicitudes;



