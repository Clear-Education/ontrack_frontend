import styles from '../tracking.module.scss'
import { FormControl, TextField, FormHelperText } from '@material-ui/core'
import { Row, Col } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';


const INITIAL_STATE = {
    motivo_solicitud: ''
}

const VALIDATE_INITIAL_STATE = {
    motivo_solicitud: ''
};

const FirstStepInfoSolicitud = ({ handleGlobalState }) => {

    const [state, setState] = useState(INITIAL_STATE);
    const [validation, setValidation] = useState(VALIDATE_INITIAL_STATE);
    const trackingData = useSelector((store) => store.trackingSolicitud);


    console.log(trackingData);

    useEffect(() => {
        setState({
            ...state,
            motivo_solicitud: trackingData.motivo_solicitud
        })
    }, [])

    const hadleValidation = (prop, value) => {
        setValidation({
            ...validation,
            [prop]: !(value.trim().length > 0),
        });
    };


    const handleChange = (prop) => (event) => {
        hadleValidation(prop, event.target.value);
        handleGlobalState(prop, event.target.value);
        setState({ ...state, [prop]: event.target.value })
    }



    return (
        <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <div className={styles.container}>
                <Row>
                    <Col lg={12} md={12} sm={12} xs={12} className={styles.input_container}>
                        <FormControl variant="outlined">
                            <TextField
                                id="motivo_solicitud"
                                name="motivo_solicitud"
                                label="Motivo de Solicitud"
                                variant="outlined"
                                multiline
                                rows={3}
                                rowsMax={10}
                                value={state.motivo_solicitud}
                                onChange={handleChange("motivo_solicitud")}
                                required
                            />
                            {
                                validation.motivo_solicitud &&
                                <FormHelperText
                                    className="helper-text"
                                    style={{ color: "rgb(182, 60, 47)" }}
                                >
                                    Esta campo no puede estar vacio
                                </FormHelperText>
                            }
                        </FormControl>
                    </Col>

                </Row>
            </div>
        </motion.div>
    )
}

export default FirstStepInfoSolicitud