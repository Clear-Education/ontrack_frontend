import useSWR from 'swr';
import { Row, Col } from 'react-bootstrap';
import TitlePage from '../../../src/components/commons/title_page/title_page';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import MUIDataTable from 'mui-datatables';
import { getStudents } from '../../../src/utils/crud_students';
import BackgroundLoader from '../../../src/components/commons/background_loader/background_loader';
import Alert from "react-s-alert";
import config from '../../../src/utils/config';
import { motion } from "framer-motion";
import styles from './index.module.css'
import studen_table_config from '../../../src/utils/table_options/student_table';
import ModalAdd from '../../../src/components/commons/modals/modal_add/modal_add';
import AddStudentForm from '../../../src/components/student/forms/add_student_form';

const Students = (props) => {

  const [allData, setAllData] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [addStudentModal, setAddStudentModal] = useState(false)
  const user = useSelector((store) => store.user);
  const options = studen_table_config.options;
  const columns = studen_table_config.columns;

  const url = `${config.api_url}/alumnos/list`;
  useSWR(url, () => {
    setIsLoading(true);
    getStudents(user.user.token).then((result) => {
      setIsLoading(false);
      if (result.success == true) {
        setAllData(result.result.results)
      } else {
        result.result.forEach((element) => {
          Alert.error(element.message, {
            position: "bottom",
            effect: "stackslide",
          });
        });
      }
    })
  });

  const handleAddStudentModal = (value) =>{
    setAddStudentModal(value)
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
              columns={columns}
              options={options}
            />
          </Col>
          <Col className={styles.add_btn_container}>
            <button className="ontrack_btn add_btn" onClick={()=>handleAddStudentModal(true)}>
              Agregar Alumnos
            </button> 
          </Col>
        </Row>
        {addStudentModal && 
        <ModalAdd 
        title="Agregar Alumnos" 
        handleClose = {handleAddStudentModal}
        formComponent={<AddStudentForm />} 
        />
        }
      </motion.div>
    </>
  )

}


export default Students;