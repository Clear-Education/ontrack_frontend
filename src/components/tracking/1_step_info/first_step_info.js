import styles from '../tracking.module.scss'
import { FormControl, TextField, FormHelperText } from '@material-ui/core'
import { Row, Col } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';


const INITIAL_STATE = {
    nombre: '',
    descripcion: ''
}

const VALIDATE_INITIAL_STATE = {
    nombre: false,
    descripcion: false,
};

const FirstStepInfo = ({ handleGlobalState }) => {

    const [state, setState] = useState(INITIAL_STATE);
    const [validation, setValidation] = useState(VALIDATE_INITIAL_STATE);
    const trackingData = useSelector((store) => store.tracking);

    useEffect(() => {
        setState({
            ...state,
            nombre: trackingData.nombre,
            descripcion: trackingData.descripcion
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
                    <Col lg={12} md={12} sm={12} xs={12} className={`${styles.input_container}  ${styles.name_container}`}>
                        <FormControl variant="outlined">
                            <TextField
                                id="nombre"
                                name="nombre"
                                label="Nombre del seguimiento"
                                variant="outlined"
                                value={state.nombre}
                                onChange={handleChange("nombre")}
                                required
                            />
                            {
                                validation.nombre &&
                                <FormHelperText
                                    className="helper-text"
                                    style={{ color: "rgb(182, 60, 47)" }}
                                >
                                    Esta campo no puede estar vacio
                                </FormHelperText>
                            }
                        </FormControl>
                    </Col>
                    <Col lg={12} md={12} sm={12} xs={12} className={styles.input_container}>
                        <FormControl variant="outlined">
                            <TextField
                                id="descripcion"
                                name="descripcion"
                                label="Descripción"
                                variant="outlined"
                                multiline
                                rows={3}
                                rowsMax={10}
                                value={state.descripcion}
                                onChange={handleChange("descripcion")}
                                required
                            />
                            {
                                validation.descripcion &&
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

export default FirstStepInfo