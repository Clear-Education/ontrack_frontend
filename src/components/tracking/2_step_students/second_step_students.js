import styles from './styles.module.scss'
import { useState } from "react";
import Alert from "react-s-alert";

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import SelectInput from "../../../../pages/dashboard/cursos/selectInput";
import StudentTable from "./student_table";
import { useSelector } from "react-redux";

const INITIAL_STATE = {
    school_year: '',
    department: '',
    year: '',
    curso: '',
    studentsToAdd: [],
    studentsToDelete: [],
}

const SecondStepStudents = ({ handleGlobalState }) => {

    const [state, setState] = useState(INITIAL_STATE);
    const user = useSelector((store) => store.user);

    const handleChange = (prop, value, _student_course_id) => {
        if (prop !== 'students') {
            setState({ ...state, [prop]: value })
        }

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
                return <StudentTable type="Alumnos" data={state} changeAction={handleGlobalState} />;
            default:
                return 'Unknown step';
        }
    }

    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();

    const handleNext = (type) => {
        if (state[type] !== '') {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
            Alert.error("Debes completar este campo", {
                effect: "stackslide",
            });
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <>
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
                                    {
                                        activeStep !== steps.length - 1 ?

                                            <button
                                                onClick={() => handleNext(activeStep === 0 ? 'department' : activeStep === 1 ? 'school_year' : activeStep === 2 ? 'year' : activeStep === 3 ? 'curso' : null)}
                                                className={`ontrack_btn csv_btn ${styles.stepper_button}`}
                                            >
                                                Siguiente
                                            </button>
                                            : null
                                    }
                                </div>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>

            </div>
        </>
    );


}


export default SecondStepStudents;

