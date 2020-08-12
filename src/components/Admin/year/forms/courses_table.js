import React from 'react';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { useState } from 'react';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};


export default function CoursesTable(props) {
    const [yearCourses, setYearCourses] = useState(props.data.cursos !== [] ? props.data.cursos : []);
    const [state, setState] = React.useState({
        columns: [
            { title: 'Name', field: 'name' },
        ],
        data:
            props.data ?
                props.data.cursos.map((curso) => {
                    return {
                        name: curso.nombre
                    }
                }) :
                [{}]
        ,
    });

    const handleSaveCourses = () => {
        props.handleSaveCourses(yearCourses);
    }


    return (
        <>
            <MaterialTable
                title="Cursos"
                columns={state.columns}
                data={state.data}
                icons={tableIcons}
                editable={{
                    /*                     onRowAdd: (newData) => {
                                            addNewCourseService(token, data).then
                                            new Promise((resolve) => {
                                                setTimeout(() => {
                                                    resolve();
                                                    setState((prevState) => {
                                                        const data = [...prevState.data];
                                                        data.push(newData);
                                                        return { ...prevState, data };
                                                    });
                                                    const coursesCopy = [...yearCourses];
                                                    const newCourse = { name: newData.name };
                                                    coursesCopy.push(newCourse);
                                                    setYearCourses(coursesCopy);
                                                }, 600);
                                            }, */
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                if (oldData) {
                                    setState((prevState) => {
                                        const data = [...prevState.data];
                                        data[data.indexOf(oldData)] = newData;
                                        return { ...prevState, data };
                                    });
                                    const coursesCopy = [...yearCourses];
                                    const newCourse = { name: newData.name };
                                    coursesCopy[coursesCopy.indexOf(oldData) + 1] = newCourse;
                                    setYearCourses(coursesCopy);
                                }
                            }, 600);
                        }),
                    onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                setState((prevState) => {
                                    const data = [...prevState.data];
                                    data.splice(data.indexOf(oldData), 1);
                                    return { ...prevState, data };
                                });
                                const coursesCopy = [...yearCourses];
                                coursesCopy.splice(coursesCopy.indexOf(oldData) + 1, 1);
                                setYearCourses(coursesCopy);

                            }, 600);
                        }),
                }}
            />
            <div className="d-flex justify-content-end mt-3">
                <button className=" ontrack_btn cancel_btn" onClick={() => handleSaveCourses()}>Guardar Cursos</button>
            </div>
        </>
    );
}