import { motion } from "framer-motion";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import { Row, Col } from "react-bootstrap";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "react-s-alert";

import styles from './styles.module.css'
import { useState } from "react";
import ColorPicker from 'material-ui-color-picker';

import CoursesTable from './courses_table';

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
    color: '#000',
    cursos: []
}

const VALIDATE_INITIAL_STATE = {
    nombre: false,
    color: false
};

const YearForm = (props) => {
    const [state, setState] = useState(props.data ? props.data : INITIAL_STATE);
    const [validation, setValidation] = useState(VALIDATE_INITIAL_STATE);
    const [isLoading, setIsLoading] = useState(false);


    const hadleValidation = (prop, value) => {
        setValidation({
            ...validation,
            [prop]: !(value.split("").length > 0),
        });
    };

    const handleChange = (prop) => (event) => {

        hadleValidation(prop, event.target.value);
        setState({ ...state, [prop]: event.target.value })

    };

    const handleChangeColor = (color) => {
        setState({ ...state, ['color']: color })
    }


    const handleSubmit = (e) => {
        setIsLoading(true);
        props.handleSubmitAction(e, state).then((result) => {
            setIsLoading(false)
            if (result.success) {
                props.handleClose(false);
            } else {
                result.result.forEach((element) => {
                    Alert.error(element.message, {
                        effect: "stackslide",
                    });
                });
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

                            <Col lg={12} md={12} sm={12} xs={12} className={styles.input_container}>
                                <motion.li variants={item}>
                                    <FormControl variant="outlined">
                                        <ColorPicker
                                            name='color'
                                            variant="outlined"
                                            value={state.color}
                                            label={state.color}
                                            defaultValue={state.color}
                                            inputProps={{ value: state.color }}
                                            onChange={(color) => handleChangeColor(color)}
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

                            <Col lg={12} md={12} sm={12} xs={12} className={styles.input_container}>
                                <motion.li variants={item}>

                                    {!props.addModal ? <div className={styles.table_container}>
                                        <div className={styles.decorator} />{" "}
                                        <span id={styles.title_decorator}>
                                            {" "}
                                            {`Cursos de ${props.data.nombre}`}
                                            {" "}
                                        </span>
                                        <div className={styles.decorator} />
                                        <CoursesTable
                                            data={state}
                                            carrera={props.data.carrera}
                                        />
                                    </div> :
                                        null

                                    }

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
    )


}


export default YearForm


