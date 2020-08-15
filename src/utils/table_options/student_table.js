import EditIcon from '@material-ui/icons/Edit';
import { IconButton} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const studen_table_config = {
    options:{
        downloadOptions: { filename: "Asociados ACHA.csv" },
        viewColumns: false,
        sort: true,
        selectableRowsHeader: false,
        selectableRows: "none",
        filter: false,
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
    
    columns : [
        
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
            },
            {
              name: "actions",
              label: "Acciones",
              options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                  return (<>
                    <IconButton onClick={() => handleViewUser(true, tableMeta)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleViewUser(true, tableMeta)}>
                      <DeleteForeverIcon />
                    </IconButton>
                  </>)
                }, 
              },
            }
    ]
    
  };

  export default studen_table_config