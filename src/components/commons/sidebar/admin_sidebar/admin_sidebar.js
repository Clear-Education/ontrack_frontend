import React, { useState, useEffect } from "react";

// Import dependencias
import { Row, Col } from "react-bootstrap";
import Link from "next/link";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useRouter } from "next/router";

// Import componentes
import styles from "../index.module.css";
import { useDispatch, useSelector } from "react-redux";
import Alert from "react-s-alert";
import { logoutAction } from "../../../../../redux/actions/userActions";
//import { Stats, Clients, MessageTemplate } from "../icons";

const AdminSideBar = () => {
  const [selected, setSelected] = useState(undefined);
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const router = useRouter();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down(768));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSelected(window.location.href.match(/\/([^\/]+)\/?$/)[1]);
  }, [router.route]);

  const logout = () => { 
    setLoading(true);
    dispatch(logoutAction(user.user.token)).then((result) => {
    if (result) {
        router.push("/");
        Alert.success("¡Sesión finalizada correctamente!", {
          position: "bottom",
          effect: "stackslide",
        });
      }
    });
  };


  const getSelected = (element) => {
    if (!fullScreen) {
      if (selected === element) {
        return {
          backgroundColor: 'white',
          width: '5px',
          height: '70%',
          display: 'inline-block',
          position: 'absolute',
          left: '-15px',
          borderRadius: '10px',
        };
      } else {
        return {};
      }
    }
  };

  const changeSelected = (element) => {
    setSelected(element);
  };

  return (
    <>
      <div className={styles.sidebar_container}>
        <Row className="center" lg={12} md={12} sm={12} xs={12}>
          <Col
            className={styles.responsive_col}
            style={{ padding: '0px' }}
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
                title="Cuentas de usuario"
                onClick={changeSelected.bind(this, "dashboard")}
              >
                <div style={getSelected("dashboard")} />
                <img src="/icons/curricula.svg" style={{ width: '30%', display: 'inline' }} />
                <p style={{ marginTop: '10px' }} className={styles.nav_text}>
                  Estructura Curricular
              </p>

              </Col>
            </Link>
          </Col>

          <Col
            className={styles.responsive_col}
            style={{ padding: '0px' }}
            lg={12}
            md={12}
            sm={12}
            xs={12}
          >
            <Link href="/dashboard/students">
              <Col
                lg={7}
                md={7}
                sm={7}
                xs={7}
                className={styles.navigations_container}
                title="Cuentas de usuario"
                onClick={changeSelected.bind(this, "students")}
              >
                <div style={getSelected("students")} />
                <img src="/icons/students.svg" style={{ width: '30%', display: 'inline' }} />
                <p style={{ marginTop: '10px' }} className={styles.nav_text}>
                  Alumnos
              </p>
              </Col>
            </Link>
          </Col>

          <Col
            className={styles.responsive_col}
            style={{ padding: '0px' }}
            lg={12}
            md={12}
            sm={12}
            xs={12}
          >
            <Link href="/dashboard/calendar">
              <Col
                lg={7}
                md={7}
                sm={7}
                xs={7}
                className={styles.navigations_container}
                title="Cuentas de usuario"
                onClick={changeSelected.bind(this, "calendar")}
              >
                <div style={getSelected("calendar")} />
                <img src="/icons/calendar.svg" style={{ width: '30%', display: 'inline' }} />
                <p style={{ marginTop: 10 }} className={styles.nav_text}>
                  Calendario
              </p>
              </Col>
            </Link>
          </Col>

          <Col
            className={styles.responsive_col}
            style={{ padding: 0 }}
            lg={12}
            md={12}
            sm={12}
            xs={12}
          >
            <Link href="/dashboard/data">
              <Col
                lg={7}
                md={7}
                sm={7}
                xs={7}
                className={styles.navigations_container}
                title="Cuentas de usuario"
                onClick={changeSelected.bind(this, "data")}
              >
                <div style={getSelected("data")} />
                <img src="/icons/data_upload.svg" style={{ width: '30%', display: 'inline' }} />
                <p style={{ marginTop: '10px' }} className={styles.nav_text}>
                  Carga de datos
              </p>
              </Col>
            </Link>
          </Col>

          <Col
            className={styles.responsive_col}
            style={{ padding: '0px' }}
            lg={12}
            md={12}
            sm={12}
            xs={12}
          >
            <Link href="/dashboard/accounts">
              <Col
                lg={7}
                md={7}
                sm={7}
                xs={7}
                className={styles.navigations_container}
                title="Cuentas de usuario"
                onClick={changeSelected.bind(this, "accounts")}
              >
                <div style={getSelected("accounts")} />
                <img src="/icons/accounts.svg" style={{ width: '30%', display: 'inline' }} />
                <p style={{ marginTop: 10 }} className={styles.nav_text}>
                  Cuentas
              </p>
              </Col>
            </Link>
          </Col>

          <Col
            className={styles.logout_container}
            style={{ padding: '0px' }}
            onClick={logout}
            lg={12}
            md={12}
            sm={12}
            xs={12}
          >
            <Col
              lg={7}
              md={7}
              sm={7}
              xs={7}
              className={styles.navigations_container}
              title="Cerrar sesión"
            >
              <img src="/icons/logout_icon.svg" style={{ width: '30%', display: 'inline' }} />
              <p style={{ marginTop: 10 }} className={styles.nav_text}>
                Cerrar Sesión
              </p>
            </Col>
          </Col>

        </Row>
      </div>
    </>
  );
};

export default AdminSideBar;
