import React from "react";

// Import dependencias
import { Row, Col } from "react-bootstrap";

// Import componentes
import styles from "./styles.module.css";

const TitlePage = ({ title, fontSize, color }) => {
  return (
    <Row lg={12} md={12} sm={12} xs={12} style={{ margin: '20px 0 0 20px' }}>
      <Col className="left" lg={12} md={12} sm={12} xs={12} style={{ padding: 0 }}>
        <h2 className={styles.title} style={{fontSize:fontSize, color:color}}>{title}</h2>
      </Col>
    </Row>
  );
};

export default TitlePage;
