import { MTableToolbar } from "material-table";

const MTConfig = ( _name ) => {

    return (
        {
            localization: {
                pagination: {
                    labelDisplayedRows: '{from}-{to} de {count}',
                    labelRowsSelect: 'Filas',
                    firstTooltip: 'Primer página',
                    previousTooltip: 'Página anterior',
                    nextTooltip: 'Página siguiente',
                    lastTooltip: 'Última Página',
                },
                header: {
                    actions: 'Acciones'
                },
                body: {
                    emptyDataSourceMessage: 'No se encontraron resultados',
                    filterRow: {
                        filterTooltip: 'Filtrar'
                    },
                    editRow: {
                        deleteText: 'Está seguro que desea eliminar esta fila?'
                    }
                },
                toolbar: {
                    searchPlaceholder: 'Buscar',
                    searchTooltip: 'Buscar'
                }
            },

            options: {
                rowsPerPageOptions:[5],
                rowsPerPage:5,
                searchFieldStyle: { width: '30%', margin: 'auto', marginRight: '0px' },
                actionsColumnIndex: -1,
                downloadOptions: { filename: `${_name}.csv` },
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

            components: {
                Toolbar: props => (
                    <div style={{ backgroundColor: 'var(--white)' }}>
                        <MTableToolbar {...props} />
                    </div>
                )
            }
        }
    )

}


export default MTConfig