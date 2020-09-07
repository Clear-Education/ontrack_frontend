import { motion } from "framer-motion";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { Row, Col } from "react-bootstrap";
import { InputLabel, Select, MenuItem, useTheme, useMediaQuery } from "@material-ui/core";

import styles from './styles.module.css';
import { useState } from "react";
import { useSelector } from "react-redux";
import config from "../../../utils/config";
import useSWR from "swr";
import { getGroupsService } from "../../../utils/user/service/user_services";
import CountrySelector from "../../commons/country_selector/country_selector";

import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';





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

const UserProfileForm = (props) => {

    const [state, setState] = useState(props.user);
    const url = `${config.api_url}/users/groups/list/`;
    const [validation, setValidation] = useState(VALIDATE_INITIAL_STATE);
    const theme = useTheme();
    const fullscreen = useMediaQuery(theme.breakpoints.down("719"));
    const [date, setDate] = useState(props.user.date_of_birth);
    const user = useSelector((store) => store.user);
    const [image, setImage] = useState(null);


    const handleValidation = (prop, value) => {
        setValidation({
            ...validation,
            [prop]: !(value.split("").length > 0),
        });
    };

    const handleChange = (prop) => (event) => {
        console.log(event.target.value)
        handleValidation(prop, event.target.value)
        setState({ ...state, [prop]: event.target.value })
    };

    const handleChangePicture = (prop) => (event) => {
        setState({ ...state, [prop]: event.target.files[0] })
        let reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result)
        }

        reader.readAsDataURL(event.target.files[0])

    }

    const handleChangeCountryRegion = (prop, value) => {
        setState({ ...state, [prop]: value })
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

    return (
        <motion.span
            initial="hidden"
            animate="visible"
            variants={list}
            style={{ listStyleType: "none", marginLeft: "0" }}
        >
            <form onSubmit={(e) => handleSubmit(e)}>
                <Row>
                    <Col lg={4} md={4} sm={12} xs={12}>
                        <Avatar alt="Remy Sharp" src={image || "https://c8.alamy.com/comp/P9MYWR/man-avatar-profile-P9MYWR.jpg"} className={styles.profile_image} />
                        <label htmlFor="upload-photo">
                            <input
                                id="upload-photo"
                                name="upload-photo"
                                type="file"
                                accept="image/png, image/jpeg"
                                onChange={handleChangePicture("picture")}
                            />
                        </label>

                    </Col>

                    <Col lg={8} md={8} sm={12} xs={12}>
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
                                            id="cargo"
                                            name="cargo"
                                            label="Cargo"
                                            variant="outlined"
                                            value={state.cargo}
                                            onChange={handleChange("cargo")}

                                        />
                                    </FormControl>
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
                                            type="email"
                                            required
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
                                            type="number"

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

                        <div style={{ margin: 15 }}>
                            <CountrySelector setState={handleChangeCountryRegion} />
                        </div>

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
    )

}

export default UserProfileForm;