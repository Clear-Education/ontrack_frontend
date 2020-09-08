import { motion } from "framer-motion";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { Row, Col } from "react-bootstrap";
import { useTheme, useMediaQuery } from "@material-ui/core";

import styles from './styles.module.css'
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getStudentService } from "../../../utils/student/service/student_service";
import CountrySelector from "../../commons/country_selector/country_selector";

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
    apellido: '',
    dni: '',
    legajo: '',
    email: '',
    fecha_nacimiento: '',
    direccion: '',
    localidad: '',
    provincia: '',
    fecha_inscripcion: '',
}

const VALIDATE_INITIAL_STATE = {
    nombre: false,
    apellido: false,
    dni: false,
    legajo: false,
    email: false,
    fecha_nacimiento: false,
    direccion: false,
    localidad: false,
    provincia: false,
    fecha_inscripcion: false,
};

const AddEditStudentForm = (props) => {

    const [state, setState] = useState(INITIAL_STATE);
    const [validation, setValidation] = useState(VALIDATE_INITIAL_STATE);
    const theme = useTheme();
    const fullscreen = useMediaQuery(theme.breakpoints.down("719"));
    const user = useSelector((store) => store.user)
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        if (props.data) {
            getStudentService(user.user.token, props.data).then((result) => {
                if (result.success) {
                    setState(result.result);
                } else {
                    props.handleClose();
                }

            })
        }
    }, [])


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

    const handleChangeCountryRegion = (prop, value) =>{
        setState({ ...state, [prop]: value })
    }

    const convertDate = (inputFormat) => {
        function pad(s) {
            return s < 10 ? "0" + s : s;
        }
        var d = new Date(inputFormat);
        return [pad(d.getDate() + 1), pad(d.getMonth() + 1), d.getFullYear()].join("/");
    };


    const handleChangeDate = (date, type) => {
        if (type === 'birth') {
            setState({ ...state, ['fecha_nacimiento']: date })
        } else {
            setState({ ...state, ['fecha_inscripcion']: date })
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        let parseData = { ...state };
        if (parseData['fecha_nacimiento'] !== "") {
            parseData['fecha_nacimiento'] = convertDate(parseData['fecha_nacimiento']);
        }
        if (parseData['fecha_inscripcion'] !== "") {
            parseData['fecha_inscripcion'] = convertDate(parseData['fecha_inscripcion']);
        }

        props.handleSubmitAction(e, parseData).then((result) => {
            setIsLoading(false)
            if (result.success) {
                props.handleClose(false);
            }
        });
    }


    return (
        <motion.span
            initial="hidden"
            animate="visible"
            variants={list}
            style={{ listStyleType: "none", marginLeft: "0" }}
        >
            <Row>
                <Col>
                    <form onSubmit={handleSubmit}>

                        <Row lg={12} md={12} sm={12} xs={12} className={styles.row_input_container}>
                            <Col lg={6} md={6} sm={12} xs={12} className={fullscreen && styles.input_container}>
                                <motion.li variants={item}>
                                    <FormControl variant="outlined">
                                        <TextField
                                            id="nombre"
                                            name="nombre"
                                            label="Nombre"
                                            variant="outlined"
                                            value={state.nombre}
                                            onChange={handleChange("nombre")}
                                            required
                                        />
                                    </FormControl>
                                    {validation.nombre && (
                                        <FormHelperText
                                            className="helper-text"
                                            style={{ color: "rgb(182, 60, 47)" }}
                                        >
                                            Esta campo no puede estar vacio
                                        </FormHelperText>
                                    )}
                                </motion.li>
                            </Col>

                            <Col lg={6} md={6} sm={12} xs={12} className={fullscreen && styles.input_container}>
                                <motion.li variants={item}>
                                    <FormControl variant="outlined">
                                        <TextField
                                            id="apellido"
                                            name="apellido"
                                            label="Apellido"
                                            variant="outlined"
                                            value={state.apellido}
                                            onChange={handleChange("apellido")}
                                            required
                                        />
                                    </FormControl>
                                    {validation.apellido && (
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
                            <Col lg={6} md={6} sm={12} xs={12} className={fullscreen && styles.input_container}>
                                <motion.li variants={item}>
                                    <FormControl variant="outlined">
                                        <TextField
                                            id="dni"
                                            name="dni"
                                            label="D.N.I"
                                            variant="outlined"
                                            value={state.dni}
                                            onChange={handleChange("dni")}
                                            type='number'
                                            required
                                        />
                                    </FormControl>
                                    {validation.dni && (
                                        <FormHelperText
                                            className="helper-text"
                                            style={{ color: "rgb(182, 60, 47)" }}
                                        >
                                            Esta campo no puede estar vacio
                                        </FormHelperText>
                                    )}
                                </motion.li>
                            </Col>
                            <Col lg={6} md={6} sm={12} xs={12} className={fullscreen && styles.input_container}>
                                <motion.li variants={item}>
                                    <FormControl variant="outlined">
                                        <TextField
                                            id="email"
                                            name="email"
                                            label="Email"
                                            variant="outlined"
                                            value={state.email}
                                            onChange={handleChange("email")}

                                        />
                                    </FormControl>
                                    {validation.email && (
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
                            <Col lg={6} md={6} sm={12} xs={12} className={fullscreen && styles.input_container}>
                                <motion.li variants={item}>
                                    <FormControl variant="outlined">
                                        <TextField
                                            id="legajo"
                                            name="legajo"
                                            label="Legajo"
                                            variant="outlined"
                                            value={state.legajo}
                                            onChange={handleChange("legajo")}

                                        />
                                    </FormControl>
                                    {validation.legajo && (
                                        <FormHelperText
                                            className="helper-text"
                                            style={{ color: "rgb(182, 60, 47)" }}
                                        >
                                            Esta campo no puede estar vacio
                                        </FormHelperText>
                                    )}
                                </motion.li>
                            </Col>

                            <Col lg={6} md={6} sm={12} xs={12} className={fullscreen && styles.input_container}>
                                <motion.li variants={item}>
                                    <FormControl variant="outlined">
                                        <KeyboardDatePicker
                                            clearable
                                            label="Fecha de nacimiento"
                                            value={state.fecha_nacimiento ? state.fecha_nacimiento : null}
                                            placeholder="01/05/2020"
                                            onChange={(date) => handleChangeDate(date, 'birth')}
                                            inputVariant="outlined"
                                            maxDate={new Date('2003')}
                                            format="dd/MM/yyyy"
                                            invalidDateMessage="El formato de fecha es inválido"
                                            minDateMessage="La fecha no puede ser menor al día de hoy"
                                            maxDateMessage="La fecha no puede ser mayor al máximo permitido"

                                        />
                                    </FormControl>
                                </motion.li>
                            </Col>

                        </Row>


                        <Row lg={12} md={12} sm={12} xs={12} className={styles.row_input_container}>
                            <Col lg={6} md={6} sm={12} xs={12} className={fullscreen && styles.input_container}>
                                <motion.li variants={item}>
                                    <FormControl variant="outlined">
                                        <TextField
                                            id="direccion"
                                            name="direccion"
                                            label="Dirección, Localidad, Calle, Número"
                                            variant="outlined"
                                            value={state.direccion}
                                            onChange={handleChange("direccion")}

                                        />
                                    </FormControl>
                                    {validation.direccion && (
                                        <FormHelperText
                                            className="helper-text"
                                            style={{ color: "rgb(182, 60, 47)" }}
                                        >
                                            Esta campo no puede estar vacio
                                        </FormHelperText>
                                    )}
                                </motion.li>
                            </Col>
                            <Col lg={6} md={6} sm={12} xs={12} className={fullscreen && styles.input_container}>
                                <motion.li variants={item}>
                                    <FormControl variant="outlined">
                                        <KeyboardDatePicker
                                            clearable
                                            label="Fecha de inscripción"
                                            value={state.fecha_inscripcion ? state.fecha_inscripcion : null}
                                            placeholder="01/05/2020"
                                            onChange={(date) => handleChangeDate(date, "inscription")}
                                            inputVariant="outlined"
                                            maxDate={new Date()}
                                            format="dd/MM/yyyy"
                                            invalidDateMessage="El formato de fecha es inválido"
                                            minDateMessage="La fecha no puede ser menor al día de hoy"
                                            maxDateMessage="La fecha no puede ser mayor al máximo permitido"
                                        />
                                    </FormControl>
                                </motion.li>
                            </Col>
                        </Row>

                        <div style={{margin:15}}>
                            <CountrySelector setState={handleChangeCountryRegion}/>
                        </div>

                        <motion.li variants={item}>
                            <Row lg={12} md={12} sm={12} xs={12} className="center" style={{ justifyContent: 'center' }}>
                                <Col>
                                    {!isLoading ?
                                        <button className="ontrack_btn_modal ontrack_btn add_btn" type="submit">Guardar Alumno</button>
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
    )


}


export default AddEditStudentForm


