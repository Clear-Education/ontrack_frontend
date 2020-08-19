import TitlePage from "../../commons/title_page/title_page";
import { Row, Col } from "react-bootstrap";
import styles from './year.module.css';
import { useSelector } from "react-redux";
import { getYears } from "../../../utils/crud_years";

import { useState } from "react";
import useSWR, { mutate } from "swr";
import config from "../../../utils/config";
import Alert from "react-s-alert";
import YearForm from "./forms/year_form";
import { IconButton } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import BackgroundLoader from "../../commons/background_loader/background_loader";
import CircularProgress from "@material-ui/core/CircularProgress";
import Modal from "../../commons/modals/generic_modal/modal";
import { addYearsService, editYearsService, deleteYearsService } from "../../../utils/year/services/year_services";
import DeleteForm from "../../commons/delete_form/deleteForm";
import GoBackButton from "../../commons/go_back_button/go_back_button";


const Year = (props) => {

    const url = `${config.api_url}/carrera/${props.data}/anio/list/`;
    const [selectedData, setSelectedData] = useState()
    const user = useSelector((store) => store.user);
    const [isLoading, setIsLoading] = useState(false);


    const handleNextStep = (year_id) => {
        props.handleNextStep("subject", year_id);
    }

    const handleBackStep = () => {
        props.handleNextStep("department");
    }

    async function addYear(e, data) {
        e.preventDefault();
        return await addYearsService(user.user.token, data, props.data).then((result) => {
            setIsLoading(false);
            mutate(url);
            return result;
        })
    }

    async function editYear(e, data) {
        e.preventDefault();
        setIsLoading(true);
        return await editYearsService(user.user.token, data).then((result) => {
            setIsLoading(false);
            mutate(url);
            return result;
        })
    }

    async function deleteYear(e, data) {
        e.preventDefault();
        setIsLoading(true);
        return await deleteYearsService(user.user.token, data).then((result) => {
            setIsLoading(false);
            mutate(url);
            return result;
        })
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
                    <GoBackButton action={handleBackStep}/>
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
                                                        <Modal
                                                            title="¿Seguro que deseas eliminar este año?"
                                                            body={<DeleteForm data={selectedData} handleSubmitAction={deleteYear} />}
                                                            button={
                                                                <IconButton onClick={() => setSelectedData(year)} >
                                                                    <Delete />
                                                                </IconButton>
                                                            }
                                                        />

                                                        <Modal
                                                            title="Editar Año"
                                                            body={<YearForm
                                                                data={selectedData}
                                                                handleSubmitAction={editYear}
                                                                addModal={false}
                                                            />}
                                                            button={
                                                                <IconButton onClick={() => setSelectedData(year)} >
                                                                    <EditIcon />
                                                                </IconButton>
                                                            }
                                                        />
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
                                <Modal
                                    title="Nuevo Año"
                                    body={<YearForm
                                        handleSubmitAction={addYear}
                                        addModal={true} />}
                                    button={
                                        <button className="ontrack_btn add_btn">
                                            Nuevo Año
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


export default Year;