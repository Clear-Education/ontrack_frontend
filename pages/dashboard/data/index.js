
const Data = (props) => {

    const columns = [
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
          name: "surname",
          label: "Apellido",
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
                  <VisibilityIcon />
                </IconButton>
              </>)
            },
          },
        }
      ];
      const options = {
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
        },
      };


    return(
        <h1>Carga de datos</h1>
    )

}


export default Data;