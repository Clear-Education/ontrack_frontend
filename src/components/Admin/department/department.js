import TitlePage from "../../commons/title_page/title_page";
import { Row, Col } from "react-bootstrap";
import styles from './department.module.css'
import { useSelector } from "react-redux";
import { getDepartments, newDepartment, editDepartment, deleteDepartment } from "../../../utils/department/cruds/department_cruds";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import config from "../../../utils/config";
import Alert from "react-s-alert";
import ModalAdd from "../../commons/modals/modal_add/modal_add";
import DepartmentForm from "./forms/department_form";
import { IconButton } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import BackgroundLoader from "../../commons/background_loader/background_loader";
import CircularProgress from "@material-ui/core/CircularProgress";

const Department = (props) => {

  const url = `${config.api_url}/carrera/list`
  const [addDepartmentModal, setAddDepartmentModal] = useState(false)
  const [editDepartmenttModal, setEditDepartmentModal] = useState(false)
  const [deleteDepartmenttModal, setDeleteDepartmentModal] = useState(false)
  const [selectedData, setSelectedData] = useState()
  const user = useSelector((store) => store.user);
  const [isLoading, setIsLoading] = useState(false)

  const handleAddDepartmentModal = (value) => {
    setAddDepartmentModal(value)
  }

  const handleEditDepartmentModal = (value, data) => {
    setEditDepartmentModal(value)
    setSelectedData(data);
  }
  const handleDeleteDepartmentModal = (value, data) => {
    setDeleteDepartmentModal(value)
    setSelectedData(data);
  }

  const handleNextStep = (department_id) => {
    props.handleNextStep("year", department_id)
  }


  async function handleSubmitNewDepartment(e, data) {
    e.preventDefault();
    return await newDepartment(user.user.token, data).then((result) => {
      mutate(url);
      if (result.success) {
        Alert.success("Carrera agregada correctamente", {
          position: "bottom",
          effect: "stackslide",
        });
      } else {
        result.result.forEach((element) => {
          Alert.error(element.message, {
            position: "bottom",
            effect: "stackslide",
          });
        });
      }
      return result;
    })
  }

  async function handleEditDepartment(e, data) {
    e.preventDefault();
    return await editDepartment(user.user.token, data).then((result) => {
      mutate(url);
      if (result.success) {
        Alert.success("Carrera editada correctamente", {
          position: "bottom",
          effect: "stackslide",
        });
      } else {
        result.result.forEach((element) => {
          Alert.error(element.message, {
            position: "bottom",
            effect: "stackslide",
          });
        });
      }
      return result;
    })
  }

  const handleDeleteDepartment = (e) =>{
    e.preventDefault();
    setIsLoading(true)
    deleteDepartment(user.user.token, selectedData).then((result) => {
      setIsLoading(false)
      mutate(url);
      if (result.success) {
        handleDeleteDepartmentModal(false)
        Alert.success("Carrera eliminada correctamente", {
          position: "bottom",
          effect: "stackslide",
        });
      } else {
        result.result.forEach((element) => {
          Alert.error(element.message, {
            position: "bottom",
            effect: "stackslide",
          });
        });
      }
      return result;
    })
  }

  let { data } = useSWR(url, () => {
    setIsLoading(true);
    return getDepartments(user.user.token).then((result) => {
      setIsLoading(false)
      if (result.success == true) {
        return result.result;
      } else {
        result.result.forEach((element) => {
          Alert.error(element.message, {
            position: "bottom",
            effect: "stackslide",
          });
        });
      }
    })
  }
  );


  return (
    <>
      <Row lg={12} md={12} sm={12} xs={12}>
        <Col lg={11} md={11} sm={11} xs={11} style={{ margin: 'auto' }}>
          <TitlePage title="Especialidades" />
          <div className={styles.structure_container}>
            {isLoading && <BackgroundLoader show={isLoading} />}
            <Row lg={12} md={12} sm={12} xs={12} style={{ margin: 'auto' }}>
              <Col lg={12} md={12} sm={12} xs={12} className={styles.structure_items_container}>
                {data && !!data.length ? data.map((department, i) => {
                  return (
                    <Row lg={12} md={12} sm={12} xs={12} key={i}>
                      <Col lg={12} md={12} sm={12} xs={12} className={styles.structure_item_container}>
                        <Row lg={12} md={12} sm={12} xs={12} style={{width:'100%'}} >

                          <Col lg={9} md={9} sm={9} xs={9} className={styles.detail_container}>
                            <div className={styles.color_item} style={{ backgroundColor: department.color }} />
                            <span className={styles.name_item}>{department.nombre.toUpperCase()}</span>
                            <span className={styles.action_container}></span>
                          </Col>

                          <Col lg={3} md={3} sm={3} xs={3} className={styles.actions_container}> 
                            
                              <IconButton  onClick={() => handleDeleteDepartmentModal(true, department)} >
                                <Delete/>
                              </IconButton>
                            
                              <IconButton onClick={() => handleEditDepartmentModal(true, department)}>
                                <EditIcon/>
                              </IconButton>
                        
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

              <Col lg={12} md={12} sm={12} xs={12} id={styles.add_new_structure}>
                <button
                  className="ontrack_btn add_btn"
                  onClick={() => handleAddDepartmentModal(true)}>
                  Nueva Especialidad
                </button>
                {addDepartmentModal &&
                  <ModalAdd
                    title="Nueva Especialidad"
                    handleClose={handleAddDepartmentModal}
                    formComponent={
                      <DepartmentForm
                        handleSubmitAction={handleSubmitNewDepartment}
                        handleClose={handleAddDepartmentModal}
                      />

                    }
                  />
                }
                {editDepartmenttModal &&
                  <ModalAdd
                    title="Editar Especialidad"
                    handleClose={handleEditDepartmentModal}
                    formComponent={
                      <DepartmentForm
                        handleSubmitAction={handleEditDepartment}
                        data={selectedData}
                        handleClose={handleEditDepartmentModal}
                      />
                    }
                  />
                }
                {deleteDepartmenttModal &&
                  <ModalAdd
                    title={`¿Seguro que deseas eliminar la especialidad: ${selectedData.nombre.toUpperCase()}`}
                    handleClose={handleDeleteDepartmentModal}
                    formComponent={
                      <button 
                        onClick={(e)=>handleDeleteDepartment(e)}
                        disabled={isLoading}
                        className="ontrack_btn add_btn delete_btn">
                          {!isLoading ? `Confirmar`:
                          <>
                           <CircularProgress
                             size={18}
                             color="primary"
                           />
                           Eliminando...
                         </>
                          }
                      </button>
                      }
                  />
                }
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

    </>
  )

}


export default Department;