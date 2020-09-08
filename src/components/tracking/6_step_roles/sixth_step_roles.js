import { motion } from "framer-motion";
import { Row, Col } from "react-bootstrap";
import styles from '../tracking.module.scss'

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { getTrackingRolesService } from "../../../utils/tracking/services/tracking_services";

const INITIAL_STATE = {
    participants: []
}

const SixthStepRoles = ({ handleGlobalState }) => {

    const [state, setState] = useState(INITIAL_STATE);
    const [roleData, setRoleData] = useState();
    const trackingData = useSelector((store) => store.tracking);
    const user = useSelector((store) => store.user);

    useEffect(() => {
        setState({
            ...state,
            participants: trackingData.integrantes
        })
    }, [])

    useEffect(() => {
        getTrackingRolesService(user.user.token).then((result) => {
            if (result.success) {
                setRoleData(result.result.results)
            }
        })
    }, [])


    const handleChange = (participant_id) => (event) => {
        let participants = [...state.participants];
        participants.map((participant) => {
            if (participant.id === participant_id) {
                participant.role = event.target.value
            }
        })
        setState({ ...state, participants: participants });
        handleGlobalState('integrantes', participants);
    }



    return (
        <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <div className={styles.container}>
                <Row>
                    <Col lg={12} md={12} sm={12} xs={12} className={`${styles.input_container}  ${styles.name_container}`}>
                        <Row lg={12} md={12} sm={12} xs={12} className={styles.row_input_container}>
                            <Row lg={12} md={12} sm={12} xs={12} style={{ width: '100%' }}>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    Nombre Completo
                                </Col>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    Rol
                                </Col>
                            </Row>
                            <Row lg={12} md={12} sm={12} xs={12} style={{ width: '100%', margin: 'auto' }}>
                                {trackingData.integrantes.map((participant) => {
                                    return (
                                        <>
                                            <Col lg={6} md={6} sm={6} xs={6} className={styles.input_container}>
                                                <div className={styles.name_rol_container}>
                                                    {participant.name}  {participant.last_name}
                                                </div>
                                            </Col>
                                            <Col lg={6} md={6} sm={6} xs={6} className={styles.input_container}>
                                                <FormControl variant="outlined">
                                                    <InputLabel id="rol">Rol</InputLabel>
                                                    <Select
                                                        labelId="rol"
                                                        id="rol"
                                                        value={participant.role}
                                                        onChange={handleChange(participant.id)}
                                                    >
                                                        <MenuItem value="">
                                                            <em>Seleccionar</em>
                                                        </MenuItem>
                                                        {roleData && roleData.map((role) => {
                                                            return (
                                                                <MenuItem value={role.id} key={role.id}>{role.nombre}</MenuItem>
                                                            )
                                                        })}
                                                    </Select>
                                                </FormControl>
                                            </Col>
                                        </>
                                    )
                                })}
                            </Row>

                        </Row>
                    </Col>
                </Row>
            </div>
        </motion.div>
    )
}


export default SixthStepRoles;