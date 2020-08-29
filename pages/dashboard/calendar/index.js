import { useState } from 'react';
import { useSelector } from 'react-redux';
import useSWR, { mutate } from 'swr';
import config from '../../../src/utils/config';
import styles from './index.module.css';
import TitlePage from "../../../src/components/commons/title_page/title_page";
import { Row, Col } from "react-bootstrap";
import { IconButton } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';

import BackgroundLoader from "../../../src/components/commons/background_loader/background_loader";
import Modal from "../../../src/components/commons/modals/modal";
import DeleteForm from "../../../src/components/commons/delete_form/deleteForm";
import { addSchoolYearService, getSchoolYearService, editSchoolYearService, deleteSchoolYearService } from '../../../src/utils/school_year/services/school_year_services';
import SchoolYearForm from '../../../src/components/calendar/forms/add_edit_form/school_year_form';


const Calendar = () => {

  const url = `${config.api_url}/anio/anio_lectivo/list`;
  const [selectedData, setSelectedData] = useState()
  const user = useSelector((store) => store.user);
  const [isLoading, setIsLoading] = useState(false);

  let { data } = useSWR(url, () => {
    setIsLoading(true);
    return getSchoolYearService(user.user.token).then((result) => {
      setIsLoading(false)
      return result.result
    })
  }
  );

  async function addSchoolYear(e, data) {
    e.preventDefault();
    setIsLoading(true);
    return await addSchoolYearService(user.user.token, data).then((result) => {
      setIsLoading(false);
      mutate(url);
      return result;
    })
  }

  async function editSchoolYear(e, data) {
    e.preventDefault();
    setIsLoading(true);
    return await editSchoolYearService(user.user.token, data).then((result) => {
      setIsLoading(false);
      mutate(url);
      return result;
    })
  }

  async function deleteSchoolYear(e, data) {
    e.preventDefault();
    setIsLoading(true);
    return await deleteSchoolYearService(user.user.token, data).then((result) => {
      setIsLoading(false);
      mutate(url);
      return result;
    })
  }

  return (
    <>
      <Row lg={12} md={12} sm={12} xs={12}>
        <Col lg={11} md={11} sm={11} xs={11} style={{ margin: 'auto' }}>
          <Row>
            <Col>
              <TitlePage title="Año Lectivo" />
            </Col>
            <Col className={styles.add_new_structure}>
              <Modal
                title="Nuevo Año Lectivo"
                body={<SchoolYearForm handleSubmitAction={addSchoolYear} />}
                button={
                  <button className="ontrack_btn add_btn">Nuevo Año Lectivo</button>
                }
              />
            </Col>
          </Row>

          <div className={styles.structure_container}>
            {isLoading && <BackgroundLoader show={isLoading} />}
            <Row lg={12} md={12} sm={12} xs={12} style={{ margin: 'auto' }}>
              <Col lg={12} md={12} sm={12} xs={12} className={styles.structure_items_container}>
                {data && !!data.length ? data.map((school_year, i) => {
                  return (
                    <Row lg={12} md={12} sm={12} xs={12} key={i}>
                      <Col lg={12} md={12} sm={12} xs={12} className={styles.structure_item_container}>
                        <Row lg={12} md={12} sm={12} xs={12} style={{ width: '100%' }} >

                          <Col lg={9} md={9} sm={9} xs={9} className={styles.detail_container}>
                            <div className={styles.color_item} style={{ backgroundColor: "orange" }} />
                            <span className={styles.name_item}>{school_year.nombre.toUpperCase()}</span>
                            <span style={{ color: "gray" }} className={styles.name_item}>{`Fecha Inicio: ${school_year.fecha_desde}`}</span>
                            <span style={{ color: "gray" }} className={styles.name_item}>{`Fecha Fin: ${school_year.fecha_hasta}`}</span>
                            <span className={styles.action_container}></span>
                          </Col>

                          <Col lg={3} md={3} sm={3} xs={3} className={styles.actions_container}>
                            <Modal
                              title="¿Seguro que deseas eliminar este año lectivo?"
                              body={<DeleteForm data={selectedData} handleSubmitAction={deleteSchoolYear} />}
                              button={
                                <IconButton onClick={() => setSelectedData(school_year)} >
                                  <Delete />
                                </IconButton>
                              }
                            />
                            <Modal
                              title="Editar Año Lectivo"
                              body={<SchoolYearForm data={selectedData} handleSubmitAction={editSchoolYear} showTable={true} />}
                              button={
                                <IconButton onClick={() => setSelectedData(school_year)} >
                                  <EditIcon />
                                </IconButton>
                              }
                            />

                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  )
                })
                  :
                  <span className={styles.no_data_msg}>{!isLoading ? "No se han encontrado años lectivos, ¡Creá uno!" : "Cargando..."}</span>
                }
              </Col>

            </Row>
          </div>
        </Col>
      </Row>

    </>

  )


}
export default Calendar;