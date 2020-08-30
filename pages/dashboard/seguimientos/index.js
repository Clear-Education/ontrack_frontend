import TitlePage from "../../../src/components/commons/title_page/title_page";
import styles from './styles.module.scss'
import { useSelector } from "react-redux";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import config from "../../../src/utils/config";
import BackgroundLoader from "../../../src/components/commons/background_loader/background_loader";
import { getSeguimientosService, addSeguimientosService } from "../../../src/utils/Seguimientos/services/Seguimientos_services";
import Modal from "../../../src/components/commons/modals/modal";
import { IconButton, Link } from "@material-ui/core";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { motion } from "framer-motion";
import { Row, Col } from "react-bootstrap";
import MUIDataTable from "mui-datatables";
import MTConfig from "../../../src/utils/table_options/MT_config";


const Seguimientos = () => {

    const url = `${config.api_url}/`
    const [selectedData, setSelectedData] = useState()
    const user = useSelector((store) => store.user);
    const [isLoading, setIsLoading] = useState(false)



    /* 
        let { data } = useSWR(url, () => {
            setIsLoading(true);
            return getSeguimientosService(user.user.token).then((result) => {
                setIsLoading(false)
                return result.result
            })
        }
        );
     */


    async function addSeguimientos(e, data) {
        e.preventDefault();
        setIsLoading(true);
        return await addSeguimientosService(user.user.token, data).then((result) => {
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
                <Row lg={12} md={12} sm={12} xs={12} style={{ margin: '0 5% 0 5%' }}>
                    <Row lg={12} md={12} sm={12} xs={12} style={{ width: '100%' }}>
                        <Col lg={6} md={6} sm={6} xs={6}>
                            <TitlePage title="Seguimientos" />
                        </Col>
                        <Col lg={6} md={6} sm={6} xs={6} className={styles.add_btn_container}>
                            {
                                user.user.groups === "Pedagogía" ?
                                <Link href="seguimientos/nuevo">
                                  <button className="ontrack_btn add_btn">Nuevo Seguimiento</button>
                                </Link>
                                    : null
                            }
                        </Col>
                    </Row>
                    <Col
                        md={12}
                        sm={12}
                        xs={12}
                        style={{ marginTop: 20 }}
                    >
                        <MUIDataTable
                            data={selectedData}
                            options={MTConfig("Seguimientos").options}
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
                </Row>


            </motion.div>
        </>
    )

}


export default Seguimientos;



