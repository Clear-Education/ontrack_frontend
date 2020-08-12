
//IMPORTS

import './app.css'
import './alerts.css'
import Header from '../src/components/commons/header/header';

//DEPENDENCIAS

import { wrapper } from "../redux/store";
import Head from "next/head";
import Alert from "react-s-alert";
import { useEffect, useState } from 'react';
import "react-s-alert/dist/s-alert-css-effects/stackslide.css";
import SideBar from '../src/components/commons/sidebar';
import { Row, Col } from 'react-bootstrap';
import { validateLoggedInUser } from '../src/utils/Auth';
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import esLocale from "date-fns/locale/es";
import NProgress from "nprogress";
import Router from "next/router";
import "./progress_bar.css";
//APLICACIÓN

// Animacion de cambio de pagina
Router.events.on("routeChangeStart", () => NProgress.inc());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const App = ({ Component, pageProps, router }) => {

  useEffect(() => {
    let authUser = validateLoggedInUser();
    if (
      authUser !== undefined &&
      authUser.user.isLoggedIn &&
      (router.route.match(/(login)/) || router.route.match(/(register)/) || router.route.match("/"))
    ) {
      if (authUser.user.user.cargo === "user") {
        router.push("/dashboard");
      } else {
        router.push("/dashboard");
      }
    }
    if (
      authUser !== undefined &&
      router.route.match(/(dashboard)/) &&
      !authUser.user.isLoggedIn
    ) {
      router.push("/");
    }
  }, []);

/* 

//Código que protege de recargar la página

  const browserTabcloseHandler = e => {
    e.preventDefault();
    e.returnValue = "";
  };
 
  useEffect(() => {
    if (window) {
      Router.beforePopState(() => {
        const result = window.confirm("¿Seguro que quieres salir?");
        return result;
      });
      window.onbeforeunload = browserTabcloseHandler;
    }
 
    return () => {
      if (window) {
        window.onbeforeunload = null;
      }
      Router.beforePopState(() => {
        return true;
      });
    };
  }, [router]); */
 
  return (
    <div>
      <Head>
        <title>OnTrack</title>
        <link rel="icon" href="#" /> {/* TODO favicon */}
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700,800"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
          integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
          crossOrigin="anonymous"
        />
      </Head>
      <Alert timeout={3000} stack={true} />
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
        {router.route.match(/(dashboard)/i) ? (

          <Row lg={12} md={12} sm={12} xs={12}>
            <div>
              <SideBar />
            </div>
            <Col
              id="dashboard_container"
              className="center"
              lg={10}
              md={10}
              sm={12}
              xs={12}
            >
              <Header />
              <Row lg={12} md={12} sm={12} xs={12}>
                <Col
                  id="component_container"
                  className="center"
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                >

                  <Component {...pageProps} key={router.route} />

                </Col>
              </Row>
            </Col>
          </Row>
        ) :

          <Component {...pageProps} />

        }
      </MuiPickersUtilsProvider>
    </div>

  )
}

export default wrapper.withRedux(App);