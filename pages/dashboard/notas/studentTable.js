import { Col, Row } from "react-bootstrap"
import MUIDataTable from "mui-datatables"
import { useState, useEffect } from "react";
import MTConfig from "../../../src/utils/table_options/MT_config";
import { getStudentsCourseService } from '../../../src/utils/student/service/student_service';
import { getNotasCursoService } from "../../../src/utils/notas/services/notas_services";
import { getStudentService } from "../../../src/utils/student/service/student_service";
import { getOneSchoolYearService } from "../../../src/utils/school_year/services/school_year_services";
import { useSelector } from "react-redux";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import styles from './styles.module.scss'


import Modal from '../../../src/components/commons/modals/modal';
import EditIcon from '@material-ui/icons/Edit';
import Icon from '@material-ui/core/Icon';
import { IconButton } from '@material-ui/core';
import AddNotasForm from '../../../src/components/notas/add_notas_form';
import AddAsistenciaForm from '../../../src/components/notas/edit_notas.form';
import { orange } from '@material-ui/core/colors';
import FormLabel from '@material-ui/core/FormLabel';
import { KeyboardDatePicker } from "@material-ui/pickers";
import EditNotasForm from "../../../src/components/notas/edit_notas.form";
import Delete from '@material-ui/icons/Delete';
import DeleteForm from '../../../src/components/commons/delete_form/deleteForm';
import { formatDistanceToNowStrict } from "date-fns";


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

const StudentTable = ({ data, handleAdd, handleEdit, handleDelete }) => {

    const [minDate, setMinDate] = useState("");
    const [maxDate, setMaxDate] = useState("");
    const [addStudentAssistance, setAddStudentAssistance] = useState([]);
    const [editStudentAssistance, setEditStudentAssistance] = useState([]);
    const [selectedData, setSelectedData] = useState();
    const [tableToShow, setTableToShow] = useState();
    const user = useSelector((store) => store.user);
    const [isLoading, setIsLoading] = useState(false);
    const [date, setDate] = useState(null);
    const [selectedDate, setSelectedDate] = useState("");


    async function getCalificacionesCurso() {
        getNotasCursoService(user.user.token, data.curso, data.exam).then((result) => {
            setIsLoading(false);
            let students = [];
            result.result.results.forEach((element) => {

                const dataStudent = {
                    nombre: element.alumno.nombre,
                    apellido: element.alumno.apellido,
                    legajo: element.alumno.legajo,
                    id_calificacion: element.id,
                    puntaje: element.puntaje,
                    evaluacion: element.evaluacion,
                    fecha: element.fecha,
                    fecha_desde: minDate,
                    fecha_hasta: maxDate
                }

                students.push(dataStudent);

            })
            setEditStudentAssistance(students);
        })
    }

    async function getSchoolYear() {
        getOneSchoolYearService(user.user.token, data.school_year).then((result) => {
            setMinDate(result.result.fecha_desde);
            setMaxDate(result.result.fecha_hasta);
        })
    }

    useEffect(() => {

        getCalificacionesCurso()

        setIsLoading(true);
        getStudentsCourseService(user.user.token, data.curso, data.school_year).then((result) => {
            setIsLoading(false);
            let students = [];
            result.result.results.forEach((element) => {
                const dataStudent = {
                    id: element.alumno.id,
                    alumno_curso: element.id,
                    curso: element.curso.nombre,
                    nombre: element.alumno.nombre,
                    apellido: element.alumno.apellido,
                    legajo: element.alumno.legajo,
                    email: element.alumno.email,
                    evaluacion: data.exam
                }

                students.push(dataStudent);
            })
            setAddStudentAssistance(students);
        })

        if (minDate == "") {
            getSchoolYear()
        }


    }, [tableToShow]);


    const handleTableToShow = (table) => {
        setTableToShow(table);
    }

    const handleAddNota = (e, data) => {
        return handleAdd(e, data);
    }

    async function handleEditNota(e, datos) {
        return handleEdit(e, datos).then((result) => {
            if (result.success) {
                getCalificacionesCurso()
            }
            return result;
        });
    }

    const handleDeleteNota = (e, data) => {
        return handleDelete(e, data).then((result) => {
            if (result.success) {
                getCalificacionesCurso()
            }
            return result
        });
    }

    return (
        <Row style={{ margin: 0, justifyContent: 'center' }}>
            <Col
                md={11}
                sm={11}
                xs={11}
                style={{ margin: '30px 0px 30px 0px' }}
            >
                <Row className={styles.table_button_container}>
                    <Col>
                        <button onClick={() => handleTableToShow('add')} className="ontrack_btn add_btn" style={{ padding: 10 }}>Agregar Calificaciones</button>
                    </Col>
                    <Col>
                        <button onClick={() => handleTableToShow('delete')} className="ontrack_btn cancel_btn" style={{ padding: 10 }}>Ver Calificaciones</button>
                    </Col>
                </Row>
                {
                    isLoading && tableToShow !== undefined ?
                        "Cargando..." :
                        tableToShow === "add" ?

                            <MuiThemeProvider theme={theme}>
                                <MUIDataTable
                                    title={"Alumnos del Curso"}
                                    data={addStudentAssistance}
                                    options={MTConfig("Alumnos").options}
                                    components={MTConfig().components}
                                    localization={MTConfig().localization}
                                    columns={[

                                        {
                                            name: "id",
                                            label: "Id",
                                            options: {
                                                display: false,
                                                filter: false
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
                                        },
                                        {
                                            name: "actions",
                                            label: "Calificación",
                                            options: {
                                                customBodyRenderLite: (dataIndex) => {
                                                    return (
                                                        <div style={{ display: 'flex' }}>
                                                            <Modal
                                                                title="Agregar Calificación"
                                                                body={<AddNotasForm
                                                                    data={selectedData}
                                                                    minDate={minDate}
                                                                    maxDate={maxDate}
                                                                    handleSubmitAction={handleAddNota} />}
                                                                button={
                                                                    <IconButton onClick={() => setSelectedData(addStudentAssistance[dataIndex])} >
                                                                        <Icon style={{ color: orange[500] }}>add_circle</Icon>
                                                                    </IconButton>
                                                                }
                                                            />
                                                        </div>
                                                    )
                                                },
                                            },
                                        }
                                    ]}
                                />
                            </MuiThemeProvider>
                            : tableToShow === 'delete' ?
                                <Row lg={12} md={12} sm={12} xs={12} >
                                    <Col lg={12} md={12} sm={12} xs={12} >
                                        <MuiThemeProvider theme={theme}>
                                            <MUIDataTable
                                                title={"Calificaciones de Alumnos"}
                                                data={editStudentAssistance}
                                                options={MTConfig("Alumnos").options}
                                                components={MTConfig().components}
                                                localization={MTConfig().localization}
                                                columns={[

                                                    {
                                                        name: "id_alumno",
                                                        label: "Id",
                                                        options: {
                                                            display: false,
                                                            filter: false
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
                                                        name: "fecha",
                                                        label: "Fecha",
                                                    },
                                                    {
                                                        name: "puntaje",
                                                        label: "Puntaje",
                                                    },
                                                    {
                                                        name: "actions",
                                                        label: "Acciones",
                                                        options: {
                                                            customBodyRenderLite: (dataIndex) => {
                                                                return (<>
                                                                    <div style={{ display: 'flex' }}>
                                                                        <Modal
                                                                            title="Editar Calificación"
                                                                            body={
                                                                                <EditNotasForm
                                                                                    data={selectedData}
                                                                                    minDate={minDate}
                                                                                    maxDate={maxDate} handleSubmitAction={handleEditNota} />
                                                                            }
                                                                            button={
                                                                                <IconButton onClick={() => setSelectedData(editStudentAssistance[dataIndex])} >
                                                                                    <EditIcon />
                                                                                </IconButton>
                                                                            }
                                                                        />
                                                                        <Modal
                                                                            title="¿Seguro que deseas eliminar la asistencia de este alumno?"
                                                                            body={<DeleteForm data={selectedData} handleSubmitAction={handleDeleteNota} />}
                                                                            button={
                                                                                <IconButton onClick={() => setSelectedData(editStudentAssistance[dataIndex])} >
                                                                                    <Delete />
                                                                                </IconButton>
                                                                            }
                                                                        />
                                                                    </div>
                                                                </>)
                                                            },
                                                        },
                                                    }
                                                ]}
                                            />
                                        </MuiThemeProvider>
                                    </Col>
                                </Row>
                                :
                                null
                }
            </Col>
        </Row>

    )
}

export default StudentTable