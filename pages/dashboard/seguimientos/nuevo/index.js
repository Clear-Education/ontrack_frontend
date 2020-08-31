import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styles from './index.module.scss';
import Alert from "react-s-alert";

//ICONS
import EventIcon from '@material-ui/icons/Event';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import GroupIcon from '@material-ui/icons/Group';
import FlagIcon from '@material-ui/icons/Flag';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import DescriptionIcon from '@material-ui/icons/Description';
import { Row, Col } from 'react-bootstrap';
import TitlePage from '../../../../src/components/commons/title_page/title_page';
import FirstStepInfo from '../../../../src/components/tracking/1_step_info/first_step_info';
import { useDispatch, useSelector } from 'react-redux';

//REDUX TYPES
import * as types from "../../../../redux/types";
import SecondStepStudents from '../../../../src/components/tracking/2_step_students/second_step_students';


const ColorlibConnector = withStyles({
    alternativeLabel: {
        top: 22,
    },
    active: {
        '& $line': {
            backgroundImage:
                'linear-gradient( 95deg,var(--orange),var(--orange))',
        },
    },
    completed: {
        '& $line': {
            backgroundImage:
                'linear-gradient( 95deg,var(--main-color-dark),var(--main-color-dark))',
        },
    },
    line: {
        height: 3,
        border: 0,
        backgroundColor: 'var(--medium-gray)',
        borderRadius: 1,
    },
})(StepConnector);


function ColorlibStepIcon(props) {
    const { active, completed } = props;

    const icons = {
        1: <DescriptionIcon />,
        2: <GroupIcon />,
        3: <MenuBookIcon />,
        4: <GroupAddIcon />,
        5: <EventIcon />,
        6: <FlagIcon />,
    };

    return (
        <div
            className={clsx(styles.icon_container, active ? styles.active_icon : completed ? styles.completed_icon : null)}
        >
            {icons[String(props.icon)]}
        </div>
    );
}



function getSteps() {
    return [
        'Información del seguimiento',
        'Selección de alumnos',
        'Selección de materias',
        'Selección de integrantes',
        'Selección de fechas',
        'Definición de métricas y objetivos'
    ];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return 'Proporcione la información del seguimiento'
        case 1:
            return 'Seleccione los alumnos que desea agregar al seguimiento';
        case 2:
            return 'Seleccione integrantes del seguimiento';
        case 3:
            return 'Seleccione las materias deseadas';
        case 4:
            return 'Seleccione fechas del seguimiento';
        case 5:
            return 'Defina métricas y objetivos';
        default:
            return 'Unknown step';
    }
}

const CreateTracking = () => {
    const [activeStep, setActiveStep] = useState();
    const steps = getSteps();
    const trackingData = useSelector((store)=>store.tracking);
    const [globalTrackingData, setGlobalTrackingData] = useState(trackingData);
    const dispatch = useDispatch();

    useEffect(() => { 
       /*  dispatch({type:types.RESET_TRACKING_DATA}); */
        setGlobalTrackingData(trackingData)
        setActiveStep(trackingData.current_step ? trackingData.current_step : 0 );
    }, [])

    const handleGlobalState = (name, value) => {
        setGlobalTrackingData({ ...globalTrackingData, [name]: value })
    }

    const handleValidateData = () => {
        switch (activeStep) {
            case 0:
                return globalTrackingData.nombre !== '' && globalTrackingData.descripcion !== ''
            case 1:
                return !!globalTrackingData.alumnos.length
            case 2:
                return true
            case 3:
                return true
            case 4:
                return true
            case 5:
                return true
            default:
                return true
        }
    }

    const handleNext = () => {
        const validateData = handleValidateData();
        if (validateData) {
            const trackingData = {...globalTrackingData,['current_step']:activeStep + 1}
            dispatch({ type: types.SAVE_TRACKING_DATA, payload: trackingData })
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
            Alert.error("Recuerda completar los campos requeridos", {
                effect: "stackslide",
            });
        }

    };

    const handleBack = () => {
        const trackingData = {...globalTrackingData,['current_step']:activeStep - 1}
        dispatch({ type: types.SAVE_TRACKING_DATA, payload: trackingData })
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        activeStep !== undefined ?
            <div className={styles.stepper_container}>
                <Row style={{ margin: '0 5% 0 5%' }}>
                    <TitlePage title="Nuevo Seguimiento" />
                    <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                        {steps.map((label) => (
                            <Step key={label}>

                                <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <Col lg={12} md={12} sm={12} xs={12}>
                        {activeStep === steps.length ? (
                            <div>
                                <Typography>¡Seguimiento creado exitosamente!</Typography>
                                <Button onClick={handleReset}> Crear uno nuevo  </Button>
                            </div>
                        ) : (

                                <Row lg={12} md={12} sm={12} xs={12}>
                                    <Col lg={12} md={12} sm={12} xs={12}>
                                        <Typography style={{ float: 'left' }}>{getStepContent(activeStep)}</Typography>
                                    </Col>
                                    <Col lg={12} md={12} sm={12} xs={12}>
                                        {
                                            activeStep === 0 ?
                                                <FirstStepInfo
                                                    handleGlobalState={handleGlobalState}
                                                />
                                                : 
                                            activeStep === 1 ? 
                                                <SecondStepStudents
                                                handleGlobalState={handleGlobalState}
                                                />
                                                : null
                                        }
                                    </Col>

                                    <Col lg={12} md={12} sm={12} xs={12}>
                                        <Button disabled={activeStep === 0} onClick={handleBack}> Volver </Button>
                                        <button
                                            className={`ontrack_btn ${activeStep !== steps.length - 1 ? 'add_btn' : 'csv_btn'}`}
                                            onClick={handleNext}

                                        >
                                            {activeStep === steps.length - 1 ? 'Crear' : 'Siguiente'}
                                        </button>
                                    </Col>

                                </Row>

                            )}
                    </Col>
                </Row>
            </div>

            : null
    );
}

export default CreateTracking;