import { motion } from "framer-motion";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { Row, Col } from "react-bootstrap";
import { useTheme, useMediaQuery } from "@material-ui/core";

import styles from './styles.module.css';
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Avatar from '@material-ui/core/Avatar';

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
    name: false,
    last_name: false,
    email: false,
    dni: false,
    legajo: false,
    cargo: false,
    groups: false,
    phone: false,
    date_of_birth: false,
    direccion: false,
    localidad: false,
    provincia: false,
};

const VALIDATE_INITIAL_STATE_PASSWORDS = {
    password: false,
    new_password: false,
    new_password2: false

};

const UserProfileForm = (props) => {

    const [state, setState] = useState(null);
    const [passwordsData, setPasswordsData] = useState(null)
    const [validation, setValidation] = useState(VALIDATE_INITIAL_STATE_PASSWORDS);
    const theme = useTheme();
    const fullscreen = useMediaQuery(theme.breakpoints.down("719"));
    const [date, setDate] = useState(props.user.date_of_birth);
    const user = useSelector((store) => store.user);
    const [image, setImage] = useState(null);


    useEffect(() => {
        setState(props.user);
    }, [])


    const handleValidation = (prop, value) => {
        setValidation({
            ...validation,
            [prop]: !(value.split("").length > 0),
        });
    };

    const handleValidationPassword = (prop, value) => {
        if (passwordsData.new_password != value) {
            setValidation({
                ...validation,
                [prop]: true,
            });
        } else {
            setValidation({
                ...validation,
                [prop]: false,
            });
        }

    };

    const handleChange = (prop) => (event) => {
        handleValidation(prop, event.target.value)
        setState({ ...state, [prop]: event.target.value })
    };

    const handleChangePasswordSection = (prop) => (event) => {
        if (prop == "new_password2") {
            handleValidationPassword(prop, event.target.value);
        } else {
            handleValidation(prop, event.target.value)
        }

        setPasswordsData({ ...passwordsData, [prop]: event.target.value })
    };

    const handleChangePicture = (prop) => (event) => {
        setState({ ...state, [prop]: event.target.files[0] })
        let reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result)
        }

        reader.readAsDataURL(event.target.files[0])

    }

    const convertDate = (inputFormat) => {
        function pad(s) {
            return s < 10 ? "0" + s : s;
        }
        var d = new Date(inputFormat);
        return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join("-");
    };

    const handleChangeDate = (date) => {
        setDate(date);
        let formatedDate = convertDate(date);
        setState({ ...state, ["date_of_birth"]: formatedDate });
    };


    const handleSubmit = (e) => {
        props.handleSubmitAction(e, state);
    }

    const handleSubmitPassword = (e) => {
        props.handleChangePassword(e, passwordsData);
    }

    return (
        <div className={styles.container_profile}>
            {state !== null &&
                <div>
                    <motion.span
                        initial="hidden"
                        animate="visible"
                        variants={list}
                        style={{ listStyleType: "none", marginLeft: "0" }}
                    >
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <Row>
                                <Col lg={4} md={4} sm={12} xs={12}>
                                    <Avatar alt="Remy Sharp"
                                        src={image !== null ? image :
                                            state.picture !== null ?
                                                `https://ontrack-education.herokuapp.com${state.picture}`
                                                :
                                                "https://c8.alamy.com/comp/P9MYWR/man-avatar-profile-P9MYWR.jpg"} className={styles.profile_image} />
                                    <label htmlFor="upload_photo">
                                        <input
                                            id="upload_photo"
                                            name="upload_photo"
                                            className="w-100"
                                            type="file"
                                            accept="image/png, image/jpeg"
                                            onChange={handleChangePicture("picture")}
                                        />
                                    </label>
                                </Col>
                                <Col lg={8} md={8} sm={12} xs={12}>
                                    <h4 className="mb-4 subtitle">Editar Informacion Básica</h4>
                                    <Row lg={12} md={12} sm={12} xs={12} className={styles.row_input_container}>
                                        <Col lg={6} md={6} sm={12} xs={12} className={fullscreen && styles.input_container}>
                                            <motion.li variants={item}>
                                                <FormControl variant="outlined">
                                                    <TextField
                                                        id="name"
                                                        name="name"
                                                        label="Nombre"
                                                        variant="outlined"
                                                        value={state.name || ''}
                                                        onChange={handleChange("name")}
                                                        required
                                                    />
                                                </FormControl>
                                            </motion.li>
                                        </Col>
                                        <Col lg={6} md={6} sm={12} xs={12} className={fullscreen && styles.input_container}>
                                            <motion.li variants={item}>
                                                <FormControl variant="outlined">
                                                    <TextField
                                                        id="last_name"
                                                        name="last_name"
                                                        label="Apellido"
                                                        variant="outlined"
                                                        value={state.last_name || ""}
                                                        onChange={handleChange("last_name")}
                                                        required
                                                    />
                                                </FormControl>
                                            </motion.li>
                                        </Col>
                                    </Row>
                                    <Row lg={12} md={12} sm={12} xs={12} className={styles.row_input_container}>
                                        <Col lg={12} md={12} sm={12} xs={12} className={fullscreen && styles.input_container}>
                                            <motion.li variants={item}>
                                                <FormControl variant="outlined">
                                                    <TextField
                                                        id="cargo"
                                                        name="cargo"
                                                        label="Cargo"
                                                        variant="outlined"
                                                        value={state.cargo}
                                                        onChange={handleChange("cargo")}
                                                        required
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
                                                        id="legajo"
                                                        name="legajo"
                                                        label="Legajo"
                                                        variant="outlined"
                                                        value={state.legajo}
                                                        onChange={handleChange("legajo")}
                                                        type="number"
                                                        required
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
                                                        value={date ? date : null}
                                                        placeholder="01/05/2020"
                                                        onChange={(date) => handleChangeDate(date)}
                                                        inputVariant="outlined"
                                                        maxDate={new Date()}
                                                        format="dd/MM/yyyy"
                                                        invalidDateMessage="El formato de fecha es inválido"
                                                        minDateMessage="La fecha no puede ser menor al día de hoy"
                                                        maxDateMessage="La fecha no puede ser mayor al máximo permitido"
                                                        required
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
                                                        id="phone"
                                                        name="phone"
                                                        label="Telefono"
                                                        variant="outlined"
                                                        value={state.phone}
                                                        onChange={handleChange("phone")}
                                                        type="number"
                                                    />
                                                </FormControl>
                                            </motion.li>
                                        </Col>
                                        <Col lg={6} md={6} sm={12} xs={12} className={fullscreen && styles.input_container}>
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
                                            </motion.li>
                                        </Col>
                                    </Row>
                                    <motion.li variants={item}>
                                        <Row lg={12} md={12} sm={12} xs={12} className="center" style={{ justifyContent: 'center' }}>
                                            <Col>
                                                <button
                                                    className="ontrack_btn_modal ontrack_btn add_btn"
                                                    type="submit">Editar</button>
                                            </Col>
                                        </Row>
                                    </motion.li>
                                </Col>
                            </Row>
                        </form>
                    </motion.span>
                    <motion.span
                        initial="hidden"
                        animate="visible"
                        variants={list}
                        style={{ listStyleType: "none", marginLeft: "0" }}
                    >
                        <form onSubmit={(e) => handleSubmitPassword(e)}>
                            <Row className="mt-3">
                                <Col lg={4} md={4} sm={12} xs={12}>
                                </Col>
                                <Col lg={8} md={8} sm={12} xs={12}>
                                    <h4 className="mb-4 subtitle">Cambiar Contraseña</h4>
                                    <Row lg={12} md={12} sm={12} xs={12} className={styles.row_input_container}>
                                        <Col lg={12} md={12} sm={12} xs={12} className={fullscreen && styles.input_container}>
                                            <motion.li variants={item}>
                                                <FormControl variant="outlined">
                                                    <TextField
                                                        id="password"
                                                        name="password"
                                                        type="password"
                                                        label="Contraseña Actual"
                                                        variant="outlined"
                                                        value={state.password}
                                                        onChange={handleChangePasswordSection("password")}
                                                        required
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
                                                        id="new_password"
                                                        name="new_password"
                                                        type="password"
                                                        label="Nueva Contraseña"
                                                        variant="outlined"
                                                        value={state.new_password}
                                                        onChange={handleChangePasswordSection("new_password")}
                                                        required
                                                    />
                                                </FormControl>
                                            </motion.li>
                                        </Col>
                                        <Col lg={6} md={6} sm={12} xs={12} className={fullscreen && styles.input_container}>
                                            <motion.li variants={item}>
                                                <FormControl variant="outlined">
                                                    <TextField
                                                        id="new_password2"
                                                        name="new_password2"
                                                        type="password"
                                                        label="Repetir Nueva Contraseña"
                                                        variant="outlined"
                                                        value={state.new_password2}
                                                        onChange={handleChangePasswordSection("new_password2")}
                                                        required
                                                    />
                                                </FormControl>
                                                {validation.new_password2 && (
                                                    <FormHelperText
                                                        className="helper-text"
                                                        style={{ color: "rgb(182, 60, 47)" }}
                                                    >
                                                        Las contraseñas deben coincidir
                                                    </FormHelperText>
                                                )}
                                            </motion.li>
                                        </Col>
                                    </Row>
                                    <motion.li variants={item}>
                                        <Row lg={12} md={12} sm={12} xs={12} className="center" style={{ justifyContent: 'center' }}>
                                            <Col>
                                                <button
                                                    className="ontrack_btn_modal ontrack_btn add_btn"
                                                    type="submit">Cambiar Contraseña</button>
                                            </Col>
                                        </Row>
                                    </motion.li>
                                </Col>
                            </Row>
                        </form>
                    </motion.span>
                </div>
            }
        </div>
    )

}

export default UserProfileForm;