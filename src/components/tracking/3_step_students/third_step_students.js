import { Col, Row } from "react-bootstrap"
import MUIDataTable from "mui-datatables"
import { useState, useEffect } from "react";
import MTConfig from "../../../utils/table_options/MT_config";
import { getStudentsCourseService } from '../../../utils/student/service/student_service';
import { useSelector } from "react-redux";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#004d67',
        },
        secondary: {
            main: '#e4710fba',
        },
    },

});

const ThirdStepStudent = ({ handleGlobalState }) => {

    const trackingData = useSelector((store) => store.tracking);
    const [studentData, setStudentData] = useState(trackingData.alumnos);
    const [selectedStudents, setSelectedStudents] = useState([])
    const user = useSelector((store) => store.user);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        setIsLoading(true);
        getStudentsCourseService(user.user.token, trackingData.curso, trackingData.anio_lectivo).then((result) => {
            setIsLoading(false);
            let students = [];
            result.result.results.forEach((element) => {
                let studentData = {
                    ...element.alumno,
                    alumno_curso_id: element.id
                }
                students.push(studentData);
            })
            setStudentData(students);
        })
    }, []);

    const getStudentCourseIds = (students) => {
        const filterList = [...studentData];
        let students_course_id = []
        students.forEach(student => {
            let student_position = student.dataIndex;
            let selected_student = filterList.find((s, index) => index === student_position);
            let student_course_id = selected_student && selected_student.alumno_curso_id;
            students_course_id.push(student_course_id);
        });
        return students_course_id;
    }

    const handleSelectStudents = (students) => {
        if (!!students.length) {
            const studentCourseList = getStudentCourseIds(students);
            let selectedStudentsCopy = [...selectedStudents];
            studentCourseList.map((student_course_id) => {
                let indexOf = selectedStudentsCopy.indexOf(student_course_id);
                if (indexOf === -1) {
                    selectedStudentsCopy.push(student_course_id);
                } else {
                    selectedStudentsCopy.splice(indexOf, 1);
                }
            })
            setSelectedStudents(selectedStudentsCopy);
        } else {
            setSelectedStudents([]);
        }
    }

    useEffect(() => {
        handleGlobalState('alumnos', selectedStudents);
    }, [selectedStudents]);

    return (
        <Row style={{ margin: 0, justifyContent: 'center' }}>
            <Col
                md={11}
                sm={11}
                xs={11}
                style={{ margin: '30px 0px 30px 0px' }}
            >
                {
                    isLoading ?
                        "Cargando..." :
                        <MuiThemeProvider theme={theme}>
                            <MUIDataTable
                                data={studentData}
                                options={
                                    {
                                        searchFieldStyle: { width: '30%', margin: 'auto', marginRight: '0px' },
                                        selection: true,
                                        onRowSelectionChange: (students) => handleSelectStudents(students),
                                        selectToolbarPlacement: 'none',
                                        actionsColumnIndex: -1,
                                        downloadOptions: { filename: `Alumnos del Curso.csv` },
                                        viewColumns: false,
                                        sort: true,
                                        filter: true,
                                        responsive: 'standard',
                                        textLabels: {
                                            body: {
                                                noMatch: "No se encontraron registros",
                                            },
                                            pagination: {
                                                next: "Siguiente Página",
                                                previous: "Página Anterior",
                                                rowsPerPage: "Filas por página:",
                                                displayRows: "de",
                                            },
                                            toolbar: {
                                                search: "Buscar",
                                                downloadCsv: "Descargar CSV",
                                                print: "Imprimir",
                                            },
                                        }

                                    }
                                }
                                components={MTConfig().components}
                                localization={MTConfig().localization}
                                columns={[

                                    {
                                        name: "id",
                                        label: "Id",
                                        options: {
                                            display: false
                                        },

                                    },
                                    {
                                        name: "nombre",
                                        label: "Nombre",
                                    },
                                    {
                                        name: "apellido",
                                        label: "Apellido",
                                    },
                                    {
                                        name: "legajo",
                                        label: "Legajo",
                                    },
                                    {
                                        name: "email",
                                        label: "Email",
                                    }
                                ]}
                            />
                        </MuiThemeProvider>
                }

            </Col>
        </Row>

    )
}

export default ThirdStepStudent