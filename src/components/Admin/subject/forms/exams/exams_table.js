import MaterialTable from "material-table";
import { useState, useEffect } from "react";
import styles from './styles.module.css'
import { MTConfig } from "../../../../../utils/table_options/material_table/MT_config";
import useSWR from "swr";
import { useSelector } from "react-redux";
import { getExamsService } from "../../../../../utils/exam/services/exam_services";
import config from "../../../../../utils/config";


const ExamsTable = (props) => {

    const [selectedData, setSelectedData] = useState(props.data)
    const url = `${config.api_url}/materia/${selectedData.id}/evaluacion/list/`
    const user = useSelector((store) => store.user);
    const [isLoading, setIsLoading] = useState(false)
    const [columns, setColumns] = useState([
        { title: 'Nombre', field: 'nombre' },
        { title: 'Ponderación', field: 'ponderacion' },
        { title: 'Año lectivo', field: 'anio_lectivo', type: 'numeric' },
    ]);


    useEffect(() => {
        console.log(selectedData)
    }, [selectedData])

    let { data } = useSWR(url, () => {
        setIsLoading(true);
        return getExamsService(user.user.token, selectedData.id).then((result) => {
            setIsLoading(false)
            return result.result
        })
    }
    );

    return (
        <MaterialTable
            title={<span style={{ position: 'absolute', top: '25px', fontWeight: 600 }}>Exámenes</span>}
            columns={columns}
            data={data}
            components={MTConfig.components}
            options={MTConfig.options}
            localization={MTConfig.localization}

            editable={{
                onRowAdd: newData =>
                    console.log(newData),
                onRowUpdate: (newData, oldData) =>
                    console.log(newData),
                onRowDelete: oldData =>
                    console.log(oldData),
            }}
        />
    )
}

export default ExamsTable;