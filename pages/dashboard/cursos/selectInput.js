import { useState, useEffect } from "react";

import FormControl from "@material-ui/core/FormControl";
import { InputLabel, Select, MenuItem } from "@material-ui/core";
import { getYearService } from "../../../src/utils/year/services/year_services";
import config from "../../../src/utils/config";
import { useSelector } from "react-redux";
import useSWR from "swr";
import { getDepartmentService } from "../../../src/utils/department/services/department_services";
import { getCourseService } from "../../../src/utils/course/services/course_services";
import { getSchoolYearService } from "../../../src/utils/school_year/services/school_year_services";


const INITIAL_STATE = {
    anio_lectivo: '',
    department: '',
    year: '',
    curso: ''
}
const SelectInput = ({ type, data, changeAction }) => {

    const [renderType, setRenderType] = useState();
    const [state, setState] = useState(data ? data : INITIAL_STATE);
    const user = useSelector((store) => store.user)
    const [schoolYearData, setSchoolYearData] = useState(null)
    const [departmentData, setDepartmentData] = useState(null)
    const [yearData, setYearData] = useState(null)
    const [courseData, setCourseData] = useState(null)

    const handleChange = (prop) => (event) => {
        changeAction(prop, event.target.value);
    };

    useEffect(() => {
        setState(data);
    }, [data]);

    useEffect(() => {
        if (type === 'department') {
            getDepartmentService(user.user.token).then((result) => {
                setDepartmentData(result.result);
            })
        }
    }, [])

    useEffect(() => {
        if (type === 'anio_lectivo') {
            getSchoolYearService(user.user.token).then((result) => {
                setSchoolYearData(result.result);
            })
        }
    }, [state.department])


    useEffect(() => {
        if (state.department !== '' && state.anio_lectivo !== '' && type === 'year') {
            getYearService(user.user.token, state.department).then((result) => {
                setYearData(result.result);
            })
        }
    }, [state.anio_lectivo])

    useEffect(() => {
        if (state.year !== '' && type === 'curso') {
            getCourseService(user.user.token, state.year).then((result) => {
                setCourseData(result.result);
            })
        }
    }, [state.year])

    useEffect(() => {
        setRenderType(type);
    }, [type])

    return (
        <>
            {renderType === 'department' ?
                <FormControl variant="outlined">
                    <InputLabel id="department">Carrera</InputLabel>
                    <Select
                        labelId="department"
                        id="department"
                        value={state.department}
                        onChange={handleChange("department")}
                    >
                        <MenuItem value="">
                            <em>Seleccionar</em>
                        </MenuItem>
                        {departmentData && departmentData.map((department) => {
                            return (
                                <MenuItem value={department.id} key={department.id}>{department.nombre}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
                : renderType === 'anio_lectivo' ?
                    <FormControl variant="outlined">
                        <InputLabel id="anio_lectivo">Año Lectivo</InputLabel>
                        <Select
                            labelId="anio_lectivo"
                            id="anio_lectivo"
                            value={state.anio_lectivo}
                            onChange={handleChange("anio_lectivo")}
                        >
                            <MenuItem value="">
                                <em>Seleccionar</em>
                            </MenuItem>
                            {schoolYearData && schoolYearData.map((department) => {
                                return (
                                    <MenuItem value={department.id} key={department.id}>{department.nombre}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                    : renderType === 'year' ?
                        <FormControl variant="outlined">
                            <InputLabel id="department">Año</InputLabel>
                            <Select
                                labelId="year"
                                id="year"
                                value={state.year}
                                onChange={handleChange("year")}
                                disabled={state.department === ''}
                            >
                                <MenuItem value="">
                                    <em>Seleccionar</em>
                                </MenuItem>
                                {yearData && yearData.map((year) => {
                                    return (
                                        <MenuItem value={year.id} key={year.id}>{year.nombre}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                        :
                        <FormControl variant="outlined">
                            <InputLabel id="curso">Curso</InputLabel>
                            <Select
                                labelId="curso"
                                id="curso"
                                value={state.curso}
                                disabled={state.year === ''}
                                onChange={handleChange("curso")}
                            >
                                <MenuItem value="">
                                    <em>Seleccionar</em>
                                </MenuItem>
                                {courseData && courseData.map((course) => {
                                    return (
                                        <MenuItem value={course.id} key={course.id}>{course.nombre}</MenuItem>
                                    )
                                })}

                            </Select>
                        </FormControl>
            }

        </>

    )
}

export default SelectInput