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

const UserSidebar = () => {
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

  const logout = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(logoutAction(user.user.token)).then((result) => {
      if (result.success) {
        router.push("/");
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
            <Link href="/dashboard/seguimientos">
              <Col
                lg={7}
                md={7}
                sm={7}
                xs={7}
                className={styles.navigations_container}
                title="Cuentas de usuario"
                onClick={changeSelected.bind(this, "seguimientos")}
              >
                <div style={getSelected("seguimientos")} />
                <img src="/icons/seguimiento.svg" style={{ width: '30%', display: 'inline' }} />
                <p style={{ marginTop: '10px' }} className={styles.nav_text}>
                  Seguimientos
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
            <Link href="/dashboard/solicitudes">
              <Col
                lg={7}
                md={7}
                sm={7}
                xs={7}
                className={styles.navigations_container}
                title="Cuentas de usuario"
                onClick={changeSelected.bind(this, "solicitudes")}
              >
                <div style={getSelected("solicitudes")} />
                <img src="/icons/application.svg" style={{ width: '30%', display: 'inline' }} />
                <p style={{ marginTop: '10px' }} className={styles.nav_text}>
                  {
                    user.user.groups === 2 ? "Mis Solicitudes" : "Solicitudes pendientes"
                  }
                </p>
              </Col>
            </Link>
          </Col>
        </Row>
        <div className={styles.logout_container} onClick={(e)=>logout(e)}>
          <img src="/icons/logout_icon.svg" style={{ width: '40px', display: 'inline' }} />
        </div>
      </div>
    </>
  );
};

export default UserSidebar;
