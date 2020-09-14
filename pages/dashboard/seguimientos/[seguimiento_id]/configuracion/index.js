import styles from './styles.module.scss';
import { Row, Col } from "react-bootstrap";
import TitlePage from '../../../../../src/components/commons/title_page/title_page';
import SubMenu from '../../../../../src/components/commons/sub_menu/sub_menu';
import { useEffect, useState } from 'react';
import { getTrackingService } from '../../../../../src/utils/tracking/services/tracking_services';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import ConfigTable from '../../../../../src/components/configuration/config_table/config_table';
import { IconButton, Collapse, Switch } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DateFilter from '../../../../../src/components/tracking/view/date_filter/date_filter';
import EighthStepGoals from '../../../../../src/components/tracking/8_step_goals/eighth_step_goals';
import { getTrackingGoalsService } from '../../../../../src/utils/goals/services/goals_services';
const Configuracion = () => {

    const router = useRouter();
    const user = useSelector((store) => store.user);
    const [trackingId, setTrackingId] = useState();
    const [goalsData, setGoalsData] = useState();
    const [trackingData, setTrackingData] = useState();
    const [trackingStatus,setTrackingStatus] = useState(null);
    const [firstSection, setFirstSection] = useState(false);
    const [secondSection, setSecondSection] = useState(false);
    const [thirdSection, setThirdSection] = useState(false);

    const STUDENTS_DATA = trackingData && trackingData.alumnos.map((student) => { return student.alumno });

    useEffect(() => {
        let params = Object.values(router.query);
        let id = params[0];
        setTrackingId(id);
    }, [router.query]);

    useEffect(() => {
        if (trackingId) {
            getTrackingService(user.user.token, trackingId).then((result) => {
                setTrackingData(result.result);
                setTrackingStatus(result.result.en_progreso)
            })
            getTrackingGoalsService(user.user.token, trackingId).then((result) => {
                console.log(result);
            })
        }
    }, [trackingId])


    const handleChange = () =>{
       setTrackingStatus(!trackingStatus);
    }
    return (
        <Row lg={12} md={12} sm={12} xs={12} style={{ marginLeft: '5%' }}>
            <Row lg={12} md={12} sm={12} xs={12} className={styles.header_container}>
                <>
                    <TitlePage title={`Configuración del seguimiento ${trackingData && trackingData.nombre}`} />
                    <Col lg={12} md={12} sm={12} xs={12} className="left" style={{ paddingLeft: '20px' }}>
                        <span>{trackingData && trackingData.descripcion}</span>
                    </Col>
                </>
            </Row>
            <div className={styles.sub_menu_container}>
                <SubMenu />
            </div>
            <Col lg={10} md={10} sm={10} xs={10} >
                <Row lg={12} md={12} sm={12} xs={12} className={styles.container}>

                    {/* SECCIÓN 1 */}

                    {<div className={styles.collapse_container} onClick={() => setFirstSection(!firstSection)}>Alumnos y Materias {firstSection ? <ExpandLessIcon /> : <ExpandMoreIcon />}</div>}
                    <Collapse in={firstSection} timeout="auto" unmountOnExit style={{ width: '100%' }}>
                        <Col lg={12} md={12} sm={12} xs={12} className={styles.table_container}>
                            <ConfigTable data={STUDENTS_DATA} tableName={"Alumnos"} />
                        </Col>
                        <Col lg={12} md={12} sm={12} xs={12} className={styles.table_container}>
                            <ConfigTable data={STUDENTS_DATA} tableName={"Materias"} />
                        </Col>
                    </Collapse>
                    {/* SECCIÓN DOS */}
                    {<div className={styles.collapse_container} onClick={() => setSecondSection(!secondSection)}>Participantes y Plazos {secondSection ? <ExpandLessIcon /> : <ExpandMoreIcon />}</div>}

                    <Collapse in={secondSection} timeout="auto" unmountOnExit style={{ width: '100%' }}>
                        <Col lg={12} md={12} sm={12} xs={12} className={styles.table_container}>
                            <ConfigTable data={STUDENTS_DATA} tableName={"Participantes"} />
                        </Col>
                        <Col lg={12} md={12} sm={12} xs={12} className={`${styles.table_container} ${styles.dates_container}`}>
                            <span className={styles.dates_label}>Plazos</span>
                            <DateFilter readOnly start={trackingData && trackingData.fecha_inicio} end={trackingData && trackingData.fecha_cierre} />
                        </Col>
                    </Collapse>

                    {/* SECCIÓN TRES */}
                    {<div className={styles.collapse_container} onClick={() => setThirdSection(!thirdSection)}>Metas, Objetivos y Estado del seguimiento {thirdSection ? <ExpandLessIcon /> : <ExpandMoreIcon />}</div>}
                    <Collapse in={thirdSection} timeout="auto" unmountOnExit style={{ width: '100%' }}>
                        <Col lg={12} md={12} sm={12} xs={12}  className={`${styles.table_container} ${styles.dates_container}`}>
                            <span className={styles.dates_label}>{!trackingStatus ? 'Finalizar Seguimiento': 'Seguimiento Finalizado'}</span>
                            <Switch
                                checked={trackingStatus}
                                onChange={handleChange}
                                color="primary"
                                name="checkedB"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                        </Col>
                        <Col lg={12} md={12} sm={12} xs={12} className={styles.table_container}>
                            <EighthStepGoals />
                        </Col>

                    </Collapse>
                </Row>
            </Col>

        </Row>

    )
}

export default Configuracion;