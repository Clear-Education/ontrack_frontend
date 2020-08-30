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
import { addMultipleStudentsCourseService, deleteMultipleStudentsCourseService } from "../../../src/utils/student/service/student_service";
import { useSelector } from "react-redux";

const INITIAL_STATE = {
    school_year: '',
    department: '',
    year: '',
    curso: '',
    studentsToAdd: [],
    studentsToDelete: [],
}

const Cursos = () => {
 
    const [state, setState] = useState(INITIAL_STATE);
    const [selectedStudentTable, setSelectedStudentTable] = useState("add");
    const user = useSelector((store) => store.user);

    const handleChange = (prop, value,_student_course_id) => {
        let studentList = selectedStudentTable === 'add' ? state.studentsToAdd : state.studentsToDelete
        let students_ids = value;
        if (prop === 'students') {
            if (!students_ids.length) {
                selectedStudentTable === 'add' ? state.studentsToAdd = [] : state.studentsToDelete = [];
            } else {
                let deleted = false;
                students_ids.map((student_id) => {
        
                    let indexOfStudent = studentList.map((student)=>{return student.alumno}).indexOf(student_id);
                    if (indexOfStudent !== -1) {
                        studentList.splice(indexOfStudent, 1)
                        deleted = true;
                    }
                    if (!deleted) {
                            let student_data = {
                                alumno: student_id,
                                curso: state.curso,
                                anio_lectivo: state.school_year,
                                student_course_id : _student_course_id
                            }
                            studentList.push(student_data)
                    }
                })

            }

        } else {
            setState({ ...state, [prop]: value })
        }

    }

    const handleSelectedStudentTable = (table) => {
        setSelectedStudentTable(table);
        setState((prevState)=>({
            school_year: prevState.school_year,
            department: prevState.department,
            year: prevState.year,
            curso: prevState.curso,
            studentsToAdd: [],
            studentsToDelete: [],
        }))
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
                return <StudentTable type="Alumnos" data={state} changeAction={handleChange} handleSelectedStudentTable={handleSelectedStudentTable} />;
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
            if (!!state.studentsToAdd.length || !!state.studentsToDelete.length) {
                if (selectedStudentTable === 'add') {
                    addMultipleStudentsCourseService(user.user.token, state.studentsToAdd).then((result) => {
                        if (result.success) {
                            setActiveStep((prevActiveStep) => prevActiveStep + 1);
                            state.studentsToAdd = [];
                            state.studentsToDelete = [];
                        }
                    })
                } else {
                    deleteMultipleStudentsCourseService(user.user.token, state.studentsToDelete).then((result) => {
                        if (result.success) {
                            setActiveStep((prevActiveStep) => prevActiveStep + 1);
                        }
                    })
                }
            } else {
                Alert.error("Debes seleccionar una opción!", {
                    effect: "stackslide",
                });
            }

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
                                        onClick={() => handleNext(activeStep === 0 ? 'department' : activeStep === 1 ? 'school_year' : activeStep === 2 ? 'year' : activeStep === 3 ? 'curso' : 'send')}
                                        className={`ontrack_btn csv_btn ${styles.stepper_button}`}
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
                        <Button onClick={handleBack} className={styles.stepper_button}>
                            Volver
                        </Button>
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
