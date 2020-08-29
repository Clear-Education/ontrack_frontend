import useSWR, { mutate } from 'swr';
import { Row, Col } from 'react-bootstrap';
import TitlePage from '../../../src/components/commons/title_page/title_page';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MUIDataTable from 'mui-datatables';
import { getStudentsService, deleteStudentService, addStudentService, editStudentService } from '../../../src/utils/student/service/student_service';
import BackgroundLoader from '../../../src/components/commons/background_loader/background_loader';
import config from '../../../src/utils/config';
import { motion } from "framer-motion";
import styles from './index.module.css'
import AddEditStudentForm from '../../../src/components/student/forms/add_edit_student_form';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import Modal from '../../../src/components/commons/modals/modal';
import DeleteForm from '../../../src/components/commons/delete_form/deleteForm';
import MTConfig from '../../../src/utils/table_options/MT_config';

const Students = () => {

  const [allData, setAllData] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [selectedData, setSelectedData] = useState();
  const user = useSelector((store) => store.user);

  const url = `${config.api_url}/alumnos/list`;
  useSWR(url, () => {
    getStudentsService(user.user.token).then((result) => {
      setIsLoading(false);
      setAllData(result.result.results)
    })
  });


async function addStudent(e, data) {
    let parsedData = { ...data };
    Object.keys(parsedData).forEach((key) => {
      if (parsedData[key] === "") {
        delete parsedData[key];
      }
    })
    e.preventDefault();
    setIsLoading(true);
    return await addStudentService(user.user.token, parsedData).then((result) => {
      setIsLoading(false);
      mutate(url);
      return result;
    })
  }

  async function editStudent(e, data) {
    e.preventDefault();
    setIsLoading(true);
    return await editStudentService(user.user.token, data).then((result) => {
      setIsLoading(false);
      mutate(url);
      return result;
    })
  }

  async function deleteStudent(e, data) {
    e.preventDefault();
    setIsLoading(true);
    return await deleteStudentService(user.user.token, data).then((result) => {
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
        <Row lg={12} md={12} sm={12} xs={12} style={{ margin: '0 5% 0 5%' }}>
          <Row lg={12} md={12} sm={12} xs={12} style={{width:'100%'}}>
            <Col lg={6} md={6} sm={6} xs={6}>
              <TitlePage title="Alumnos" />
            </Col>
            <Col lg={6} md={6} sm={6} xs={6} className={styles.add_btn_container}>
              <Modal
                title="Agregar Alumno"
                body={<AddEditStudentForm handleSubmitAction={addStudent} />}
                button={
                  <button className="ontrack_btn add_btn">Nuevo Alumno</button>
                }
              />
            </Col>
          </Row>
          <Col
            md={12}
            sm={12}
            xs={12}
            style={{ marginTop: 20 }}
          >
            <MUIDataTable
              data={allData}
              options={MTConfig("Alumnos").options}
              localization={MTConfig().localization}
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
                        <div style={{ display: 'flex' }}>
                          <Modal
                            title="Editar Alumno"
                            body={<AddEditStudentForm data={selectedData} handleSubmitAction={editStudent} />}
                            button={
                              <IconButton onClick={() => setSelectedData(tableMeta.rowData[0])} >
                                <EditIcon />
                              </IconButton>
                            }
                          />

                          <Modal
                            title="¿Seguro que deseas eliminar este alumno?"
                            body={<DeleteForm data={selectedData} handleSubmitAction={deleteStudent} />}
                            button={
                              <IconButton onClick={() => setSelectedData(tableMeta.rowData[0])} >
                                <Delete />
                              </IconButton>
                            }
                          />
                        </div>
                      </>)
                    },
                  },
                }
              ]}
            />
          </Col>
        </Row>

      </motion.div>
    </>
  )

}


export default Students;