import { Row, Col } from "react-bootstrap";
import TitlePage from "../../../src/components/commons/title_page/title_page";
import styles from './index.module.css';
import Link from "next/link";

const Data = () => {

  return (
    <>
      <Row lg={12} md={12} sm={12} xs={12}>
        <Col lg={11} md={11} sm={11} xs={11} style={{ margin: 'auto' }}>
          <TitlePage title="Carga de datos" />
          <div className={styles.structure_container}>
            <Row lg={12} md={12} sm={12} xs={12} style={{ width: '100%' }}>
              <Col lg={4} md={4} sm={4} xs={4}>
                <Link href="/dashboard/asistencias">
                  <div className={styles.item_area_container}>
                    <div className={styles.items_container}>
                      <img src="/icons/asistencia.svg" style={{ width: '30px', display: 'block' }} />
                      <p className={styles.item_area_text}> Asistencia </p>
                    </div>
                  </div>
                </Link>
              </Col>
              <Col lg={4} md={4} sm={4} xs={4}>
                <Link href="/dashboard/notas">
                  <div className={styles.item_area_container}>
                    <div className={styles.items_container}>
                      <img src="/icons/notas.svg" style={{ width: '30px', display: 'block' }} />
                      <p className={styles.item_area_text}> Notas </p>
                    </div>
                  </div>
                </Link>
              </Col>
              <Col lg={4} md={4} sm={4} xs={4}>
                <Link href="/dashboard/cursos">
                  <div className={styles.item_area_container}>
                    <div className={styles.items_container}>
                      <img src="/icons/curso.svg" style={{ width: '40px', display: 'block' }} />
                      <p className={styles.item_area_text}> Cursos </p>
                    </div>
                  </div>
                </Link>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

    </>
  )

}


export default Data;