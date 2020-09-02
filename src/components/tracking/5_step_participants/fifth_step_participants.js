import { Col, Row } from "react-bootstrap"
import MUIDataTable from "mui-datatables"
import { useState, useEffect } from "react";
import MTConfig from "../../../utils/table_options/MT_config";
import { useSelector } from "react-redux";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { getUserService } from "../../../utils/user/service/user_services";

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
    const [selectedUsers,setSelectedUsers] = useState([])
    const user = useSelector((store) => store.user);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        setIsLoading(true);
        getUserService(user.user.token).then((result) => {
            setIsLoading(false);
            setUserData(result.result.results)
        })
    }, []);

    const getUserIds = (users) =>{
        const filterList = [...userData];
        let users_id = [];
        users.forEach(user => {
            let user_position = user.dataIndex;
            let selected_user = filterList.find((s, index) => index === user_position);
            let user_id = selected_user && selected_user.id;
            users_id.push(user_id);
        });
        return users_id;
    }

    const handleSelectUsers = (users) => {
        if(!!users.length){
            const userList = getUserIds(users);
            let selectedUsersCopy = [...selectedUsers];
            userList.map((user_id)=>{
                let indexOf = selectedUsersCopy.indexOf(user_id);
                if(indexOf === -1){
                    selectedUsersCopy.push(user_id);
                }else{
                    selectedUsersCopy.splice(indexOf,1);
                }
            })
            setSelectedUsers(selectedUsersCopy);
        }else{
            setSelectedUsers([]);
        }       
    }

    useEffect(()=>{
        handleGlobalState('integrantes',selectedUsers);
    },[selectedUsers]);
    
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
                }

            </Col>
        </Row>

    )
}

export default FifthStepParticipants