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
import Alert from "react-s-alert";
import { getGroupsService } from "../../../utils/user/service/user_services";

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
    email: '',
    password: '',
    password2: '',
    groups: ''
}

const VALIDATE_INITIAL_STATE = {
    email: false,
    password: false,
    password2: false,
    groups: false

};

const AddUserForm = (props) => {
    const [state, setState] = useState(INITIAL_STATE);
    const url = `${config.api_url}/users/groups/list/`;
    const [validation, setValidation] = useState(VALIDATE_INITIAL_STATE);
    const [groupsData, setGroupsData] = useState(null);
    const theme = useTheme();
    const fullscreen = useMediaQuery(theme.breakpoints.down("719"));
    const [date, setDate] = useState(null);
    const user = useSelector((store) => store.user);


    useSWR(url, () =>
        getGroupsService(user.user.token).then((result) => {
            setGroupsData(result.result);
        })
    );

    const handleValidation = (prop, value) => {
        setValidation({
            ...validation,
            [prop]: !(value.split("").length > 0),
        });
    };

    const handleValidationPassword = (prop, value) => {
        if (state.password != value) {
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
        if (prop == "password2") {
            handleValidationPassword(prop, event.target.value);
        }
        if (prop == "email" || prop == "password") {
            handleValidation(prop, event.target.value);
        }

        setState({ ...state, [prop]: event.target.value });
    };

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
        let validateForm = true;
        Object.values(validation).map(element => {
            if (element == true) {
                validateForm = false;
            }
        })
        if (validateForm) {
            for (var key in state) {
                if (key == "legajo" || key == "dni") {
                    if (state[key] === "") {
                        delete state[key]
                    }
                }
            }
            props.handleSubmitNewUser(e, state);
            props.handleClose(false);
        } else {
            e.preventDefault();
        }
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
                                            type="number"

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

                            <Col lg={4} md={4} sm={12} xs={12} className={fullscreen && styles.input_container}>
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
                            <Col lg={4} md={4} sm={12} xs={12} className={fullscreen && styles.input_container}>
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
                                    {validation.cargo && (
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
                                            id="password"
                                            name="password"
                                            type="password"
                                            label="Contraseña"
                                            variant="outlined"
                                            value={state.password}
                                            onChange={handleChange("password")}
                                            required
                                        />
                                    </FormControl>
                                    {validation.password && (
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
                                            id="password2"
                                            name="password2"
                                            type="password"
                                            label="Repetir Contraseña"
                                            variant="outlined"
                                            value={state.password2}
                                            onChange={handleChange("password2")}
                                            required
                                        />
                                    </FormControl>
                                    {validation.password2 && (
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

                        <Row lg={12} md={12} sm={12} xs={12} className={styles.row_input_container}>
                            <Col lg={6} md={6} sm={12} xs={12} className={fullscreen && styles.input_container}>
                                <motion.li variants={item}>
                                    <FormControl variant="outlined">
                                        <InputLabel id="groups">Tipo de Cuenta</InputLabel>
                                        <Select
                                            labelId="groups"
                                            id="groups"
                                            defaultValue={state.groups.name || ''}
                                            value={state.groups.name}
                                            onChange={handleChange("groups")}
                                            required
                                        >
                                            <MenuItem value="" disabled>
                                                <em>Seleccionar</em>
                                            </MenuItem>
                                            {groupsData && groupsData.map((group) => {
                                                return (
                                                    <MenuItem value={group.id} key={group.id}>
                                                        {group.name}
                                                    </MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>
                                </motion.li>
                            </Col>

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
                                    {validation.phone && (
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

                        <motion.li variants={item}>
                            <Row lg={12} md={12} sm={12} xs={12} className="center" style={{ justifyContent: 'center' }}>
                                <Col>
                                    <button
                                        className="ontrack_btn_modal ontrack_btn add_btn"
                                        type="submit">Agregar</button>
                                </Col>
                            </Row>
                        </motion.li>
                    </form>
                </Col>
            </Row>
        </motion.span>
    )

}

export default AddUserForm;