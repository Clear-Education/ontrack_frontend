import React, { useState } from "react";
import Head from 'next/head';
import { Row, Col, Container } from "react-bootstrap";
import { FormControl, InputLabel, FormHelperText, Input, TextField, Button } from '@material-ui/core';
import Auth from '../src/utils/Auth'
import Router from "next/router";

import styles from './index.module.css'

const INITIAL_STATE = {
  email: "",
  password: "",
  showPassword: false,
};

export default function Home() {

const [state, setState] = useState(INITIAL_STATE);

const login;
const handleChangeInput = (prop) => (event) => {
  setState({ ...state, [prop]: event.target.value });
  console.log(state)
};

const handleSubmit = () =>{
  Auth.login(state).then((result)=>{
    if(result.success){
      Router.push('/dashboard')
    }
  });
}

  return (
    <div className="container">
      <Head>
        <title>OnTrack - Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>

        <Row
          md={12}
          sm={12}
          xs={12}
        >
          <Col md={6} sm={6} xs={6} className={styles.login_left_container}>
            <img src="./OnTrack.svg" className={styles.img_on_track} />
            <h1 className={styles.bienvenido_login}>Bienvenido!</h1>
          </Col>

          <Col md={6} sm={6} xs={6} className={`${styles.login_rigth_container}`}>
          <div className={styles.login_container}>
              <h2 id={styles.login_title}>Iniciar Sesión</h2>      
          </div>
          
          <form  noValidate autoComplete="off">
              <TextField id="user_input" variant="outlined"  label="Usuario" className={styles.form_input} 
                onChange={handleChangeInput("email")}
              />
              <TextField id="password_input" variant="outlined"  label="Contraseña"  className={styles.form_input} 
              onChange={handleChangeInput("password")}
              />
              <Button id={styles.login_button} onClick={handleSubmit}>Ingresar</Button>
          </form>
          </Col>

        </Row>

      </Container>


    </div>

  )
}
