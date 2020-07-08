import React, { useEffect } from "react";

// Import dependencias
import { wrapper } from "../redux/store";
import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-css-effects/stackslide.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-tiny-fab/dist/styles.css";
import Router from "next/router";
import NProgress from "nprogress";

// Import Components
import Head from "next/head";
import "./app.css";
import './alerts.css';
import "./progress_bar.css";


//import Header from "../components/layouts/header/header";
//import Auth from "../utils/auth";



// Animacion de cambio de pagina
Router.events.on("routeChangeStart", () => NProgress.inc());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const MyApp = ({ Component, pageProps, router }) => {
 /*  useEffect(() => {
    
    let authUser = Auth.checkAuth();
    if (authUser.user.isLoggedIn && router.route.match(/(login)/)) {
      router.push("/dashboard");
    }
    if (authUser.user.isLoggedIn && router.route.match(/(register)/)) {
      router.push("/dashboard");
    }
    if (router.route.match(/(dashboard)/) && !authUser.user.isLoggedIn) {
      router.push("/");
    }
  }, []); */

  return (
    <div>
      <Head>
        <title>On-Track</title>
{/*        <link rel="icon" href="/ecarta.png" /> 
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
          integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
          crossOrigin="anonymous"
        /> */}
      </Head>
      <Alert timeout={5000} stack={true} />
      {router.route.match(/(dashboard)/i) /* && <Header /> */}
      <Component {...pageProps} key={router.route} />
    </div>
  );
};

export default wrapper.withRedux(MyApp);
