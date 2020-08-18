import useSWR, { mutate } from 'swr';
import { Row, Col } from 'react-bootstrap';
import TitlePage from '../../../src/components/commons/title_page/title_page';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import MUIDataTable from 'mui-datatables';
import { getStudentService, deleteStudentService, addStudentService } from '../../../src/utils/student/service/student_service';
import BackgroundLoader from '../../../src/components/commons/background_loader/background_loader';
import config from '../../../src/utils/config';
import { motion } from "framer-motion";
import styles from './index.module.css'
import studen_table_config from '../../../src/utils/table_options/student_table';
import AddEditStudentForm from '../../../src/components/student/forms/add_edit_student_form';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import Modal from '../../../src/components/commons/modals/generic_modal/modal';
import DeleteForm from '../../../src/components/commons/delete_form/deleteForm';

const Students = () => {

  const [allData, setAllData] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [selectedData, setSelectedData] = useState();
  const user = useSelector((store) => store.user);
  const options = studen_table_config.options;

  const url = `${config.api_url}/alumnos/list`;
  useSWR(url, () => {
    setIsLoading(true);
    getStudentService(user.user.token).then((result) => {
      setIsLoading(false);
      setAllData(result.result.results)
    })
  });

  async function deleteStudent(e, data) {
    e.preventDefault();
    setIsLoading(true);
    return await deleteStudentService(user.user.token, data).then((result) => {
      setIsLoading(false);
      mutate(url);
      return result;
    })
  }

  async function addStudent(e, data) {
    e.preventDefault();
    setIsLoading(true);
    return await addStudentService(user.user.token, data).then((result) => {
        setIsLoading(false);
        mutate(url);
        return result;
    })
}

  return (
    <>
      {isLoading && <BackgroundLoader show={isLoading} />}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Row lg={12} md={12} sm={12} xs={12} style={{ margin: 0 }}>
          <Col lg={12} md={12} sm={12} xs={12} style={{ padding: 0 }}>
            <TitlePage title="Alumnos" />
          </Col>
        </Row>
        <Row lg={12} md={12} sm={12} xs={12} style={{ margin: '5%' }}>
          <Col
            md={12}
            sm={12}
            xs={12}
          >
            <MUIDataTable
              title={"Todos los alumnos"}
              data={allData}
              columns={[

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
                        <Row>
                          <Col>

                            <Modal
                              title="Editar Alumno"
                              formComponent={<AddEditStudentForm data={selectedData} />}
                              button={
                                <IconButton onClick={() => setSelectedData(tableMeta.rowData[0])} >
                                  <EditIcon />
                                </IconButton>
                              }
                            />
                          </Col>
                          <Col>
                            <Modal
                              title="¿Seguro que deseas eliminar este alumno?"
                              formComponent={<DeleteForm data={selectedData} handleSubmitAction={deleteStudent}  />}
                              button={
                                <IconButton onClick={() => setSelectedData(tableMeta.rowData[0])} >
                                  <Delete />
                                </IconButton>
                              }
                            />
                          </Col>
                        </Row>

                      </>)
                    },
                  },
                }
              ]}
              options={options}
            />
          </Col>
          <Col className={styles.add_btn_container}>
            <Modal
              title="Agregar Alumno"
              formComponent={<AddEditStudentForm  handleSubmitAction={addStudent} />}
              button={
                <button className="ontrack_btn add_btn">Nuevo Alumno</button>
              }
            />
          </Col>
        </Row>


      </motion.div>
    </>
  )

}


export default Students;