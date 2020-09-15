import { Col, Row } from "react-bootstrap"
import MUIDataTable from "mui-datatables"
import { useState, useEffect } from "react";
import MTConfig from "../../../utils/table_options/MT_config";
import { useSelector } from "react-redux";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { getUserService } from "../../../utils/user/service/user_services";
import styles from './styles.module.scss';

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

const FifthStepParticipants = ({ handleGlobalState }) => {

    const trackingData = useSelector((store) => store.tracking);
    const [userData, setUserData] = useState(trackingData.materias);
    const [selectedUsers, setSelectedUsers] = useState([])
    const user = useSelector((store) => store.user);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        setIsLoading(true);
        getUserService(user.user.token).then((result) => {
            let userFilter = result.result.results.filter(user => user.groups.name == "Pedagogía" || user.groups.name == "Docente")
            setIsLoading(false);
            setUserData(userFilter);
        })
    }, []);

    const getSelectedUsers = (users) => {
        const filterList = [...userData];
        let users_data = [];
        users.forEach(user => {
            let user_position = user.dataIndex;
            let selected_user = filterList.find((s, index) => index === user_position);
            users_data.push(selected_user);
        });
        return users_data;
    }

    const handleSelectUsers = (users) => {
        if (!!users.length) {
            const usersList = getSelectedUsers(users);
            let selectedUsersCopy = [...selectedUsers];
            usersList.map((user) => {
                if (!!selectedUsersCopy.length) {
                    let indexOf = -1;
                    selectedUsersCopy.map((selectedUser, index) => {
                        if (selectedUser.id === user.id) {
                            indexOf = index
                        }
                    });

                    if (indexOf === -1) {
                        selectedUsersCopy.push(user);
                    } else {
                        selectedUsersCopy.splice(indexOf, 1);
                    }

                } else {
                    selectedUsersCopy.push(user);
                }
            })
            setSelectedUsers(selectedUsersCopy);
        } else {
            setSelectedUsers([]);
        }
    }

    useEffect(() => {
        handleGlobalState('integrantes', selectedUsers);
    }, [selectedUsers]);

    return (
        <Row style={{ margin: 0, justifyContent: 'center', marginBottom:'20px' }}>
            {
                isLoading ?
                    <span style={{display:'block', width:'100%', margin:'20px 0px 20px 0px'}}>Cargando...</span> :
                    <>
                        <div className={styles.message_alert}>
                            Recuerde que para poder ver el seguimiento creado, debe agregarse como participante del mismo
                        </div>
                        <Col
                            md={11}
                            sm={11}
                            xs={11}
                        >
                            <MuiThemeProvider theme={theme}>
                                <MUIDataTable
                                    data={userData}
                                    options={
                                        {
                                            searchFieldStyle: { width: '30%', margin: 'auto', marginRight: '0px' },
                                            selection: true,
                                            onRowSelectionChange: (users) => handleSelectUsers(users),
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
                                            name: "name",
                                            label: "Nombre",
                                        },
                                        {
                                            name: "last_name",
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
                                    ]}
                                />
                            </MuiThemeProvider>
                        </Col>
                    </>
            }
        </Row>

    )
}

export default FifthStepParticipants