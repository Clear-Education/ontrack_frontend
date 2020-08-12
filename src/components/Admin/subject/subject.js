import TitlePage from "../../commons/title_page/title_page";
import { Row, Col } from "react-bootstrap";
import styles from './subject.module.css'
import { useSelector } from "react-redux";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import config from "../../../utils/config";
import { IconButton } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import BackgroundLoader from "../../commons/background_loader/background_loader";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getSubjectsService } from "../../../utils/subject/services/subject_services";
import Modal from "../../commons/modals/generic_modal/modal";

const Subject = (props) => {

    const year_url = `${config.api_url}/anio/{anio_id}/materia/list/`
    const subject_url = `${config.api_url}/materia`
    const [selectedData, setSelectedData] = useState()
    const user = useSelector((store) => store.user);
    const [isLoading, setIsLoading] = useState(false)


    let { data } = useSWR(subject_url, () => {
        setIsLoading(true);
        return getSubjectsService(user.user.token, null).then((result) => {
            setIsLoading(false)
        })
    }
    );


    return (
        <>
            <Row lg={12} md={12} sm={12} xs={12}>
                <Col lg={11} md={11} sm={11} xs={11} style={{ margin: 'auto' }}>
                  <TitlePage title="Materias" />
                    <div className={styles.structure_container}>
                        {isLoading && <BackgroundLoader show={isLoading} />}
                        <Row lg={12} md={12} sm={12} xs={12} style={{ margin: 'auto' }}>
                            <Col lg={12} md={12} sm={12} xs={12} className={styles.structure_items_container}>
                                {data && !!data.length ? data.map((subject, i) => {
                                    return (
                                        <Row lg={12} md={12} sm={12} xs={12} key={i}>
                                            <Col lg={12} md={12} sm={12} xs={12} className={styles.structure_item_container}>
                                                <Row lg={12} md={12} sm={12} xs={12} style={{ width: '100%' }} >

                                                    <Col lg={9} md={9} sm={9} xs={9} className={styles.detail_container}>
                                                        <div className={styles.color_item} style={{ backgroundColor: subject.color }} />
                                                        <span className={styles.name_item}>{subject.nombre.toUpperCase()}</span>
                                                        <span className={styles.action_container}></span>
                                                    </Col>

                                                    <Col lg={3} md={3} sm={3} xs={3} className={styles.actions_container}>
                                                        <Modal
                                                            title="¿Seguro que deseas eliminar esta materia?"
                                                            form=""
                                                            button={
                                                                <IconButton onClick={() => setSelectedData(subject)} >
                                                                    <Delete />
                                                                </IconButton>
                                                            }
                                                        />
                                                        <Modal
                                                            title="Editar Materia"
                                                            form=""
                                                            button={
                                                                <IconButton onClick={() => setSelectedData(subject)} >
                                                                    <EditIcon />
                                                                </IconButton>
                                                            }
                                                        />

                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    )
                                })
                                    :
                                    <span className={styles.no_data_msg}>{!isLoading ? "No se han encontrado materias, ¡Creá una!" : "Cargando..."}</span>
                                }
                            </Col>

                            <Col lg={12} md={12} sm={12} xs={12} id={styles.add_new_structure}>
                                <Modal
                                    title="Nueva Materia"
                                    form=""
                                    button={
                                        <button className="ontrack_btn add_btn">
                                            Nueva Materia
                                        </button>
                                    }
                                />
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>

        </>
    )

}


export default Subject;

