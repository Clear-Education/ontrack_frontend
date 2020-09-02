import React, { useState, useEffect } from "react";

// Import dependencias
import { Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import Link from "next/link";
import TextField from "@material-ui/core/TextField";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Alert from "react-s-alert";
import { useRouter } from "next/router";
import CircularProgress from "@material-ui/core/CircularProgress";

// Import componentes
import styles from "./index.module.css";

//import redux tools
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../redux/actions/userActions";

const container = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      when: "afterChildren",
    },
  },
};

const item = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -100 },
};

const LOGIN_INITIAL_STATE = {
  email: "",
  password: "",
  showPassword: false,
};

const LOGIN_VALIDATION_STATE = {
  email: false,
  password: false,
};

const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = () => {

  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((store) => store.user);
  const [loginState, setLoginState] = useState(LOGIN_INITIAL_STATE);
  const [validation, setValidation] = useState(LOGIN_VALIDATION_STATE);
  const [isLoading,setIsLoading] = useState(false);
  const hadleValidationEmail = (value) => {
    setValidation({
      ...validation,
      email: !email_regex.test(value.toLowerCase()),
    });
  };

  const hadleValidation = (prop, value) => {
    setValidation({
      ...validation,
      [prop]: !(value.split("").length > 0),
    });
  };

  const handleChange = (prop) => (event) => {
    setLoginState({ ...loginState, [prop]: event.target.value });
    if (prop === "email") {
      hadleValidationEmail(event.target.value);
    } else {
      hadleValidation(prop, event.target.value);
    }
  };

  const handleClickShowPassword = () => {
    setLoginState({ ...loginState, showPassword: !loginState.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = (event) => {
    event.preventDefault();
    if (loginState.email === "" || loginState.password === "") {
      setValidation({
        ...validation,
        email: !validation.email,
        password: !validation.password,
      });
      Alert.error("¡Debes completar todos los campos para continuar!", {
        effect: "stackslide",
      });
    } else {
      setIsLoading(true);
      dispatch(loginAction(loginState.email, loginState.password)).then(
        (status) => {
          setIsLoading(false);
          if (status) {
            router.push("/dashboard");
          }
        }
      );
    }
  };

  return !user.isLoggedIn ? (
    <Row lg={12} md={12} sm={12} xs={12} style={{ margin: 0,display:'flex', justifyContent:'center',alignItems:'center', height:'100vh' }}>
      <div id={styles.login_container}>
        <Row lg={12} md={12} sm={12} xs={12} style={{ margin: 0 }}>
          <Col
            className="center"
            lg={6}
            md={6}
            sm={0}
            xs={0}
            id={styles.left_form}
          />
          <Col
            className="center"
            lg={6}
            md={6}
            sm={12}
            xs={12}
            id={styles.right_form}
          >
            <Row lg={12} md={12} sm={12} xs={12} style={{ margin: 0 }}>
              <form id="form_login" style={{ width: "100%" }}>
                <Col
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    padding: 0,
                  }}
                  className="center"
                  lg={10}
                  md={10}
                  sm={11}
                  xs={12}
                >
                  <h3>Inicio de Sesión</h3>
                </Col>
                <motion.div
                  style={{ width: "100%" }}
                  variants={container}
                  initial="hidden"
                  animate="visible"
                >
                  <Col
                    lg={10}
                    md={10}
                    sm={11}
                    xs={12}
                    style={{
                      padding: 0,
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    <motion.div variants={item} key={1}>
                      <FormControl variant="outlined">
                        <TextField
                          id="email"
                          name="email"
                          label="Email"
                          variant="outlined"
                          value={loginState.email}
                          onChange={handleChange("email")}
                          autoFocus={true}
                          error={validation.email}
                        />
                        {validation.email && (
                          <FormHelperText
                            className="helper-text"
                            style={{ color: "rgb(182, 60, 47)" }}
                          >
                            Debe respetar el formato x@x.x
                          </FormHelperText>
                        )}
                      </FormControl>
                    </motion.div>
                    <motion.div variants={item} key={2}>
                      <FormControl variant="outlined">
                        <InputLabel
                          className="password-label"
                          htmlFor="password"
                        >
                          Contraseña
                        </InputLabel>
                        <OutlinedInput
                          id="password"
                          type={loginState.showPassword ? "text" : "password"}
                          value={loginState.password}
                          onChange={handleChange("password")}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {loginState.showPassword ? (
                                  <Visibility style={{ color: "#bebebe" }} />
                                ) : (
                                    <VisibilityOff style={{ color: "#bebebe" }} />
                                  )}
                              </IconButton>
                            </InputAdornment>
                          }
                          labelWidth={90}
                        />

                      </FormControl>
                    </motion.div>
                  </Col>
                </motion.div>
                <Col
                  className="left"
                  style={{
                    padding: 0,
                    marginTop: 30,
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  lg={10}
                  md={10}
                  sm={11}
                  xs={12}
                >
                  <Link href="/user/reset-password">
                    <a id={styles.password_reset}>Restablecer contraseña</a>
                  </Link>
                </Col>
                <Col
                  className="center"
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    padding: 0,
                  }}
                  lg={10}
                  md={10}
                  sm={11}
                  xs={12}
                >
                  <button
                    id={styles.login}
                    disabled={isLoading || user.isLoggedIn ? true : false}
                    onClick={(event)=>handleLogin(event)}
                  >
                    {isLoading ? (
                      <>
                        <CircularProgress
                          size={18}
                          color="primary"
                          className={styles.circular_progress}
                        />
                        Cargando...
                      </>
                    ) : (
                        <>Ingresar</>
                      )}
                  </button>
                </Col>
              </form>
            </Row>
          </Col>

        </Row>
      </div>
    </Row>
  ) : (
      <></>
    );
};

export default Login;
