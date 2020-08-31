import TitlePage from "../../commons/title_page/title_page";
import { Row, Col } from "react-bootstrap";
import styles from './subject.module.css'
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
import config from "../../../utils/config";
import { IconButton } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import BackgroundLoader from "../../commons/background_loader/background_loader";
import { getSubjectsService, addSubjectsService, editSubjectsService, deleteSubjectsService } from "../../../utils/subject/services/subject_services";
import Modal from "../../commons/modals/modal";
import SubjectForm from "./forms/add_edit_form/subjectForm";
import DeleteForm from "../../commons/delete_form/deleteForm";
import GoBackButton from "../../commons/go_back_button/go_back_button";


const Subject = (props) => {

    const url = `${config.api_url}/anio/${props.data}/materia/list/`
    const [selectedData, setSelectedData] = useState();
    const [subjectData, setSubjectData] = useState();
    const user = useSelector((store) => store.user);
    const [isLoading, setIsLoading] = useState(true)


    const handleBackStep = () => {
        props.handleNextStep("year");
    }

    useSWR(url, () => {
        getSubjectsService(user.user.token, props.data).then((result) => {
            setIsLoading(false)
            setSubjectData(result.result)
        })
    })


    async function addSubject(e, data) {
        e.preventDefault();
        let parseData = { ...data, anio: props.data }
        setIsLoading(true);
        return await addSubjectsService(user.user.token, parseData).then((result) => {
            setIsLoading(false);
            mutate(url);
            return result;
        })
    }

    async function editSubject(e, data) {
        e.preventDefault();
        setIsLoading(true);
        return await editSubjectsService(user.user.token, data).then((result) => {
            setIsLoading(false);
            mutate(url);
            return result;
        })
    }

    async function deleteSubject(e, data) {
        e.preventDefault();
        setIsLoading(true);
        return await deleteSubjectsService(user.user.token, data).then((result) => {
            setIsLoading(false);
            mutate(url);
            return result;
        })
    }


    return (
        <>
            <Row lg={12} md={12} sm={12} xs={12}>
                <Col lg={11} md={11} sm={11} xs={11} style={{ margin: 'auto' }}>
                    <Row>
                        <Col>
                            <TitlePage title="Materias" />
                        </Col>
                        <Col className={styles.add_new_structure}>
                            <Modal
                                title="Nueva Materia"
                                body={<SubjectForm handleSubmitAction={addSubject} />}
                                button={
                                    <button className="ontrack_btn add_btn">
                                        Nueva Materia
                                        </button>
                                }
                            />
                        </Col>
                    </Row>
                    <div className={styles.structure_container}>
                        {isLoading && <BackgroundLoader show={isLoading} />}
                        <Row lg={12} md={12} sm={12} xs={12} style={{ margin: 'auto' }}>
                            <Col lg={12} md={12} sm={12} xs={12} className={styles.structure_items_container}>
                                {subjectData && !!subjectData.length ? subjectData.map((subject, i) => {
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
                                                            body={<DeleteForm data={selectedData} handleSubmitAction={deleteSubject} />}
                                                            button={
                                                                <IconButton onClick={() => setSelectedData(subject)} >
                                                                    <Delete />
                                                                </IconButton>
                                                            }
                                                        />
                                                        <Modal
                                                            title="Editar Materia"
                                                            body={<SubjectForm data={selectedData} handleSubmitAction={editSubject} showTable={true} />}
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

                        </Row>
                    </div>
                    <GoBackButton action={handleBackStep} />
                </Col>
            </Row>

        </>
    )

}


export default Subject;

