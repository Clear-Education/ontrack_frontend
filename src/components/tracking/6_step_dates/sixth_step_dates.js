import { KeyboardDatePicker } from "@material-ui/pickers";
import { motion } from "framer-motion";
import FormLabel from '@material-ui/core/FormLabel';
import { Row, Col } from "react-bootstrap";
import styles from '../tracking.module.scss'

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const list = {
    visible: {
        opacity: 1,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.1,
        },
    },
    hidden: {
        opacity: 0,
        transition: { 
            when: "afterChildren",
        },
    },
};

const item = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -100 },
};


const INITIAL_STATE = {
    fecha_desde: '',
    fecha_hasta: ''
}

const SixthStepDates = ({ handleGlobalState }) => {

    const [state, setState] = useState(INITIAL_STATE);
    const trackingData = useSelector((store)=>store.tracking);
    

    useEffect(()=>{
        setState({...state,
        fecha_desde: trackingData.fecha_desde,
        fecha_hasta: trackingData.fecha_hasta
        })
    },[])


    const convertDate = (inputFormat) => {
        function pad(s) {
            return s < 10 ? "0" + s : s;
        }
        var d = new Date(inputFormat);
        return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join("/");
    }


    const handleStartDate = (date) => {
        let dateFormatted = convertDate(date);
        setState({ ...state, ["fecha_desde"]: dateFormatted });
        handleGlobalState("fecha_desde", dateFormatted);
    }

    const handleEndDate = (date) => {
        let dateFormatted = convertDate(date);
        setState({ ...state, ["fecha_hasta"]: dateFormatted });
        handleGlobalState("fecha_hasta", dateFormatted);
    }



    return (
        <div className={styles.container}>
            <motion.span
                initial="hidden"
                animate="visible"
                variants={list}
                style={{ listStyleType: "none", marginLeft: "0" }}
            >
                <Row>
                    <Col lg={12} md={12} sm={12} xs={12} className={`${styles.input_container}  ${styles.name_container}`}>
                        <Row lg={12} md={12} sm={12} xs={12} className={styles.row_input_container}>
                            <Col lg={12} md={12} sm={12} xs={12} className={styles.input_container}>
                                <motion.li variants={item}>
                                    <FormLabel className="left" component="legend">Inicio del seguimiento</FormLabel>
                                    <KeyboardDatePicker
                                        clearable
                                        value={state.fecha_desde}
                                        placeholder="DD/MM/YYYY"
                                        onChange={date => handleStartDate(date)}
                                        /* minDate={new Date()} */
                                        format="dd/MM/yyyy"
                                        invalidDateMessage="Formato de fecha inválido"
                                        required
                                    />
                                </motion.li>
                            </Col>
                        </Row>
                        <Row lg={12} md={12} sm={12} xs={12} className={styles.row_input_container}>
                            <Col lg={12} md={12} sm={12} xs={12} className={styles.input_container}>
                                <motion.li variants={item}>
                                    <FormLabel className="left" component="legend">Fin del seguimiento</FormLabel>
                                    <KeyboardDatePicker
                                        placeholder="DD/MM/YYYY"
                                        value={state.fecha_hasta}
                                        onChange={date => handleEndDate(date)}
                                        format="dd/MM/yyyy"
                                        invalidDateMessage="Formato de fecha inválido"
                                        required
                                    />
                                </motion.li>
                            </Col>
                        </Row>

                    </Col>
                </Row>
            </motion.span>
        </div>
    )
}


export default SixthStepDates;