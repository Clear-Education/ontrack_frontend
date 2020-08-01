// Import dependencias
import { Row, Col } from "react-bootstrap";

// Import componentes
import styles from "./header.module.css";
import PersonIcon from '@material-ui/icons/Person';
import { IconButton } from "@material-ui/core";


const Header = () => {
  return (
    <div id={styles.header_container}>
      <Row lg={12} md={12} sm={12} xs={12}>
        <Col className="left" lg={2} md={2} sm={2} xs={2} style={{ backgroundColor: 'var(--main-color-dark)', height: '60px' }}>
          <img src="./OnTrack.svg" id={styles.logo} />
        </Col>
        <Col className="right" lg={10} md={10} sm={10} xs={10}>
          <div className={styles.icons_container}>
            <Row>
              <Col>
                <IconButton>
                  <PersonIcon />
                </IconButton>
              </Col>
              <Col>
                <IconButton>
                  <PersonIcon />
                </IconButton>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
