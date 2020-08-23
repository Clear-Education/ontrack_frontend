import TitlePage from "../../../src/components/commons/title_page/title_page";
import styles from './styles.module.scss'
import { useState } from "react";
import Alert from "react-s-alert";

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SelectInput from "./selectInput";
import StudentTable from "./studentTable";

const INITIAL_STATE = {
    school_year: '',
    department: '',
    year: '',
    curso: ''
}

const Cursos = () => {

    const [state, setState] = useState(INITIAL_STATE);

    const handleChange = (prop, value) => {
        setState({ ...state, [prop]: value })
    }

    function getSteps() {
        return ['Seleccione la carrera deseada',
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
                return <SelectInput type="year" data={state} changeAction={handleChange} />;
            case 2:
                return <SelectInput type="curso" data={state} changeAction={handleChange} />;
            case 3:
                return <StudentTable type="Alumnos" data={state} changeAction={handleChange} />;
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

    const handleReset = () => {
        setActiveStep(0);
    };



    return (
        <>
                    <TitlePage title="Configurar Cursos" />
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
                                                onClick={() => handleNext(activeStep === 0 ? 'department' : 'year')}
                                                className={`ontrack_btn add_btn ${styles.stepper_button}`}
                                            >
                                                {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
                                            </button>

                                        </div>
                                    </StepContent>
                                </Step>
                            ))}
                        </Stepper>
                        {activeStep === steps.length && (
                            <Paper square elevation={0} className={styles.resetContainer}>
                                <Typography>Todo listo!</Typography>
                                <Button onClick={handleReset} className={styles.stepper_button}>
                                    Resetear
                    </Button>
                            </Paper>
                        )}
                    </div>
        </>
    );


}


export default Cursos;


/*



        let { data } = useSWR(url, () => {
            setIsLoading(true);
            return getcursosService(user.user.token).then((result) => {
                setIsLoading(false)
                return result.result
            })
        }
        );



    async function addcursos(e, data) {
        e.preventDefault();
        setIsLoading(true);
        return await addcursosService(user.user.token, data).then((result) => {
            setIsLoading(false);
            mutate(url);
            return result;
        })
    }

    async function editcursos(e, data) {
        e.preventDefault();
        setIsLoading(true);
        return await editcursosService(user.user.token, data).then((result) => {
            setIsLoading(false);
            mutate(url);
            return result;
        })
    }

    async function deletecursos(e, data) {
        e.preventDefault();
        setIsLoading(true);
        return await deletecursosService(user.user.token, data).then((result) => {
            setIsLoading(false);
            mutate(url);
            return result;
        })
    }



return (
    <>
    {isLoading && <BackgroundLoader show={isLoading} />}
         <TitlePage title="cursos" />


            <Modal
            title="Agregar cursos"
            body={ <AddIcon handleSubmitAction={addcursos}/>}
            button={
                <IconButton>
                    <AddIcon />
                </IconButton>
            }
            />

            <Modal
                title="Editar cursos"
                body={ <EditIcon handleSubmitAction={editcursos}/>}
                button={
                    <IconButton onClick={() => setSelectedData()} >
                        <EditIcon />
                    </IconButton>
                }
            />

            <Modal
            title="¿Seguro que deseas eliminar?"
            body={ <Delete handleSubmitAction={deletecursos}/>}
            button={
                <IconButton onClick={() => setSelectedData()} >
                    <Delete />
                </IconButton>
            }
            />
    </>
) */