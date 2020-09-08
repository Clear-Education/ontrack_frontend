import { motion } from "framer-motion";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import { Row, Col } from "react-bootstrap";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "react-s-alert";

import styles from './styles.module.css'
import { useState, useEffect } from "react";
import ColorPicker from 'material-ui-color-picker'
import ExamsTable from "../exams/exams_table";
import useSWR from "swr";
import { getSchoolYearService } from "../../../../../utils/school_year/services/school_year_services";
import config from "../../../../../utils/config";
import { useSelector } from "react-redux";
import { MenuItem, Select, InputLabel } from "@material-ui/core";


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
    anio_lectivo: ''
}

const VALIDATE_INITIAL_STATE = {
    nombre: false,
    color: false,
    anio_lectivo: false
};

const SubjectForm = (props) => {
    const [state, setState] = useState(props.data ? props.data : INITIAL_STATE);
    const [validation, setValidation] = useState(VALIDATE_INITIAL_STATE);
    const [isLoading, setIsLoading] = useState(false)
    const user = useSelector((store) => store.user);
    const [schoolYearData, setSchoolYearData] = useState();

    useEffect(()=>{
        getSchoolYearService(user.user.token).then((result) => {
           setSchoolYearData(result.result);
       })
   },[])

    const hadleValidation = (prop, value) => {
        setValidation({
            ...validation,
            [prop]: !(value.trim().length > 0),
        });
    };

    const handleChange = (prop) => (event) => {

        if (prop !== "anio_lectivo") {
            hadleValidation(prop, event.target.value);
        }

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
                                            label={"Color"}
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
                                    {!isLoading ?
                                        <button className="ontrack_btn_modal ontrack_btn add_btn" type="submit">Guardar Materia</button>
                                        :
                                        <button className="ontrack_btn_modal ontrack_btn add_btn" disabled>
                                            <CircularProgress
                                                size={18}
                                                color="primary"
                                            />
                                            {" "}Guardando...
                                </button>
                                    }
                                </motion.li>
                            </Col>
                            <Col lg={12} md={12} sm={12} xs={12} className={styles.input_container}>
                                <motion.li variants={item}>
                                    {props.showTable ?
                                        <>
                                            <FormControl variant="outlined" style={{ marginBottom: '20px' }}>
                                                <InputLabel id="institucion">Año Lectivo</InputLabel>
                                                <Select
                                                    labelId="anio_lectivo"
                                                    id="anio_lectivo"
                                                    value={state.anio_lectivo ? state.anio_lectivo : "Seleccionar"}
                                                    onChange={handleChange("anio_lectivo")}
                                                >
                                                    <MenuItem value="Seleccionar">
                                                        <em>Seleccionar</em>
                                                    </MenuItem>
                                                    {schoolYearData && schoolYearData.map((schoolYear) => {
                                                        return (
                                                            <MenuItem value={schoolYear.id} key={schoolYear.id}>{schoolYear.nombre}</MenuItem>
                                                        )
                                                    })}
                                                </Select>
                                            </FormControl>
                                            <ExamsTable subject={props.data} schoolYear={state.anio_lectivo} />
                                        </>
                                        :
                                        null
                                    }
                                </motion.li>
                            </Col>
                        </Row>


                    </form>
                </Col>
            </Row>
        </motion.span>
    )
}

export default SubjectForm;



