import { KeyboardDatePicker } from "@material-ui/pickers";
import { motion } from "framer-motion";
import FormLabel from '@material-ui/core/FormLabel';
import { Row, Col } from "react-bootstrap";
import styles from '../tracking.module.scss'

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const INITIAL_STATE = {
    fecha_desde: null,
    fecha_hasta: null
}

const SeventhStepDates = ({ handleGlobalState }) => {

    const [minDate, setMinDate] = useState("")
    const [maxDate, setMaxDate] = useState("");
    const [state, setState] = useState(INITIAL_STATE);
    const trackingData = useSelector((store) => store.tracking);

    useEffect(() => {
        setMinDate(trackingData.fecha_desde)
        setMaxDate(trackingData.fecha_hasta)
        setState({
            ...state,
            ["fecha_desde"]: trackingData.fecha_inicio_seguimiento == undefined ? null : trackingData.fecha_inicio_seguimiento,
            ["fecha_hasta"]: trackingData.fecha_fin_seguimiento == undefined ? null : trackingData.fecha_fin_seguimiento
        })
    }, [])

    const convertDate = (inputFormat) => {
        function pad(s) {
            return s < 10 ? "0" + s : s;
        }
        var d = new Date(inputFormat);
        return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join("-");
    }


    const handleStartDate = (date) => {
        let dateFormatted = convertDate(date)

        setState({ ...state, ["fecha_desde"]: date });
        handleGlobalState("fecha_inicio_seguimiento", dateFormatted);
    }

    const handleEndDate = (date) => {
        let dateFormatted = convertDate(date)
        setState({ ...state, ["fecha_hasta"]: date });
        handleGlobalState("fecha_fin_seguimiento", dateFormatted);
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
                                    minDate={new Date(minDate)}
                                    maxDate={new Date(maxDate)}
                                    format="dd/MM/yyyy"
                                    invalidDateMessage="Formato de fecha inválido"
                                    minDateMessage="La fecha no debería ser menor a la fecha de Inicio del Año Lectivo seleccionado"
                                    maxDateMessage="La fecha no debería ser mayor a la fecha de fin del Año Lectivo seleccionado"
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
                                    minDate={new Date(state.fecha_desde)}
                                    maxDate={new Date(maxDate)}
                                    invalidDateMessage="Formato de fecha inválido"
                                    minDateMessage="La fecha no debería ser menor a la fecha de Inicio del Seguimiento"
                                    maxDateMessage="La fecha no debería ser mayor a la fecha de fin del Año Lectivo seleccionado"
                                    required
                                    disabled={state.fecha_desde == null ? true : false}
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