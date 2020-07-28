
//IMPORTS

import './app.css'
import './alerts.css'
import Auth from '../src/utils/Auth';
import Header from '../src/components/commons/Header/Header';

//DEPENDENCIAS

import { wrapper } from "../redux/store";
import Head from "next/head";
import Alert from "react-s-alert";
import { useEffect } from 'react';
import "react-s-alert/dist/s-alert-css-effects/stackslide.css";
import SideBar from '../src/components/commons/sidebar/SideBar';
import { Row, Col } from 'react-bootstrap';


//APLICACIÓN

const App = ({ Component, pageProps, router }) => {

  //COMENTAR ESTE CÓDIGO HASTA TENER EL LOGIN LISTO

  /* useEffect(() => {

    let authUser = Auth.checkAuth();
    

    if (authUser.user.isLoggedIn && router.route.match("/")) {
      router.push("/dashboard");
    }
    if (authUser.user.isLoggedIn && router.route.match(/(register)/)) {
      router.push("/dashboard");
    }
    if (router.route.match(/(dashboard)/) && !authUser.user.isLoggedIn) {
      router.push("/");
    }
  }, []);
 */

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
        <>
          <Row lg={12} md={12} sm={12} xs={12} style={{ margin: 0 }}>
            <Col lg={12} md={12} sm={12} xs={12} style={{ padding: 0 }}>
              <Header />
            </Col>
            <div>
              <SideBar />
            </div>
            <Col
              id="component_container"
              lg={12}
              md={12}
              sm={12}
              xs={12}
            >
              <Component {...pageProps} />
            </Col>
          </Row>
        </>
      ) :
        <Component {...pageProps} />
      }

    </div>

  )
}

export default wrapper.withRedux(App);