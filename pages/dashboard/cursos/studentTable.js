import { Col, Row } from "react-bootstrap"
import MUIDataTable from "mui-datatables"
import { useState, useEffect } from "react";
import MTConfig from "../../../src/utils/table_options/MT_config";
import config from "../../../src/utils/config";
import useSWR from "swr";
import { getStudentService, deleteStudentService, addStudentService, editStudentService, getStudentsCourseService } from '../../../src/utils/student/service/student_service';
import { useSelector } from "react-redux";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import styles from './styles.module.scss'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#0099cb',
        },
        secondary: {
            main: '#ff9100',
        },
    },

});

const StudentTable = ({ changeAction, data, handleSelectedStudentTable }) => {

    const [addStudentData, setAddStudentData] = useState([]);
    const [deleteStudentData, setDeleteStudentData] = useState([]);
    const [tableToShow, setTableToShow] = useState();
    const user = useSelector((store) => store.user);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getStudentService(user.user.token).then((result) => {
            setIsLoading(false);
            setAddStudentData(result.result.results)
        })
    }, []);
    useEffect(() => {
        setIsLoading(true);
        getStudentsCourseService(user.user.token, data.curso).then((result) => {
            setIsLoading(false);
            setDeleteStudentData(result.result.results)
        })
    }, []);

    const handleTableToShow = (table) => {
        setTableToShow(table);
        handleSelectedStudentTable(table);

    }

    const handleSelectStudents = (students) => {
        const filterList = tableToShow === 'add' ? [...addStudentData] : [...deleteStudentData];
        students.forEach(student => {
            let student_position = student.dataIndex;
            let selected_student = filterList.find((s, index) => index === student_position);
            let student_id = selected_student.id;
            changeAction("students", student_id);
        });
    }

    return (
        <Row style={{margin:0,justifyContent: 'center'}}>
            <Col
                md={11}
                sm={11}
                xs={11}
                style={{ margin: '30px 0px 30px 0px' }}
            >
                <Row className={styles.table_button_container}>
                    <Col>
                        <button onClick={() => handleTableToShow('add')} className="ontrack_btn add_btn" style={{ padding: 10 }}>Agregar alumnos</button>
                    </Col>
                    <Col>
                        <button onClick={() => handleTableToShow('delete')} className="ontrack_btn delete_btn" style={{ padding: 10 }}>Eliminar alumnos</button>
                    </Col>
                </Row>
                {
                    tableToShow === 'add' ?

                        <MuiThemeProvider theme={theme}>
                            <MUIDataTable
                                title={"Agregar alumnos al curso"}
                                data={addStudentData}
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
                                                noMatch: isLoading ? 'Cargando...' : "No se encontraron registros.",
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
                        : tableToShow === 'delete' ?
                            <MuiThemeProvider theme={theme}>
                                <MUIDataTable
                                    title={"Eliminar alumnos del curso"}
                                    data={deleteStudentData}
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
                                                    noMatch: isLoading ? 'Cargando...' : "Este curso no tiene alumnos, agrega alguno!.",
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
                            :
                            null
                }

            </Col>
        </Row>

    )
}

export default StudentTable