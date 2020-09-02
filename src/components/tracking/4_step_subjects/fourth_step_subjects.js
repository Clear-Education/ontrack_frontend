import { Col, Row } from "react-bootstrap"
import MUIDataTable from "mui-datatables"
import { useState, useEffect } from "react";
import MTConfig from "../../../utils/table_options/MT_config";
import { useSelector } from "react-redux";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { getSubjectsService } from "../../../utils/subject/services/subject_services";

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

const FourthStepSubjects = ({ handleGlobalState }) => {

    const trackingData = useSelector((store) => store.tracking);
    const [subjectData, setSubjectData] = useState(trackingData.materias);
    const [selectedSubjects,setSelectedSubjects] = useState([])
    const user = useSelector((store) => store.user);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        setIsLoading(true);
        getSubjectsService(user.user.token, trackingData.year).then((result) => {
            setIsLoading(false);
            setSubjectData(result.result)
        })
    }, []);

    const getSubjectIds = (subjects) =>{
        const filterList = [...subjectData];
        let subjects_id = [];
        subjects.forEach(subject => {
            let subject_position = subject.dataIndex;
            let selected_subject = filterList.find((s, index) => index === subject_position);
            let subject_id = selected_subject && selected_subject.id;
            subjects_id.push(subject_id);
        });
        return subjects_id;
    }

    const handleSelectSubjects = (subjects) => {
        if(!!subjects.length){
            const subjectList = getSubjectIds(subjects);
            let selectedSubjectsCopy = [...selectedSubjects];
            subjectList.map((subject_id)=>{
                let indexOf = selectedSubjectsCopy.indexOf(subject_id);
                if(indexOf === -1){
                    selectedSubjectsCopy.push(subject_id);
                }else{
                    selectedSubjectsCopy.splice(indexOf,1);
                }
            })
            setSelectedSubjects(selectedSubjectsCopy);
        }else{
            setSelectedSubjects([]);
        }       
    }

    useEffect(()=>{
        handleGlobalState('materias',selectedSubjects);
    },[selectedSubjects]);
    
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
                                data={subjectData}
                                options={
                                    {
                                        searchFieldStyle: { width: '30%', margin: 'auto', marginRight: '0px' },
                                        selection: true,
                                        onRowSelectionChange: (subjects) => handleSelectSubjects(subjects),
                                        selectToolbarPlacement: 'none',
                                        actionsColumnIndex: -1,
                                        downloadOptions: { filename: `Materias.csv` },
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
                                ]}
                            />
                        </MuiThemeProvider>
                }

            </Col>
        </Row>

    )
}

export default FourthStepSubjects