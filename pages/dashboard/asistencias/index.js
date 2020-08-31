import TitlePage from "../../../src/components/commons/title_page/title_page";
import styles from './styles.module.scss'
import { useState } from "react";
import Alert from "react-s-alert";

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import SelectInput from "./selectInput";
import StudentTable from "./studentTable";
import { addAsistenciasService, editAsistenciasService, deleteAsistenciasService } from "../../../src/utils/asistencias/services/asistencias_services";
import { useSelector } from "react-redux";

const INITIAL_STATE = {
    department: '',
    school_year: '',
    year: '',
    curso: '',
}


const Asistencias = () => {

    const [state, setState] = useState(INITIAL_STATE);
    const [isLoading, setIsLoading] = useState(false);
    const user = useSelector((store) => store.user);

    async function addasistencias(e, data) {
        e.preventDefault();
        setIsLoading(true);
        return await addAsistenciasService(data, user.user.token).then((result) => {
            setIsLoading(false);
            return result;
        })
    }

    async function editasistencias(e, data) {
        e.preventDefault();
        setIsLoading(true);
        return await editAsistenciasService(user.user.token, data).then((result) => {
            setIsLoading(false);
            return result;
        })
    }

    async function deleteasistencias(e, data) {
        console.log(data)
        e.preventDefault();
        setIsLoading(true);
        return await deleteAsistenciasService(user.user.token, data).then((result) => {
            setIsLoading(false);
            return result;
        })
    }

    const handleChange = (prop, value) => {
        setState({ ...state, [prop]: value })
    }

    function getSteps() {
        return ['Seleccione la carrera deseada',
            'Seleccione el año lectivo deseado',
            'Seleccione el año deseado',
            'Seleccione el curso deseado',
            'Seleccione los alumnos'
        ];
    }

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <SelectInput type="department" data={state} changeAction={handleChange} />
            case 1:
                return <SelectInput type="anio_lectivo" data={state} changeAction={handleChange} />;
            case 2:
                return <SelectInput type="year" data={state} changeAction={handleChange} />;
            case 3:
                return <SelectInput type="curso" data={state} changeAction={handleChange} />;
            case 4:
                return <StudentTable
                    type="Alumnos"
                    data={state}
                    handleAdd={addasistencias}
                    handleEdit={editasistencias}
                    handleDelete={deleteasistencias} />;
            default:
                return 'Unknown step';
        }
    }

    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();

    const handleNext = (type) => {
        if (type !== 'send') {
            if (state[type] !== '') {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            } else {
                Alert.error("Debes completar este campo", {
                    effect: "stackslide",
                });
            }
        } else {
            setActiveStep(handleReset)
        }


    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <>
            <TitlePage title="Agregar Asistencias" />
            <div className={styles.stepper_container}>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                            <StepContent>
                                {getStepContent(index)}
                                <div className={styles.actionsContainer}>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={styles.stepper_button}
                                    >
                                        Anterior
                                    </Button>
                                    <button
                                        onClick={() => handleNext(activeStep === 0 ? 'department' : activeStep === 1 ? 'school_year' : activeStep === 2 ? 'year' : activeStep === 3 ? 'curso' : 'send')}
                                        className={`ontrack_btn csv_btn ${styles.stepper_button}`}
                                    >
                                        {activeStep === steps.length - 1 ? 'Volver al Inicio' : 'Siguiente'}
                                    </button>

                                </div>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
            </div>
        </>
    );
}


export default Asistencias;

