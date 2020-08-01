import React, { useState, useEffect } from "react";

// Import dependencias
import { Row, Col } from "react-bootstrap";
import Link from "next/link";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useRouter } from "next/router";

// Import componentes
import styles from "../index.module.css";
//import { Stats, Clients, MessageTemplate } from "../icons";

const AdminSideBar = () => {
  const [selected, setSelected] = useState(undefined);
  const router = useRouter();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down(768));

  useEffect(() => {
    setSelected(window.location.href.match(/\/([^\/]+)\/?$/)[1]);
  }, [router.route]);

  const getSelected = (element) => {
    if (!fullScreen) {
      if (selected === element) {
        return {
          border: "2px solid var(--main-color)",
          color: "var(--main-color)",
        };
      } else {
        return {};
      }
    } 
  };

  const getIconColor = (element) => {
    if (selected === element) {
      return "var(--main-color)";
    } else {
      return "#8f8f8f";
    }
  };

  const changeSelected = (element) => {
    setSelected(element);
  };

  return (
    <div id={styles.sidebar_container}>
      <Row className="center" lg={12} md={12} sm={12} xs={12}>
        <Col
          className={styles.responsive_col}
          style={{ padding: 0 }}
          lg={12}
          md={12}
          sm={12}
          xs={12}
        >
          <Link href="/dashboard">
            <Col
              lg={7}
              md={7}
              sm={7} 
              xs={7}
              className={styles.navigations_container}
              title="Estadísticas"
              style={getSelected("dashboard")}
              onClick={changeSelected.bind(this, "dashboard")}
            >
              <p style={{ marginTop: 10 }} className={styles.nav_text}>
                Cuentas de usuario
              </p>
            </Col>
          </Link>
        </Col>
        
      </Row>

    </div>
  );
};

export default AdminSideBar;
