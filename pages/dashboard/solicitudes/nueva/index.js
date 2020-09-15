import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styles from './index.module.scss';
import Alert from "react-s-alert";

/* STEPS */
import ThirdStepStudents from '../../../../src/components/tracking/3_step_students/third_step_students';
import FourthStepSubjects from '../../../../src/components/tracking/4_step_subjects/fourth_step_subjects';
import SecondStepDepYearCourse from '../../../../src/components/tracking/2_step_department_year_course/second_step_dep_year_course';

//ICONS
import EventIcon from '@material-ui/icons/Event';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import GroupIcon from '@material-ui/icons/Group';
import FlagIcon from '@material-ui/icons/Flag';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import DescriptionIcon from '@material-ui/icons/Description';
import { Row, Col } from 'react-bootstrap';
import TitlePage from '../../../../src/components/commons/title_page/title_page';
import FirstStepInfoSolicitud from '../../../../src/components/tracking/1_step_info/first_step_info_solicitud';
import BallotIcon from '@material-ui/icons/Ballot';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

//REDUX TYPES
import * as types from "../../../../redux/types";
import { addTrackingService } from '../../../../src/utils/tracking/services/tracking_services';
import { addSolicitudesService } from '../../../../src/utils/solicitudes/services/solicitudes_services';


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
        2: <BallotIcon />,
        3: <GroupIcon />,
        4: <MenuBookIcon />,
        5: <GroupAddIcon />,
        6: <SupervisorAccountIcon />,
        7: <EventIcon />,
        8: <FlagIcon />,
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
        'Motivo',
        'Carrera, año y curso',
        'Alumnos',
    ];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return 'Detalle el motivo de la solicitud indicando las materias sobre las cuales se quiera realizar el seguimiento.'
        case 1:
            return 'Seleccione la carrera, año y curso deseado'
        case 2:
            return 'Seleccione los alumnos que desea agregar al seguimiento';
        default:
            return 'Unknown step';
    }
}


const INITIAL_TRACKING_DATA = {
    current_step: 0,
    motivo_solicitud: '',
    department: '',
    year: '',
    curso: '',
    anio_lectivo: '',
    alumnos: [],
}

const CreateTracking = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [activeStep, setActiveStep] = useState();
    const steps = getSteps();
    const trackingData = useSelector((store) => store.trackingSolicitud);
    const user = useSelector((store) => store.user);
    const [globalTrackingData, setGlobalTrackingData] = useState(trackingData);
    const dispatch = useDispatch();

    useEffect(() => {
        setGlobalTrackingData(trackingData)
        setActiveStep(trackingData.current_step ? trackingData.current_step : 0);
    }, [])

    const handleGlobalState = (name, value) => {
        setGlobalTrackingData({ ...globalTrackingData, [name]: value })
    }

    const handleValidateData = () => {
        switch (activeStep) {
            case 0:
                return globalTrackingData.motivo_solicitud !== ''
            case 1:
                return globalTrackingData.curso;
            case 2:
                return !!globalTrackingData.alumnos.length
            default:
                return true
        }
    }

    const handleNext = () => {
        const validateData = handleValidateData();
        if (validateData) {
            const newTrackingData = { ...globalTrackingData, ['current_step']: activeStep + 1 }
            console.log(newTrackingData);
            dispatch({ type: types.SAVE_TRACKING_SOLICITUD_DATA, payload: newTrackingData })
            activeStep === steps.length - 1 ? handleSubmitTracking() : setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
            Alert.error("Hay campos requeridos vacíos o que presentan errores", {
                effect: "stackslide",
            });
        }

    };

    const handleSubmitTracking = () => {
        setIsLoading(true);
        addSolicitudesService(globalTrackingData, user.user.token).then((result) => {
            setIsLoading(false);
            if (result.success) {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }
        });
    }

    const handleBack = () => {
        const trackingData = { ...globalTrackingData, ['current_step']: activeStep - 1 }
        dispatch({ type: types.SAVE_TRACKING_SOLICITUD_DATA, payload: trackingData })
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        dispatch({ type: types.RESET_TRACKING_SOLICITUD_DATA });
        setGlobalTrackingData(INITIAL_TRACKING_DATA);
        setActiveStep(0);
    };

    return (
        activeStep !== undefined ?
            <div className={styles.stepper_container}>
                <Row style={{ margin: '0 5% 0 5%', width: '90%' }}>
                    <TitlePage title="Nueva Solicitud de Seguimiento" />
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
                                <Typography>¡Solicitud creada exitosamente!</Typography>
                                <Button onClick={handleReset}> Crear una nueva  </Button>
                            </div>
                        ) : (

                                <Row lg={12} md={12} sm={12} xs={12}>
                                    <Col lg={12} md={12} sm={12} xs={12}>
                                        <Typography style={{ float: 'left' }}>{getStepContent(activeStep)}</Typography>
                                    </Col>
                                    <Col lg={12} md={12} sm={12} xs={12}>
                                        {
                                            activeStep === 0 ?
                                                <FirstStepInfoSolicitud
                                                    handleGlobalState={handleGlobalState}
                                                />
                                                :
                                                activeStep === 1 ?
                                                    <SecondStepDepYearCourse
                                                        handleGlobalState={handleGlobalState}
                                                    />
                                                    :
                                                    activeStep === 2 ?
                                                        <ThirdStepStudents
                                                            handleGlobalState={handleGlobalState}
                                                        />
                                                        :
                                                        activeStep === 3 ?
                                                            <FourthStepSubjects
                                                                handleGlobalState={handleGlobalState}
                                                            />

                                                            : null
                                        }
                                    </Col>

                                    <Col lg={12} md={12} sm={12} xs={12} style={{ marginBottom: 20 }}>
                                        <Button disabled={activeStep === 0} onClick={handleBack}> Volver </Button>
                                        <button
                                            disabled={isLoading}
                                            className={`ontrack_btn ${activeStep !== steps.length - 1 ? 'add_btn' : 'csv_btn'}`}
                                            onClick={handleNext}
                                            style={{ minWidth: '180px' }}
                                        >
                                            {activeStep === steps.length - 1 && !isLoading ? 'Crear Solicitud' : !isLoading ? 'Siguiente' : 'Creando...'}
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