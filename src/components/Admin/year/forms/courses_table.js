import React from 'react';
import MaterialTable from 'material-table';
import { useState } from 'react';
import { useSelector } from "react-redux";
import { addCoursesService, editCoursesService, deleteCoursesService } from '../../../../utils/course/services/course_services';
import MTConfig from '../../../../utils/table_options/MT_config';



export default function CoursesTable(props) {
    const [yearCourses, setYearCourses] = useState(props.data.cursos !== [] ? props.data.cursos : []);
    const user = useSelector((store) => store.user);
    const [state, setState] = React.useState({
        columns: [
            { title: 'Nombre', field: 'nombre' },
            {
                title: '', field: 'id', editable: 'never', render: () => null,
                editComponent: props => (
                    <input
                        type="text"
                        value={props.value}
                        onChange={e => props.onChange(e.target.value)}
                    />
                )
            },


        ],
        data:
            props.data ?
                props.data.cursos.map((curso) => {
                    return {
                        id: curso.id,
                        nombre: curso.nombre
                    }
                }) :
                [{}]
        ,
    });


    return (
        <MaterialTable
            title={<span
                style={{
                    position: 'absolute',
                    top: '25px',
                    fontWeight: 600
                }}
            >Cursos</span>}
            options={MTConfig("Cursos").options}
            components={MTConfig().components}
            localization={MTConfig().localization}

            columns={state.columns}
            data={state.data}
            editable={{
                onRowAdd: (newData) => {
                    setState((prevState) => {
                        const data = [...prevState.data];
                        data.push(newData);
                        return { ...prevState, data };
                    });
                    const { nombre } = newData;
                    let data = {
                        nombre,
                        anio: props.data.id,
                    }

                    return addCoursesService(user.user.token, data).then((result) => {
                        return result;
                    })

                },
                onRowUpdate: (newData, oldData) => {
                    if (oldData) {
                        setState((prevState) => {
                            if (newData.nombre == "") {
                                return { ...prevState }
                            } else {
                                const data = [...prevState.data];
                                data[data.indexOf(oldData)] = newData;
                                return { ...prevState, data };
                            }

                        });
                    }
                    const { id, nombre } = newData;
                    let data = {
                        id,
                        nombre
                    }
                    return editCoursesService(user.user.token, data).then((result) => {
                        return result;
                    })
                },
                onRowDelete: (oldData) => {
                    setState((prevState) => {
                        const data = [...prevState.data];
                        data.splice(data.indexOf(oldData), 1);
                        return { ...prevState, data };
                    });
                    const { id } = oldData;
                    return deleteCoursesService(user.user.token, id).then((result) => {
                        return result;
                    })
                },
            }}
        />
    );
}