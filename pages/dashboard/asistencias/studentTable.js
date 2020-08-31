import { Col, Row } from "react-bootstrap"
import MUIDataTable from "mui-datatables"
import { useState, useEffect } from "react";
import MTConfig from "../../../src/utils/table_options/MT_config";
import { getStudentsCourseService } from '../../../src/utils/student/service/student_service';
import { getAsistenciasService } from "../../../src/utils/asistencias/services/asistencias_services";
import { getOneSchoolYearService } from "../../../src/utils/school_year/services/school_year_services";
import { useSelector } from "react-redux";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import styles from './styles.module.scss'


import Modal from '../../../src/components/commons/modals/modal';
import EditIcon from '@material-ui/icons/Edit';
import Icon from '@material-ui/core/Icon';
import { IconButton } from '@material-ui/core';
import AddAsistenciaForm from '../../../src/components/asistencias/add_asistencia_form';
import { orange } from '@material-ui/core/colors';
import FormLabel from '@material-ui/core/FormLabel';
import { KeyboardDatePicker } from "@material-ui/pickers";
import EditAsistenciaForm from "../../../src/components/asistencias/edit_asistencia_form";
import Delete from '@material-ui/icons/Delete';
import DeleteForm from '../../../src/components/commons/delete_form/deleteForm';




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

    async function getAsistencias() {
        getAsistenciasService(user.user.token, data.curso, selectedDate).then((result) => {
            setIsLoading(false);
            let studentsCourseAssistance = []
            result.result.results.forEach((element) => {
                const dataAssistance = {
                    id_asistencia: element.id,
                    asistio: element.asistio === 1 ? "Asistió" : "No Asistió",
                    descripcion: element.descripcion,
                    fecha: element.fecha,
                    nombre: element.alumno_curso.alumno.nombre,
                    apellido: element.alumno_curso.alumno.apellido,
                    legajo: element.alumno_curso.alumno.legajo,
                }
                studentsCourseAssistance.push(dataAssistance)
            })

            setEditStudentAssistance(studentsCourseAssistance)

        })
    }

    async function getSchoolYear() {
        getOneSchoolYearService(user.user.token, data.school_year).then((result) => {
            setMinDate(result.result.fecha_desde);
            setMaxDate(result.result.fecha_hasta);
        })
    }

    useEffect(() => {
        setIsLoading(true);
        getStudentsCourseService(user.user.token, data.curso, data.school_year).then((result) => {
            setIsLoading(false);
            let students = [];
            result.result.results.forEach((element) => {
                const dataStudent = {
                    alumno_curso: element.id,
                    curso: element.curso.nombre,
                    nombre: element.alumno.nombre,
                    apellido: element.alumno.apellido,
                    legajo: element.alumno.legajo,
                    email: element.alumno.email,
                    fecha_desde: element.anio_lectivo.fecha_desde,
                    fecha_hasta: element.anio_lectivo.fecha_hasta
                }

                students.push(dataStudent);
            })
            setAddStudentAssistance(students);
        })
        if (selectedDate !== "") {
            getAsistencias()
        }

        if (minDate == "") {
            getSchoolYear()
        }


    }, [tableToShow]);


    const handleTableToShow = (table) => {
        setTableToShow(table);
    }

    const handleAddAssistance = (e, data) => {
        return handleAdd(e, data);
    }

    async function handleEditAssistance(e, datos) {
        return handleEdit(e, datos).then((result) => {
            if (result.success) {
                getAsistencias()
            }
            return result;
        });
    }

    const handleDeleteAssistance = (e, data) => {
        return handleDelete(e, data).then((result) => {
            if (result.success) {
                getAsistencias()
            }
            return result
        });
    }

    const convertDate = (inputFormat) => {
        function pad(s) {
            return s < 10 ? "0" + s : s;
        }
        var d = new Date(inputFormat);
        return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join("-");
    }

    const convertDate2 = (inputFormat) => {
        function pad(s) {
            return s < 10 ? "0" + s : s;
        }
        var d = new Date(inputFormat);
        return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join("-");
    }

    const handleDateAssistance = (date) => {
        setDate(date);
        let dateFormatted = convertDate(date);

        let dateSelectedFormatted = Date.parse(dateFormatted)
        let minimalDate = Date.parse(minDate)
        let maximalDate = Date.parse(maxDate)

        if (dateSelectedFormatted >= minimalDate && dateSelectedFormatted <= maximalDate) {
            let dateFormatted2 = convertDate2(date)
            setSelectedDate(dateFormatted2)
            setTableToShow("assistance")
        } else {
            setTableToShow("delete")
        }
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
                        <button onClick={() => handleTableToShow('add')} className="ontrack_btn add_btn" style={{ padding: 10 }}>Agregar Asistencias</button>
                    </Col>
                    <Col>
                        <button onClick={() => handleTableToShow('delete')} className="ontrack_btn cancel_btn" style={{ padding: 10 }}>Ver Asistencias</button>
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
                                            label: "Asistencia",
                                            options: {
                                                customBodyRenderLite: (dataIndex) => {
                                                    return (
                                                        <div style={{ display: 'flex' }}>
                                                            <Modal
                                                                title="Agregar Asistencia"
                                                                body={<AddAsistenciaForm data={selectedData} handleSubmitAction={handleAddAssistance} />}
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
                                <Row lg={12} md={12} sm={12} xs={12} className={styles.row_input_container}>
                                    <Col lg={12} md={12} sm={12} xs={12} className={styles.input_container}>

                                        <FormLabel className="left" component="legend">Fecha</FormLabel>
                                        <KeyboardDatePicker
                                            clearable
                                            value={date}
                                            placeholder="DD/MM/YYYY"
                                            onChange={date => handleDateAssistance(date)}
                                            minDate={new Date(minDate)}
                                            maxDate={new Date(maxDate)}
                                            format="dd/MM/yyyy"
                                            invalidDateMessage="Formato de fecha inválido"
                                            minDateMessage="La fecha no debería ser menor a la fecha de Inicio del Año Lectivo seleccionado"
                                            maxDateMessage="La fecha no debería ser mayor a la fecha de Inicio del Año Lectivo seleccionado"
                                            required
                                        />

                                    </Col>
                                </Row>
                                :
                                null
                }

                {
                    (tableToShow == "assistance" && tableToShow !== "add") &&
                    <Row lg={12} md={12} sm={12} xs={12} >
                        <Col lg={12} md={12} sm={12} xs={12} >
                            <MuiThemeProvider theme={theme}>
                                <MUIDataTable
                                    title={"Asistencias de Alumnos"}
                                    data={editStudentAssistance}
                                    options={MTConfig("Alumnos").options}
                                    components={MTConfig().components}
                                    localization={MTConfig().localization}
                                    columns={[

                                        {
                                            name: "id_asistencia",
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
                                            name: "asistio",
                                            label: "Asistencia",
                                        },
                                        {
                                            name: "actions",
                                            label: "Acciones",
                                            options: {
                                                customBodyRenderLite: (dataIndex) => {
                                                    return (<>
                                                        <div style={{ display: 'flex' }}>
                                                            <Modal
                                                                title="Editar Asistencia"
                                                                body={<EditAsistenciaForm data={selectedData} handleSubmitAction={handleEditAssistance} />}
                                                                button={
                                                                    <IconButton onClick={() => setSelectedData(editStudentAssistance[dataIndex])} >
                                                                        <EditIcon />
                                                                    </IconButton>
                                                                }
                                                            />
                                                            <Modal
                                                                title="¿Seguro que deseas eliminar la asistencia de este alumno?"
                                                                body={<DeleteForm data={selectedData} handleSubmitAction={handleDeleteAssistance} />}
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
                }

            </Col>
        </Row>

    )
}

export default StudentTable