import TextField from "@material-ui/core/TextField";
import { motion } from "framer-motion";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import { Row, Col } from "react-bootstrap";
import CircularProgress from "@material-ui/core/CircularProgress";
import styles from './styles.module.css'
import { InputLabel, Select, MenuItem } from "@material-ui/core";

import { useState } from "react";

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

const VALIDATE_INITIAL_STATE = {
    nombre: false
};


const EditAsistenciaForm = (props) => {
    const [state, setState] = useState(props.data);
    const [date, setDate] = useState(null)
    const [validation, setValidation] = useState(VALIDATE_INITIAL_STATE);
    const [isLoading, setIsLoading] = useState(false);

    const hadleValidation = (prop, value) => {
        setValidation({
            ...validation,
            [prop]: !(value.trim().length > 0),
        });
    };

    const handleChange = (prop) => (event) => {

        hadleValidation(prop, event.target.value);
        if (prop == "asistio") {
            if (event.target.value == "1") {
                setState({ ...state, [prop]: "Asistió" })
            } else {
                setState({ ...state, [prop]: "No Asistió" })
            }
        } else {
            setState({ ...state, [prop]: event.target.value })
        }
    };

    const handleSubmit = (e) => {
        setIsLoading(true);
        props.handleSubmitAction(e, state).then((result) => {
            setIsLoading(false)
            if (result.success) {
                props.handleClose(false);
            }
        });
    }

    return (
        <div>
            <motion.span
                initial="hidden"
                animate="visible"
                variants={list}
                style={{ listStyleType: "none", marginLeft: "0" }}
            >
                <Row>
                    <Col>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <Row lg={12} md={12} sm={12} xs={12} className={styles.row_input_container}>
                                <Col lg={12} md={12} sm={12} xs={12} className={styles.input_container}>
                                    <motion.li variants={item}>
                                        <FormControl variant="outlined">
                                            <TextField
                                                id="descripcion"
                                                name="description"
                                                label="Descripción"
                                                variant="outlined"
                                                value={state.descripcion}
                                                onChange={handleChange("descripcion")}
                                            />
                                        </FormControl>
                                        {validation.name && (
                                            <FormHelperText
                                                className="helper-text"
                                                style={{ color: "rgb(182, 60, 47)" }}
                                            >
                                                Esta campo no puede estar vacio
                                            </FormHelperText>
                                        )}
                                    </motion.li>
                                </Col>
                            </Row>
                            <Row lg={12} md={12} sm={12} xs={12} className={styles.row_input_container}>
                                <Col lg={12} md={12} sm={12} xs={12} className={styles.input_container}>
                                    <motion.li variants={item}>
                                        <FormControl variant="outlined">
                                            <InputLabel id="asistencia">Asistencia</InputLabel>
                                            <Select
                                                labelId="asistencia"
                                                id="asistencia"
                                                value={state.asistio === "Asistió" ? "1" : "0"}
                                                onChange={handleChange("asistio")}
                                                required
                                            >
                                                <MenuItem value="" disabled>
                                                    <em>Seleccionar</em>
                                                </MenuItem>
                                                <MenuItem value="0">
                                                    <em>No Asistió</em>
                                                </MenuItem>
                                                <MenuItem value="1">
                                                    <em>Asistió</em>
                                                </MenuItem>

                                            </Select>
                                        </FormControl>
                                    </motion.li>
                                </Col>
                            </Row>
                            <motion.li variants={item}>
                                <Row lg={12} md={12} sm={12} xs={12} className="center" style={{ justifyContent: 'center' }}>
                                    <Col>
                                        {!isLoading ?
                                            <button className="ontrack_btn_modal ontrack_btn add_btn" type="submit">Guardar</button>
                                            :
                                            <button className="ontrack_btn_modal ontrack_btn add_btn" disabled>
                                                <CircularProgress
                                                    size={18}
                                                    color="primary"
                                                />
                                                {" "}Guardando...
                                        </button>
                                        }
                                    </Col>
                                </Row>
                            </motion.li>
                        </form>
                    </Col>
                </Row>
            </motion.span>
        </div>
    );


}
export default EditAsistenciaForm;