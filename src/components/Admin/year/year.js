import TitlePage from "../../commons/title_page/title_page";
import { Row, Col } from "react-bootstrap";
import styles from './year.module.css';
import { useSelector } from "react-redux";
import { getYears, newYear } from "../../../utils/crud_years";

import { useState } from "react";
import useSWR, { mutate } from "swr";
import config from "../../../utils/config";
import Alert from "react-s-alert";
import ModalAdd from "../../commons/modals/modal_add/modal_add";
import YearForm from "./forms/year_form";
import { IconButton } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import BackgroundLoader from "../../commons/background_loader/background_loader";
import CircularProgress from "@material-ui/core/CircularProgress";
const Year = (props) => {

    const url = `${config.api_url}/carrera/{carrera_id}/anio/list/`;
    const [addYearModal, setAddYearModal] = useState(false)
    const [editYeartModal, setEditYearModal] = useState(false)
    const [deleteYeartModal, setDeleteYearModal] = useState(false)
    const [selectedData, setSelectedData] = useState()
    const user = useSelector((store) => store.user);
    const [isLoading, setIsLoading] = useState(false);

    console.log(props.data);


    const handleAddYearModal = (value) => {
        setAddYearModal(value)
    }

    const handleEditYearModal = (value, data) => {
        setEditYearModal(value)
        setSelectedData(data);
    }

    async function handleSubmitNewYear(e, data) {
        e.preventDefault();
        return await newYear(user.user.token, data, props.data).then((result) => {
            mutate(url);
            if (result.success) {
                Alert.success("Año agregado correctamente", {
                    position: "bottom",
                    effect: "stackslide",
                });
            } else {
                result.result.forEach((element) => {
                    Alert.error(element.message, {
                        position: "bottom",
                        effect: "stackslide",
                    });
                });
            }
            return result;
        })
    }



    async function handleEditYear(e, data) {

    }


    let { data } = useSWR(url, () => {
        setIsLoading(true);
        return getYears(props.data, user.user.token).then((result) => {
            setIsLoading(false)
            if (result.success == true) {
                return result.result;
            } else {
                result.result.forEach((element) => {
                    Alert.error(element.message, {
                        position: "bottom",
                        effect: "stackslide",
                    });
                });
            }
        })
    }
    );

    return (
        <>
            <Row lg={12} md={12} sm={12} xs={12}>
                <Col lg={11} md={11} sm={11} xs={11} style={{ margin: 'auto' }}>
                    <TitlePage title="Años" />
                    <div className={styles.structure_container}>
                        {isLoading && <BackgroundLoader show={isLoading} />}
                        <Row lg={12} md={12} sm={12} xs={12} style={{ margin: 'auto' }}>
                            <Col lg={12} md={12} sm={12} xs={12} className={styles.structure_items_container}>
                                {data && !!data.length ? data.map((year, i) => {
                                    return (
                                        <Row lg={12} md={12} sm={12} xs={12} key={i}>
                                            <Col lg={12} md={12} sm={12} xs={12} className={styles.structure_item_container}>
                                                <Row lg={12} md={12} sm={12} xs={12} style={{ width: '100%' }} >

                                                    <Col lg={9} md={9} sm={9} xs={9} className={styles.detail_container}>
                                                        <div className={styles.color_item} style={{ backgroundColor: year.color }} />
                                                        <span className={styles.name_item}>{year.nombre.toUpperCase()}</span>
                                                        <span className={styles.action_container}></span>
                                                    </Col>

                                                    <Col lg={3} md={3} sm={3} xs={3} className={styles.actions_container}>

                                                        <IconButton onClick={() => handleDeleteDepartmentModal(true, year)} >
                                                            <Delete />
                                                        </IconButton>

                                                        <IconButton onClick={() => handleEditYearModal(true, year)}>
                                                            <EditIcon />
                                                        </IconButton>

                                                        <IconButton onClick={() => handleNextStep(year.id)}>
                                                            <ArrowForwardIosIcon />
                                                        </IconButton>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    )
                                })
                                    :
                                    <span className={styles.no_data_msg}>{!isLoading ? "No se han encontrado Años, ¡Creá uno!" : "Cargando..."}</span>
                                }
                            </Col>

                            <Col lg={12} md={12} sm={12} xs={12} id={styles.add_new_structure}>
                                <button
                                    className="ontrack_btn add_btn"
                                    onClick={() => handleAddYearModal(true)}>
                                    Nuevo Año
                                </button>
                                <button onClick={() => props.handleNextStep('subject')}>Materias</button>
                                {addYearModal &&
                                    <ModalAdd
                                        title="Nuevo Año"
                                        handleClose={handleAddYearModal}
                                        formComponent={
                                            <YearForm
                                                handleSubmitAction={handleSubmitNewYear}
                                                handleClose={handleAddYearModal}
                                            />

                                        }
                                    />
                                }
                                {editYeartModal &&
                                    <ModalAdd
                                        title="Editar Año"
                                        handleClose={handleEditYearModal}
                                        formComponent={
                                            <YearForm
                                                handleSubmitAction={handleEditYear}
                                                data={selectedData}
                                                handleClose={handleEditYearModal}
                                            />
                                        }
                                    />
                                }
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </>
    )

}


export default Year;