import TitlePage from "../../commons/title_page/title_page";
import { Row, Col } from "react-bootstrap";
import styles from './department.module.css'
import { useSelector } from "react-redux";
import { getDepartments } from "../../../utils/crud_departments";
import { useState } from "react";
import useSWR from "swr";
import config from "../../../utils/config";
import Alert from "react-s-alert";

const Department = (props) => {

  const url = `${config.api_url}/carrera/list`
  const [departments, setDepartments] = useState();
  const user = useSelector((store) => store.user);

  let { data } = useSWR(url, () =>
    getDepartments(user.user.token).then((result) => {
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
  );


  return (
    <>
      <Row lg={12} md={12} sm={12} xs={12}>
        <Col lg={11} md={11} sm={11} xs={11} style={{margin:'auto'}}>
          <TitlePage title="Especialidades" />
          <div className={styles.structure_container}>
                <Row lg={12} md={12} sm={12} xs={12}>
                  <Col lg={12} md={12} sm={12} xs={12}>
                    {data && !!data.lenght ? data.map((department) => {
                      return (
                        <h1>department</h1>
                      )
                    })
                      :
                      <span className={styles.no_data_msg}>No se han encontrado especialidades, ¡Creá una!</span>
                    }
                  </Col>

                  <Col lg={12} md={12} sm={12} xs={12} id={styles.add_new_structure}>
                    <button className="ontrack_btn add_btn">Nueva Especialidad</button>
                  </Col>
                </Row>
          </div>
        </Col>
      </Row>

    </>
  )

}


export default Department;