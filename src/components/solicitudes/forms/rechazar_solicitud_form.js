import { motion } from "framer-motion";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import { Row, Col } from "react-bootstrap";
import { useTheme, useMediaQuery } from "@material-ui/core";

import styles from './styles.module.css'
import { useState } from "react";
import { useSelector } from "react-redux";
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


const RechazarSolicitudForm = () => {

    const [state, setState] = useState();
    const [validation, setValidation] = useState();
    const theme = useTheme();
    const fullscreen = useMediaQuery(theme.breakpoints.down("719"));
    const user = useSelector((store) => store.user)
    const [isLoading, setIsLoading] = useState(false)


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
        e.preventDefault();
        setIsLoading(true);

        props.handleSubmitAction(e, data).then((result) => {
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
                        <p>Detalle el motivo de rechazo de la solicitud de seguimiento</p>
                        <Row lg={12} md={12} sm={12} xs={12} className={styles.row_input_container}>
                            <Col lg={12} md={12} sm={12} xs={12} className={fullscreen && styles.input_container}>
                                <motion.li variants={item}>
                                    <FormControl variant="outlined">
                                        <TextField
                                            id="motivo"
                                            name="motivo"
                                            label="Motivo Rechazo"
                                            multiline
                                            rowsMax={10}
                                            rows={4}
                                            variant="outlined"
                                            value={null}
                                            placeholder="Escriba el motivo de rechazo"
                                            onChange={handleChange("motivo")}
                                        />
                                    </FormControl>
                                    {/* {validation.legajo && (
                                        <FormHelperText
                                            className="helper-text"
                                            style={{ color: "rgb(182, 60, 47)" }}
                                        >
                                            Esta campo no puede estar vacio
                                        </FormHelperText>
                                    )} */}
                                </motion.li>
                            </Col>
                        </Row>

                        <motion.li variants={item}>
                            <Row lg={12} md={12} sm={12} xs={12} className="center" style={{ justifyContent: 'center' }}>
                                <Col>
                                    {!isLoading ?
                                        <button className="ontrack_btn_modal ontrack_btn add_btn" type="submit">Enviar Respuesta</button>
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

export default RechazarSolicitudForm;