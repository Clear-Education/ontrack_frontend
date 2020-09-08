import TextField from "@material-ui/core/TextField";
import { KeyboardDatePicker } from "@material-ui/pickers";

import { motion } from "framer-motion";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from '@material-ui/core/FormLabel';
import { Row, Col } from "react-bootstrap";
import CircularProgress from "@material-ui/core/CircularProgress";
import styles from './styles.module.css'

import { useState, useEffect } from "react";

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
    nombre: '',
    fecha_desde: '',
    fecha_hasta: ''
}

const VALIDATE_INITIAL_STATE = {
    nombre: false
};

const SchoolYearForm = (props) => {
    const startLocalDate = new Date(props.data?.fecha_desde);
    const endLocalDate = new Date(props.data?.fecha_hasta);
    const [state, setState] = useState(props.data ? props.data : INITIAL_STATE);
    const [validation, setValidation] = useState(VALIDATE_INITIAL_STATE);
    const [isLoading, setIsLoading] = useState(false);

    const [startDate, setStartDate] = useState(
        props.data?.fecha_desde ? new Date(startLocalDate.getTime() + startLocalDate.getTimezoneOffset() * 60000) : null);
    const [endDate, setEndDate] = useState(
        props.data?.fecha_hasta ? new Date(endLocalDate.getTime() + endLocalDate.getTimezoneOffset() * 60000) : null);


    const convertDate = (inputFormat) => {
        function pad(s) {
            return s < 10 ? "0" + s : s;
        }
        var d = new Date(inputFormat);
        return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join("/");
    }

    useEffect(() => {
        if (startDate != null && endDate != null) {
            setState({ ...state, ["fecha_desde"]: startDate.toLocaleDateString(), ["fecha_hasta"]: endDate.toLocaleDateString() });
        }

    }, []);


    const handleStartDate = (date) => {
        setStartDate(date);
        let dateFormatted = convertDate(date);
        setState({ ...state, ["fecha_desde"]: dateFormatted });
    }

    const handleEndDate = (date) => {
        setEndDate(date);
        let dateFormatted = convertDate(date);
        setState({ ...state, ["fecha_hasta"]: dateFormatted });
    }

    const hadleValidation = (prop, value) => {
        setValidation({
            ...validation,
            [prop]: !(value.trim().length > 0),
        });
    };

    const handleChange = (prop) => (event) => {

        hadleValidation(prop, event.target.value);
        setState({ ...state, [prop]: event.target.value })

    };

    const handleSubmit = (e) => {
        setIsLoading(true);
        let startDateFormatted = startDate.toLocaleDateString();
        let endDateFormatted = endDate.toLocaleDateString();
        if (startDateFormatted == state.fecha_desde && endDateFormatted == state.fecha_hasta && props.data.fecha_desde != undefined) {
            if (startDate < new Date()) {
                const data = {
                    id: state.id,
                    nombre: state.nombre
                }
                props.handleSubmitAction(e, data).then((result) => {
                    setIsLoading(false)
                    if (result.success) {
                        props.handleClose(false);
                    }
                });
            } else {
                props.handleSubmitAction(e, state).then((result) => {
                    setIsLoading(false)
                    if (result.success) {
                        props.handleClose(false);
                    }
                });
            }
        }
        else {
            props.handleSubmitAction(e, state).then((result) => {
                setIsLoading(false)
                if (result.success) {
                    props.handleClose(false);
                }
            });
        }

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
                                                id="name"
                                                name="name"
                                                label="Nombre"
                                                variant="outlined"
                                                value={state.nombre}
                                                onChange={handleChange("nombre")}
                                                required
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
                                        <FormLabel className="left" component="legend">Fecha de Inicio Año Lectivo</FormLabel>
                                        <KeyboardDatePicker
                                            clearable
                                            value={startDate}
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
                                        <FormLabel className="left" component="legend">Fecha de Fin Año Lectivo</FormLabel>
                                        <KeyboardDatePicker
                                            placeholder="DD/MM/YYYY"
                                            value={endDate}
                                            onChange={date => handleEndDate(date)}
                                            format="dd/MM/yyyy"
                                            invalidDateMessage="Formato de fecha inválido"
                                            required
                                        />
                                    </motion.li>
                                </Col>
                            </Row>
                            <motion.li variants={item}>
                                <Row lg={12} md={12} sm={12} xs={12} className="center" style={{ justifyContent: 'center' }}>
                                    <Col>
                                        {!isLoading ?
                                            <button className="ontrack_btn_modal ontrack_btn add_btn" type="submit">Guardar Año</button>
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

export default SchoolYearForm;