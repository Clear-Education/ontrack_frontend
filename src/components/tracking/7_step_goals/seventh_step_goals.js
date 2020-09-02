import FormLabel from '@material-ui/core/FormLabel';
import { Row, Col } from "react-bootstrap";
import styles from '../tracking.module.scss'
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FormControl, TextField, FormHelperText } from '@material-ui/core';



const INITIAL_STATE = {
    promedio: '',
    asistencia: ''
}

const VALIDATE_INITIAL_STATE = {
    promedio: false,
    asistencia: false,
};
 


const SeventhStepGoals = ({ handleGlobalState }) => {

    const [state, setState] = useState(INITIAL_STATE);
    const [validation, setValidation] = useState(VALIDATE_INITIAL_STATE);
    const trackingData = useSelector((store)=>store.tracking);

    useEffect(()=>{
        setState({...state,
        promedio: trackingData.promedio,
        asistencia: trackingData.asistencia
        })
    },[])


    const hadleValidation = (prop, value) => {
        if (prop === "promedio") {
            let puntaje = parseInt(value, 10)
            if (puntaje >= 0 && puntaje <= 10) {
                setValidation({
                    ...validation,
                    [prop]: false
                })
            } else {
                setValidation({
                    ...validation,
                    [prop]: true
                })
            }
        } else {
            setValidation({
                ...validation,
                [prop]: !(value > 0 && value <= 100),
            });
        }
    };
 

    
    const handleChange = (prop) => (event) => {
        let value = event.target.value
        hadleValidation(prop, value);
        handleGlobalState(prop, value);
        setState({ ...state, [prop]: value })
    }


    return (
        <>
            <div className={styles.container}>
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <h6 className="left" className={styles.goals_title}>Métricas:</h6>
                    <Row>
                        <Col lg={12} md={12} sm={12} xs={12} className={`${styles.input_container}`}>

                            <Row lg={12} md={12} sm={12} xs={12} className={styles.row_input_container} style={{ marginLeft: '-10px' }}>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <FormControl variant="outlined">
                                    <FormLabel className="left" component="legend">Promedio:</FormLabel>
                                    <TextField
                                                id="promedio"
                                                name="promedio"
                                                variant="outlined"
                                                value={state.promedio}
                                                onChange={handleChange("promedio")}
                                                type="number"
                                                required
                                                style={{
                                                    padding: '0'
                                                }}
                                            />
                                        </FormControl>
                                        {validation.promedio && (
                                            <FormHelperText
                                                className="helper-text"
                                                style={{ color: "rgb(182, 60, 47)" }}
                                            >
                                                La calificación del alumno debe ser un número comprendido entre 0 y 10.
                                            </FormHelperText>
                                        )}
                                </Col>

                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <FormControl variant="outlined">
                                    <FormLabel className="left" component="legend">Asistencia:</FormLabel>
                                    <TextField
                                                id="asistencia"
                                                name="asistencia"
                                                variant="outlined"
                                                value={state.asistencia}
                                                onChange={handleChange("asistencia")}
                                                type="number"
                                                required
                                                style={{
                                                    padding: '0'
                                                }}
                                            />
                                        </FormControl>
                                        {validation.asistencia && (
                                            <FormHelperText
                                                className="helper-text"
                                                style={{ color: "rgb(182, 60, 47)" }}
                                            >
                                                La asistencia debe ser un valor de 1 a 100 (%).
                                            </FormHelperText>
                                        )}
                                </Col>
                            </Row>

                        </Col>
                    </Row>
                </motion.div>
            </div>
            <div className={styles.container}>
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <h6 className="left" className={styles.goals_title}>Objetivos:</h6>
                    <Row>
                        <Col lg={12} md={12} sm={12} xs={12} className={`${styles.input_container}`}>

                            <Row lg={12} md={12} sm={12} xs={12} className={styles.row_input_container} style={{ marginLeft: '-10px' }}>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <FormLabel className="left" component="legend">Añade un objetivo</FormLabel>
                                </Col>
                            </Row>

                        </Col>
                    </Row>
                </motion.div>
            </div>
        </>
    )
}


export default SeventhStepGoals;