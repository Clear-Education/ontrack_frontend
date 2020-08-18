import { MTableToolbar } from "material-table";

export const MTConfig = {
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
        searchFieldStyle: { width: '30%', margin: 'auto', marginRight: '0px' },
        actionsColumnIndex: -1,
    },

    components: {
        Toolbar: props => (
            <div style={{ backgroundColor: 'var(--light-gray)' }}>
                <MTableToolbar {...props} />
            </div>
        )
    }
}