import { KeyboardDatePicker } from "@material-ui/pickers";
import { motion } from "framer-motion";
import FormLabel from '@material-ui/core/FormLabel';
import { Row, Col } from "react-bootstrap";
import styles from '../tracking.module.scss'

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const INITIAL_STATE = {
    fecha_desde: '',
    fecha_hasta: ''
}

const SeventhStepDates = ({ handleGlobalState }) => {

    const [state, setState] = useState(INITIAL_STATE);
    const trackingData = useSelector((store) => store.tracking);


    useEffect(() => {
        setState({
            ...state,
            fecha_desde: trackingData.fecha_desde,
            fecha_hasta: trackingData.fecha_hasta
        })
    }, [])


    const handleStartDate = (date) => {
        setState({ ...state, ["fecha_desde"]: date });
        handleGlobalState("fecha_desde", date);
    }

    const handleEndDate = (date) => {

        setState({ ...state, ["fecha_hasta"]: date });
        handleGlobalState("fecha_hasta", date);
    }



    return (
        <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <div className={styles.container}>
                <Row>
                    <Col lg={12} md={12} sm={12} xs={12} className={`${styles.input_container}  ${styles.name_container}`}>
                        <Row lg={12} md={12} sm={12} xs={12} className={styles.row_input_container}>
                            <Col lg={12} md={12} sm={12} xs={12} className={styles.input_container}>
                                <FormLabel className="left" component="legend">Inicio del seguimiento</FormLabel>
                                <KeyboardDatePicker
                                    clearable
                                    value={state.fecha_desde}
                                    placeholder="DD/MM/YYYY"
                                    onChange={date => handleStartDate(date)}
                                    format="dd/MM/yyyy"
                                    invalidDateMessage="Formato de fecha inválido"
                                    required
                                />
                            </Col>
                        </Row>
                        <Row lg={12} md={12} sm={12} xs={12} className={styles.row_input_container}>
                            <Col lg={12} md={12} sm={12} xs={12} className={styles.input_container}>
                                <FormLabel className="left" component="legend">Fin del seguimiento</FormLabel>
                                <KeyboardDatePicker
                                    clearable
                                    placeholder="DD/MM/YYYY"
                                    value={state.fecha_hasta}
                                    onChange={date => handleEndDate(date)}
                                    format="dd/MM/yyyy"
                                    minDate={state.fecha_desde}
                                    invalidDateMessage="Formato de fecha inválido"
                                    required
                                />
                            </Col>
                        </Row>

                    </Col>
                </Row>
            </div>
        </motion.div>
    )
}


export default SeventhStepDates;