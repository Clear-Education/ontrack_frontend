const studen_table_config = {
  options: {
    downloadOptions: { filename: "Estudiantes.csv" },
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

};

export default studen_table_config;
