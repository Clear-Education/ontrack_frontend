import styles from './styles.module.scss';
import { useState } from 'react';

const StudentViewer = ({ handleSelectStudent,  students }) => {

    const [selected,setSelected] = useState(0);

    const STUDENTS_DATA = students && students.map((student)=>{return student.alumno});

    const selectStudent = (index) =>{
        setSelected(index);
    }

    return (
        <>
            <div className={styles.students_container}>
                {
                    STUDENTS_DATA && STUDENTS_DATA.map((student, index) => {
                        return (
                            <>
                                <div 
                                onClick={()=>{selectStudent(index)}}
                                className={`${styles.student_container} ${index === selected ? styles.selected: ''}`}>
                                   {student.nombre}   {student.apellido}
                                </div>
                            </>
                        )
                    })
                }
            </div>
        </>
    )

}


export default StudentViewer