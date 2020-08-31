import TitlePage from "../../commons/title_page/title_page";
import { Row, Col } from "react-bootstrap";
import styles from './department.module.css'
import { useSelector } from "react-redux";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import config from "../../../utils/config";
import Alert from "react-s-alert";
import DepartmentForm from "./forms/department_form";
import { IconButton } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import BackgroundLoader from "../../commons/background_loader/background_loader";
import Modal from "../../commons/modals/modal";
import DeleteForm from "../../commons/delete_form/deleteForm";
import { addDepartmentService, editDepartmentService, deleteDepartmentService, getDepartmentService } from "../../../utils/department/services/department_services";
import { motion } from "framer-motion";

const Department = (props) => {

  const url = `${config.api_url}/carrera/list`
  const [selectedData, setSelectedData] = useState();
  const [departmentData, setDepartmentData] = useState();
  const user = useSelector((store) => store.user);
  const [isLoading, setIsLoading] = useState(false)

  const handleNextStep = (department_id) => {
    props.handleNextStep("year", department_id)
  }


  useSWR(url, () => {
    setIsLoading(true)
    return getDepartmentService(user.user.token).then((result) => {
      setIsLoading(false)
      if (result.success) {
        setDepartmentData(result.result)
      }
    })
  }
  );

  async function addDepartment(e, data) {
    e.preventDefault();
    setIsLoading(true);
    return await addDepartmentService(user.user.token, data).then((result) => {
      setIsLoading(false);
      mutate(url);
      return result;
    })
  }

  async function editDepartment(e, data) {
    e.preventDefault();
    setIsLoading(true);
    return await editDepartmentService(user.user.token, data).then((result) => {
      setIsLoading(false);
      mutate(url);
      return result;
    })
  }

  async function deleteDepartment(e, data) {
    e.preventDefault();
    setIsLoading(true);
    return await deleteDepartmentService(user.user.token, data).then((result) => {
      setIsLoading(false);
      mutate(url);
      return result;
    })
  }


  return (
    <>
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Row lg={12} md={12} sm={12} xs={12}>
          <Col lg={11} md={11} sm={11} xs={11} style={{ margin: 'auto' }}>
            <Row>
              <Col>
                <TitlePage title="Especialidades" />
              </Col>
              <Col className={styles.add_new_structure}>
                <Modal
                  title="Agregar Carrera"
                  body={<DepartmentForm handleSubmitAction={addDepartment} />}
                  button={<button className="ontrack_btn add_btn">Nueva Carrera</button>
                  }
                />
              </Col>
            </Row>

            <div className={styles.structure_container}>
              {isLoading && <BackgroundLoader show={isLoading} />}
              <Row lg={12} md={12} sm={12} xs={12} style={{ margin: 'auto' }}>
                <Col lg={12} md={12} sm={12} xs={12} className={styles.structure_items_container}>
                  {departmentData && !!departmentData.length ? departmentData.map((department, i) => {
                    return (
                      <Row lg={12} md={12} sm={12} xs={12} key={i}>
                        <Col lg={12} md={12} sm={12} xs={12} className={styles.structure_item_container}>
                          <Row lg={12} md={12} sm={12} xs={12} style={{ width: '100%' }} >

                            <Col lg={9} md={9} sm={9} xs={9} className={styles.detail_container}>
                              <div className={styles.color_item} style={{ backgroundColor: department.color }} />
                              <span className={styles.name_item}>{department.nombre.toUpperCase()}</span>
                              <span className={styles.action_container}></span>
                            </Col>

                            <Col lg={3} md={3} sm={3} xs={3} className={styles.actions_container}>

                              <Modal
                                title="Editar Carrera"
                                body={<DepartmentForm handleSubmitAction={editDepartment} data={selectedData} />}
                                button={
                                  <IconButton onClick={() => setSelectedData(department)} >
                                    <EditIcon />
                                  </IconButton>
                                }
                              />

                              <Modal
                                title="¿Seguro que deseas eliminar esta carrera?"
                                body={<DeleteForm data={selectedData} handleSubmitAction={deleteDepartment} />}
                                button={
                                  <IconButton onClick={() => setSelectedData(department)} >
                                    <Delete />
                                  </IconButton>
                                }
                              />

                              <IconButton onClick={() => handleNextStep(department.id)}>
                                <ArrowForwardIosIcon />
                              </IconButton>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    )
                  })
                    :
                    <span className={styles.no_data_msg}>{!isLoading ? "No se han encontrado especialidades, ¡Creá una!" : "Cargando..."}</span>
                  }
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </motion.div>
    </>
  )

}


export default Department;