import MaterialTable from "material-table";
import { useState, useEffect } from "react";
import styles from './styles.module.css'
import useSWR, { mutate } from "swr";
import { useSelector } from "react-redux";
import { getExamsService, editExamsService, deleteExamsService } from "../../../../../utils/exam/services/exam_services";
import config from "../../../../../utils/config";
import { Col } from "react-bootstrap";
import CircularProgress from "@material-ui/core/CircularProgress";
import MTConfig from "../../../../../utils/table_options/MT_config";


const ExamsTable = (props) => {

    const [selectedSubject, setSelectedSubject] = useState(props.subject)
    const [selectedSchoolYear, setSelectedSchoolYear] = useState(props.schoolYear)
    const [selectedExams, setSelectedExams] = useState()
    const user = useSelector((store) => store.user);
    const [isLoading, setIsLoading] = useState(false)
    const url = `${config.api_url}/materia/${selectedSubject.id}/evaluacion/list/`
    const [columns, setColumns] = useState([
        { title: 'Nombre', field: 'nombre' },
        { title: 'Ponderación', field: 'ponderacion', type: 'numeric' },
    ]);

    const [examsArray, setExamsArray] = useState([]);

    const filterData = (data) => {
        let selectedExamsCopy = [];
        if(!!data.length){
        selectedExamsCopy = data.filter((element) => {
            return element.anio_lectivo === props.schoolYear;
        });
        }
        setSelectedExams(selectedExamsCopy);
    };

    useEffect(() => {
        setSelectedSchoolYear(props.schoolYear)
        getExamsService(user.user.token, selectedSubject.id,props.schoolYear).then((result) => {
            setIsLoading(false)
            setExamsArray(result.result)
        })
    }, [props.schoolYear]);

    useEffect(() => {
        setSelectedSchoolYear(props.schoolYear)
        getExamsService(user.user.token, selectedSubject.id,props.schoolYear).then((result) => {
            setIsLoading(false)
            setExamsArray(result.result)
        })
    }, [isLoading]);

    useEffect(()=>{
        filterData(examsArray)
    },[examsArray]);

    useEffect(() => {
        filterData(examsArray)
    }, [examsArray]);

    async function addExam(data) {
        let newExam = {
            nombre: data.nombre,
            ponderacion: data.ponderacion,
            materia: selectedSubject.id,
            anio_lectivo: selectedSchoolYear
        }
        let newExamsArray = [...examsArray];
        newExamsArray.push(newExam);
        setExamsArray(newExamsArray);
        return;
    }


    async function editExam(data) {
        let editedExam = examsArray.filter((exam) => { return exam.id === data.id })
        editedExam[0].nombre = data.nombre;
        editedExam[0].ponderacion = data.ponderacion;
        examsArray.map((exam) => {
            if (exam.id === editedExam.id) {
                exam = { ...editedExam[0] };
            }
        })
        return
    }

    async function deleteExam(data) {
        let newExamsArray = !!examsArray && examsArray.filter((exam) => { return exam.id !== data.id })
        if(!newExamsArray.length){
            newExamsArray ={
                anio_lectivo: selectedSchoolYear,
                materia: selectedSubject.id,
            }
        }
        setExamsArray(newExamsArray);
        return
    }


    const handleExams = () =>{
        setIsLoading(true);
        if(!!examsArray.length){
            editExamsService(user.user.token,examsArray).then((result)=>{
            setIsLoading(false);
        })   
        }else{
            deleteExamsService(user.user.token,examsArray).then((result)=>{
                setIsLoading(false);  
            })
        }

    }

    return (
        <>
            {selectedSchoolYear && selectedSchoolYear !== 'Seleccionar' ?
                <>
                    <MaterialTable
                        title={<span style={{ position: 'absolute', top: '25px', fontWeight: 600 }}>Exámenes</span>}
                        columns={columns}
                        data={selectedExams}
                        options={MTConfig("Exámenes").options}
                        components={MTConfig("Exámenes").components}
                        localization={MTConfig("Exámenes").localization}

                        editable={{
                            onRowAdd: newData =>
                                addExam(newData).then(() => {
                                    return
                                }),
                            onRowUpdate: (newData, oldData) =>
                                editExam(newData).then(() => {
                                    return
                                }),
                            onRowDelete: oldData =>
                                deleteExam(oldData).then(() => {
                                    return
                                }),
                        }}
                    />
           
                <Col lg={12} md={12} sm={12} xs={12} className={styles.input_container}>
                        {!isLoading ?
                            <button className="ontrack_btn_modal ontrack_btn add_btn" type="button" onClick={handleExams}>Guardar Exámenes</button>
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
                </>
        :
                <h4 style={{ color: 'rgb(154 154 154)' }}>Seleccione un año lectivo para configurar los exámenes</h4>
            }
        </>

    )
}

export default ExamsTable;