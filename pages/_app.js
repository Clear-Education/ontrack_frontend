
//IMPORTS

import './app.css'
import './alerts.css'
import Header from '../src/components/commons/header/header';

//DEPENDENCIAS

import { wrapper } from "../redux/store";
import Head from "next/head";
import Alert from "react-s-alert";
import { useEffect } from 'react';
import "react-s-alert/dist/s-alert-css-effects/stackslide.css";
import SideBar from '../src/components/commons/sidebar';
import { Row, Col } from 'react-bootstrap';
import { checkAuth } from '../src/utils/Auth';


//APLICACIÓN

const App = ({ Component, pageProps, router }) => {

  //COMENTAR ESTE CÓDIGO HASTA TENER EL LOGIN LISTO



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
      {router.route.match(/(dashboard)/i) ? (
        <Row lg={12} md={12} sm={12} xs={12}>
          <div>
            <SideBar />
          </div>
          <Col
            id="dashboard_container"
            className="center"
            lg={11}
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

    </div>

  )
}

export default wrapper.withRedux(App);