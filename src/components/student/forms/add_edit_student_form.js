import { motion } from "framer-motion";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { Row, Col } from "react-bootstrap";
import { InputLabel, Select, MenuItem, useTheme, useMediaQuery } from "@material-ui/core";

import styles from './styles.module.css'
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import config from "../../../utils/config";
import useSWR, { mutate } from "swr";
import { getSchoolYearService } from "../../../utils/school_year/services/school_year_services";
import { getDepartmentService } from "../../../utils/department/services/department_services";
import { getYearService } from "../../../utils/year/services/year_services";
import { getCourseService } from "../../../utils/course/services/course_services";
import { addStudentService, getStudentCourseService } from "../../../utils/student/service/student_service";
import CircularProgress from "@material-ui/core/CircularProgress";

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
    name: '',
    last_name: '',
    dni: '',
    legajo: '',
    email: '',
    fecha_nacimiento: '',
    direccion: '',
    localidad: '',
    provincia: '',
    fecha_inscripcion: '',
    school_year: '',
    department: '',
    year: '',
    curso: ''
}

const VALIDATE_INITIAL_STATE = {
    name: false,
    last_name: false,
    dni: false,
    legajo: false,
    email: false,
    fecha_nacimiento: false,
    direccion: false,
    localidad: false,
    provincia: false,
    fecha_inscripcion: false,
    school_year: false,
    department: false,
    year: false,
    curso: false
};

const AddEditStudentForm = (props) => {

    const [state, setState] = useState(INITIAL_STATE);
    const [validation, setValidation] = useState(VALIDATE_INITIAL_STATE);
    const [schoolYearData, setSchoolYearData] = useState(null)
    const [showInstitutionOptions, setShowInstitutionOptions] = useState(true)
    const [departmentData, setDepartmentData] = useState(null)
    const [yearData, setYearData] = useState(null)
    const [courseData, setCourseData] = useState(null)
    const theme = useTheme();
    const fullscreen = useMediaQuery(theme.breakpoints.down("719"));
    const user = useSelector((store) => store.user)
    const [isLoading, setIsLoading] = useState(false)

    const school_year_url = `${config.api_url}/anio/anio_lectivo/list/`;
    const department_url = `${config.api_url}/carrera/list/`;


    useEffect(() => {
        if (props.data) {
            getStudentCourseService(user.user.token, props.data).then((result) => {
                if (!result.success) {
                    props.handleClose();
                } else {
                    const studentData = result.result.results[0].alumno;
                    const schoolYearData = result.result.results[0].anio_lectivo;
                    const courseData = result.result.results[0].curso;
                    let selectedData = { ...state }
                    selectedData = {
                        id: studentData.id,
                        name: studentData.nombre,
                        last_name: studentData.apellido,
                        dni: studentData.dni,
                        legajo: studentData.legajo,
                        email: studentData.email,
                        fecha_nacimiento: studentData.fecha_nacimiento,
                        direccion: studentData.direccion,
                        localidad: studentData.localidad,
                        provincia: studentData.provincia,
                        fecha_inscripcion: studentData.fecha_inscripcion,
                        school_year: schoolYearData.id,
                        department: "",
                        year: courseData.anio,
                        curso: courseData.id
                    }
                    setState(selectedData);
                }
            })
        } else {
            setShowInstitutionOptions(false);
        }

    }, [])



    useSWR(school_year_url, () => {
        return getSchoolYearService(user.user.token).then((result) => {
            setSchoolYearData(result.result);
        })
    }
    );


    useSWR(department_url, () => {
        return getDepartmentService(user.user.token).then((result) => {
            setDepartmentData(result.result);
        })
    }
    );

    useEffect(() => {
        if (state.department !== '') {
            getYearService(user.user.token, state.department).then((result) => {
                setYearData(result.result);
            })
        }
    }, [state.department])

    useEffect(() => {
        if (state.year !== '') {
            getCourseService(user.user.token, state.year).then((result) => {
                setCourseData(result.result);
            })
        }
    }, [state.year])


    const hadleValidation = (prop, value) => {
        setValidation({
            ...validation,
            [prop]: !(value.split("").length > 0),
        });
    };

    const handleChange = (prop) => (event) => {
        if (prop !== "school_year"
            && prop !== "department"
            && prop !== "year"
            && prop !== "curso"
        ) {
            hadleValidation(prop, event.target.value);
        }

        setState({ ...state, [prop]: event.target.value })

    };

    const convertDate = (inputFormat) => {
        function pad(s) {
            return s < 10 ? "0" + s : s;
        }
        var d = new Date(inputFormat);
        return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join("/");
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
        parseData['fecha_nacimiento'] = convertDate(parseData['fecha_nacimiento']);
        parseData['fecha_inscripcion'] = convertDate(parseData['fecha_inscripcion']);
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
                        <div className={styles.decorator} />{" "}
                        <span id={styles.title_decorator}>
                            {" "}
                      Datos personales
                      {" "}
                        </span>
                        <div className={styles.decorator} />

                        <Row lg={12} md={12} sm={12} xs={12} className={styles.row_input_container}>
                            <Col lg={4} md={4} sm={12} xs={12} className={fullscreen && styles.input_container}>
                                <motion.li variants={item}>
                                    <FormControl variant="outlined">
                                        <TextField
                                            id="name"
                                            name="name"
                                            label="Nombre"
                                            variant="outlined"
                                            value={state.name}
                                            onChange={handleChange("name")}
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

                            <Col lg={4} md={4} sm={12} xs={12} className={fullscreen && styles.input_container}>
                                <motion.li variants={item}>
                                    <FormControl variant="outlined">
                                        <TextField
                                            id="last_name"
                                            name="last_name"
                                            label="Apellido"
                                            variant="outlined"
                                            value={state.last_name}
                                            onChange={handleChange("last_name")}
                                            required
                                        />
                                    </FormControl>
                                    {validation.last_name && (
                                        <FormHelperText
                                            className="helper-text"
                                            style={{ color: "rgb(182, 60, 47)" }}
                                        >
                                            Esta campo no puede estar vacio
                                        </FormHelperText>
                                    )}
                                </motion.li>
                            </Col>

                            <Col lg={4} md={4} sm={12} xs={12} className={fullscreen && styles.input_container}>
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
                        </Row>


                        <Row lg={12} md={12} sm={12} xs={12} className={styles.row_input_container}>
                            <Col lg={4} md={4} sm={12} xs={12} className={fullscreen && styles.input_container}>
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

                            <Col lg={4} md={4} sm={12} xs={12} className={fullscreen && styles.input_container}>
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

                            <Col lg={4} md={4} sm={12} xs={12} className={fullscreen && styles.input_container}>
                                <motion.li variants={item}>
                                    <FormControl variant="outlined">
                                        <KeyboardDatePicker
                                            clearable
                                            label="Fecha de nacimiento"
                                            value={state.fecha_nacimiento ? state.fecha_nacimiento : null}
                                            placeholder="01/05/2020"
                                            onChange={(date) => handleChangeDate(date, 'birth')}
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


                        <Row lg={12} md={12} sm={12} xs={12} className={styles.row_input_container}>
                            <Col lg={4} md={4} sm={12} xs={12} className={fullscreen && styles.input_container}>
                                <motion.li variants={item}>
                                    <FormControl variant="outlined">
                                        <TextField
                                            id="direccion"
                                            name="direccion"
                                            label="Direccion"
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

                            <Col lg={4} md={4} sm={12} xs={12} className={fullscreen && styles.input_container}>
                                <motion.li variants={item}>
                                    <FormControl variant="outlined">
                                        <TextField
                                            id="localidad"
                                            name="localidad"
                                            label="Localidad"
                                            variant="outlined"
                                            value={state.localidad}
                                            onChange={handleChange("localidad")}
                                        />
                                    </FormControl>
                                    {validation.localidad && (
                                        <FormHelperText
                                            className="helper-text"
                                            style={{ color: "rgb(182, 60, 47)" }}
                                        >
                                            Esta campo no puede estar vacio
                                        </FormHelperText>
                                    )}
                                </motion.li>
                            </Col>

                            <Col lg={4} md={4} sm={12} xs={12} className={fullscreen && styles.input_container}>
                                <motion.li variants={item}>
                                    <FormControl variant="outlined">
                                        <TextField
                                            id="provincia"
                                            name="provincia"
                                            label="Provincia"
                                            variant="outlined"
                                            value={state.provincia}
                                            onChange={handleChange("provincia")}
                                        />
                                    </FormControl>
                                    {validation.provincia && (
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

                        <div className={styles.decorator} />{" "}
                        <span id={styles.title_decorator}>
                            {" "}
                            Datos referentes a la institución
                            {" "}
                        </span>
                        <div className={styles.decorator} />

                        <Row lg={12} md={12} sm={12} xs={12} className={styles.row_input_container}>
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

                            <Col lg={6} md={6} sm={12} xs={12} className={fullscreen && styles.input_container}>
                                <motion.li variants={item}>
                                    <FormControl variant="outlined">
                                        <InputLabel id="school_year">Año lectivo</InputLabel>
                                        <Select
                                            labelId="school_year"
                                            id="school_year"
                                            value={state.school_year}
                                            onChange={handleChange("school_year")}
                                            disabled={showInstitutionOptions}
                                            required
                                        >
                                            <MenuItem value="">
                                                <em>Seleccionar</em>
                                            </MenuItem>
                                            {schoolYearData && schoolYearData.map((schoolYear) => {
                                                return (
                                                    <MenuItem value={schoolYear.id} key={schoolYear.id}>{schoolYear.nombre}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>
                                </motion.li>
                            </Col>

                        </Row>

                        <Row lg={12} md={12} sm={12} xs={12} className={styles.row_input_container}>

                            <Col lg={4} md={4} sm={12} xs={12} className={fullscreen && styles.input_container}>
                                <motion.li variants={item}>
                                    <FormControl variant="outlined">
                                        <InputLabel id="department">Carrera</InputLabel>
                                        <Select
                                            labelId="department"
                                            id="department"
                                            value={state.department}
                                            onChange={handleChange("department")}
                                            disabled={showInstitutionOptions}
                                            /* required */
                                        >
                                            <MenuItem value="">
                                                <em>Seleccionar</em>
                                            </MenuItem>
                                            {departmentData && departmentData.map((department) => {
                                                return (
                                                    <MenuItem value={department.id} key={department.id}>{department.nombre}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>
                                </motion.li>
                            </Col>
                            <Col lg={4} md={4} sm={12} xs={12} className={fullscreen && styles.input_container}>
                                <motion.li variants={item}>
                                    <FormControl variant="outlined">
                                        <InputLabel id="year">Año</InputLabel>
                                        <Select
                                            labelId="year"
                                            id="year"
                                            value={state.year}
                                            disabled={state.department === '' || showInstitutionOptions}
                                            onChange={handleChange("year")}
                                            required
                                        >
                                            <MenuItem value="">
                                                <em>Seleccionar</em>
                                            </MenuItem>
                                            {yearData && yearData.map((year) => {
                                                return (
                                                    <MenuItem value={year.id} key={year.id}>{year.nombre}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>
                                </motion.li>
                            </Col>

                            <Col lg={4} md={4} sm={12} xs={12} className={fullscreen && styles.input_container}>
                                <motion.li variants={item}>
                                    <FormControl variant="outlined">
                                        <InputLabel id="curso">Curso</InputLabel>
                                        <Select
                                            labelId="curso"
                                            id="curso"
                                            value={state.curso}
                                            onChange={handleChange("curso")}
                                            disabled={state.year === '' || showInstitutionOptions}
                                            required
                                        >
                                            <MenuItem value="">
                                                <em>Seleccionar</em>
                                            </MenuItem>
                                            {courseData && courseData.map((course) => {
                                                return (
                                                    <MenuItem value={course.id} key={course.id}>{course.nombre}</MenuItem>
                                                )
                                            })}
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
    )


}


export default AddEditStudentForm


