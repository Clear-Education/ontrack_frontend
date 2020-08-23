import { Col } from "react-bootstrap"
import MUIDataTable from "mui-datatables"
import { useState, useEffect } from "react";
import MTConfig from "../../../src/utils/table_options/MT_config";
import config from "../../../src/utils/config";
import useSWR from "swr";
import { getStudentService, deleteStudentService, addStudentService, editStudentService } from '../../../src/utils/student/service/student_service';
import { useSelector } from "react-redux";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
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

const StudentTable = () => {

    const [allData, setAllData] = useState([]);
    const url = `${config.api_url}/alumnos/list`;
    const user = useSelector((store) => store.user);
    const [isLoading, setIsLoading] = useState(false);

    useSWR(url, () => {
        setIsLoading(true);
        getStudentService(user.user.token).then((result) => {
            setIsLoading(false);
            setAllData(result.result.results)
        })
    });
    return (
        <Col
            md={11}
            sm={11}
            xs={11}
            style={{ marginTop: 30 }}
        >
                <MuiThemeProvider theme={theme}>
                    <MUIDataTable
                        title={"Todos los alumnos"}
                        data={allData}
                        options={
                            {
                                searchFieldStyle: { width: '30%', margin: 'auto', marginRight: '0px' },
                                selection: true,
                                onRowSelectionChange: (value) => { console.log(value) },
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
        </Col>
    )
}

export default StudentTable