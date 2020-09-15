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
import FifthStepParticipants from '../../../../src/components/tracking/5_step_participants/fifth_step_participants';
import SixthStepRoles from '../../../../src/components/tracking/6_step_roles/sixth_step_roles';
import SeventhStepDates from '../../../../src/components/tracking/7_step_dates/seventh_step_dates';
import EighthStepGoals from '../../../../src/components/tracking/8_step_goals/eighth_step_goals';

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
import BallotIcon from '@material-ui/icons/Ballot';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

//REDUX TYPES
import * as types from "../../../../redux/types";
import { addTrackingService } from '../../../../src/utils/tracking/services/tracking_services';

import { getOneSchoolYearService } from "../../../../src/utils/school_year/services/school_year_services";


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
        'Información',
        'Carrera, año y curso',
        'Alumnos',
        'Materias',
        'Integrantes',
        'Roles',
        'Selección de fechas',
        'Métricas y objetivos'
    ];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return 'Proporcione la información del seguimiento'
        case 1:
            return 'Seleccione la carrera, año y curso deseado'
        case 2:
            return 'Seleccione los alumnos que desea agregar al seguimiento';
        case 3:
            return 'Seleccione las materias deseadas';
        case 4:
            return 'Seleccione integrantes del seguimiento';
        case 5:
            return 'Defina los roles de los integrantes';
        case 6:
            return 'Seleccione fechas del seguimiento';
        case 7:
            return 'Defina métricas y objetivos';
        default:
            return 'Unknown step';
    }
}


const INITIAL_TRACKING_DATA = {
    current_step: 0,
    nombre: '',
    descripcion: '',
    department: '',
    year: '',
    curso: '',
    anio_lectivo: '',
    alumnos: [],
    materias: [],
    integrantes: [],
    fecha_desde: '',
    fecha_hasta: '',
    fecha_inicio_seguimiento: '',
    fecha_fin_seguimiento: '',
    promedio: '',
    asistencia: '',
    cualitativos: [],
}

const CreateTracking = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [activeStep, setActiveStep] = useState();
    const steps = getSteps();
    const trackingData = useSelector((store) => store.tracking);
    const user = useSelector((store) => store.user);
    const [globalTrackingData, setGlobalTrackingData] = useState(trackingData);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: types.RESET_TRACKING_DATA });
        setGlobalTrackingData(trackingData)
        setActiveStep(trackingData.current_step ? 7 : 0);
    }, [])

    useEffect(() => {
        if (trackingData.anio_lectivo != '') {
            getOneSchoolYearService(user.user.token, trackingData.anio_lectivo).then((result) => {
                setGlobalTrackingData({ ...trackingData, ["fecha_desde"]: result.result.fecha_desde, ["fecha_hasta"]: result.result.fecha_hasta })
            })
        }

    }, [trackingData.anio_lectivo])

    const handleGlobalState = (name, value) => {
        setGlobalTrackingData({ ...globalTrackingData, [name]: value })
    }

    const validateEmptyData = (name) => {
        if (name === 'role') {
            let roles;
            for (let index = 0; index < trackingData.integrantes.length; index++) {
                roles = trackingData.integrantes[index].role === '';
                if (roles) {
                    break
                };
            }
            return !roles;
        }
        if (name === 'goals') {
            const promedio = globalTrackingData.promedio;
            const asistencia = globalTrackingData.asistencia;
            const cualitativos = globalTrackingData.cualitativos

            let promedioValidation = true;
            let asistenciaValidation = true;

            if (promedio !== '') {
                promedioValidation = promedio > 0 && promedio <= 10;
            }
            if (asistencia !== '') {
                asistenciaValidation = asistencia > 0 && asistencia <= 100;
            }
            return asistenciaValidation && promedioValidation && cualitativos.length > 0;

        }
    }
    const handleValidateData = () => {
        switch (activeStep) {
            case 0:
                return globalTrackingData.nombre !== '' && globalTrackingData.descripcion !== ''
            case 1:
                return globalTrackingData.curso;
            case 2:
                return !!globalTrackingData.alumnos.length
            case 3:
                return !!globalTrackingData.materias.length
            case 4:
                return !!globalTrackingData.integrantes.length
            case 5:
                return validateEmptyData('role');
            case 6:
                return Date.parse(globalTrackingData.fecha_inicio_seguimiento) > Date.parse(globalTrackingData.fecha_desde) && Date.parse(globalTrackingData.fecha_fin_seguimiento) < Date.parse(globalTrackingData.fecha_hasta) && Date.parse(globalTrackingData.fecha_fin_seguimiento) > Date.parse(globalTrackingData.fecha_inicio_seguimiento)
            case 7:
                return validateEmptyData('goals');
            default:
                return true
        }
    }

    const handleNext = () => {
        const validateData = handleValidateData();
        if (validateData) {
            const newTrackingData = { ...globalTrackingData, ['current_step']: activeStep + 1 }
            dispatch({ type: types.SAVE_TRACKING_DATA, payload: newTrackingData })
            activeStep === steps.length - 1 ? handleSubmitTracking() : setActiveStep((prevActiveStep) => prevActiveStep + 1);;
        } else {
            Alert.error("Hay campos requeridos vacíos o que presentan errores", {
                effect: "stackslide",
            });
        }

    };

    const handleSubmitTracking = () => {
        setIsLoading(true);
        addTrackingService(globalTrackingData, user.user.token).then((result) => {
            setIsLoading(false);
            if (result.success) {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }
        });
    }

    const handleBack = () => {
        const trackingData = { ...globalTrackingData, ['current_step']: activeStep - 1 }
        dispatch({ type: types.SAVE_TRACKING_DATA, payload: trackingData })
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        dispatch({ type: types.RESET_TRACKING_DATA });
        setGlobalTrackingData(INITIAL_TRACKING_DATA);
        setActiveStep(0);
    };

    return (
        activeStep !== undefined ?
            <div className={styles.stepper_container}>
                <Row style={{ margin: '0 5% 0 5%', width: '90%' }}>
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
                                                            :
                                                            activeStep === 4 ?
                                                                <FifthStepParticipants
                                                                    handleGlobalState={handleGlobalState}
                                                                />
                                                                :
                                                                activeStep === 5 ?
                                                                    <SixthStepRoles
                                                                        handleGlobalState={handleGlobalState}
                                                                    />
                                                                    :
                                                                    activeStep === 6 ?
                                                                        <SeventhStepDates
                                                                            handleGlobalState={handleGlobalState}
                                                                        />
                                                                        :
                                                                        activeStep === 7 ?
                                                                            <EighthStepGoals
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
                                            {activeStep === steps.length - 1 && !isLoading ? 'Crear Seguimiento' : !isLoading ? 'Siguiente' : 'Creando...'}
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