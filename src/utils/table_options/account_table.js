import EditIcon from '@material-ui/icons/Edit';
import { IconButton } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';

const account_table_config = {

    options: {
        downloadOptions: { filename: "Usuarios.csv" },
        viewColumns: false,
        sort: true,
        selectableRowsHeader: false,
        selectableRows: "none",
        filter: true,
        responsive: 'standard',
        textLabels: {
            body: {
                noMatch: "No se encontraron registros.",
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
    },

    columns: [
        {
            name: "id",
            label: "Id",
            options: {
                display: false,
                filter: false
            },

        },
        {
            name: "name",
            label: "Nombre",
        },
        {
            name: "surname",
            label: "Apellido",
        },
        {
            name: "dni",
            label: "DNI",
        },
        {
            name: "legajo",
            label: "Legajo",
        },
        {
            name: "cargo",
            label: "Cargo",
        },
        {
            name: "email",
            label: "Email",
        },
        {
            name: "actions",
            label: "Acciones",
            options: {
                customBodyRenderLite: (dataIndex) => {
                    return (<>
                        <IconButton onClick={() => Accounts.handleEditUser(data[dataIndex], "Editar")}>
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(data[dataIndex])}>
                            <Delete />
                        </IconButton>
                    </>)
                },
            },
        }

    ]

};

export default account_table_config;