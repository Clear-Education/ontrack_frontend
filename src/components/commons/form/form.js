import React, { useState, useEffect } from "react";

// Import dependencies
import { Row, Col } from "react-bootstrap";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

// Import components
import {
  convertDate,
  toFormData,
} from "../../../utils/services/general_services";
import styles from "./styles.module.scss";
import TextFieldInput from "./inputs/textfield/textfield";
import DateInput from "./inputs/date/date";
import TimeInput from "./inputs/time/time";
import DateTimeInput from "./inputs/datetime/datetime";
import FileInput from "./inputs/file/file_input/file";
import FilesSelected from "./inputs/file/files_selected/files_selected";

// Email regex
const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Generic form that supports submit and inputs passed by props.
 * Array Ex:
 * inputs = [{
 *  type: 'text' | 'password' | 'email' | 'tel' | 'number' | 'date' | 'time' | datetime | 'select' | 'file' - IS REQUIRED,
 *  hidden: <boolean> - NOT REQUIRED - Makes input hidden. Default false.
 *  passIcons: Object only for password type to change default visibilities icon buttons. Must pass in a show property, the html element to show password and in hide property the html element to hide password. Ex: passIcons: {show: <span>Mostrar</span>, hide: <span>No mostrar</span>}
 *  name: '<String>' - IS REQUIRED - This name will be  the object property of the state. Must be lowercase and all different beetwen Objects.',
 *  label: '<String>' - IS REQUIRED, NOT FOR FILE TYPE -  Label of the input7
 *  validatable: <boolean> - NOT REQUIRED - Makes input validatable. Default value false. DOESNT WORK ON DATE TYPE INPUT. For password input validation is for 8 char or more, for email, checks on a regex and rest check to be more than 1 char. If you want to change validation do it in this file.
 *  value: <DateTime Object> or <String> - NOT REQUIRED - initial value of the input to make form editable, all values must be strings, even numbers, except for date, time and datetime inputs that can be a date object or string also.
 *  options: <Object>Array - REQUIERED WHEN type === 'select' - Selectable options for the select
 *  multiline: <Object>. Ex: { rows: 2, rowsMax: 5 } - NOT REQUIRED and combinable properties - Default value false,
 *  variant: 'outlined' | 'filled' | 'standard' - NOT REQUIRED - Default value 'standard',
 *  required: <boolean>  - NOT REQUIRED - Default value false,
 *  autofocus: <boolean>  - NOT REQUIRED - Default value false,
 *  disabled: <boolean> - NOT REQUIRED - Default value false,
 *  readOnly: <boolean> - NOT REQUIRED - Default value false,
 *  startAdornment: Html element or component to show as detail at de beginning of the input
 *  endAdornment: Html element or component to show as detail at de end of the input
 *  helperTexts: <String>Array - NOT REQUIRED - Strings to be show as helpers for that input
 *  dialogMessages: <Object> - NOT REQUIRED - Only for date, time or datetime inputs - Change labels of date selector dialog. Ex: dialogMessages: { cancelLabel: "Cancelar", clearLabel: "Restablecer", okLabel: "Aceptar" }
 *  fileAreaDisabled: <boolean> - NOT REQUIRED - Makes selectable input file area disabled. Default false.
 *  fileAreaIcon: <Object> - Icon component or html element to be render as the representative icon. If not setted, blank space will be placed.
 *  fileAreaTitle: <Object> - Title and title size of the input file area. Ex: { text: "Selecciona una imagen", size: 18 }. If not setted, blank space will be placed.
 *  fileAreaDescription: <Object> - Description and description size of the input file area. Ex: { text: "(800px X 800px es el tamaño recomendado. Máximo 5MB)", size: 14 }. If not setted, blank space will be placed.
 *  fileType: <String> - Html file type accept
 *  fileAcceptMultiple: <boolean> - NOT REQUIRED - Makes input accepts multiples files. Default false.
 * }]
 * @param {any} inputs - <Object>Array. Each Object in array corresponds to one field to show in form
 * @param {Promise} handleSubmit - Promise Object that handles form submit. MUST BE A PROMISE.
 * @param {any} button - Html element or component to render as body of modal
 * @param {boolean} resultToFormData - boolean to make submit form a FormData or plain json. False by default(plain json)
 *
 * General styles must be changed and are setted in global.scss file
 */

// Component
const Form = ({
  inputs,
  handleSubmit,
  button,
  resultToFormData = false,
  closeModal,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({});
  const [validations, setValidations] = useState({});
  const [passwordsVisibilities, setPasswordsVisibilities] = useState({});
  const [dates, setDates] = useState({});

  useEffect(() => {
    inputs.forEach((input) => {
      if (input.value && !state[input.name]) {
        handleSetDefaultValue(input.type, input.name, input.value);
      }
    });
  }, []);

  const validate = (type, name, value) => {
    if (type === "email") {
      setValidations({
        ...validations,
        [name]: !email_regex.test(value.toLowerCase()),
      });
    } else if (type === "password") {
      setValidations({
        ...validations,
        [name]: !(value.split("").length >= 8),
      });
    } else if (type !== "select") {
      setValidations({
        ...validations,
        [name]: !(value.trim().length > 0),
      });
    }
  };

  const handleChange = (type, name) => (event) => {
    setState({ ...state, [name]: event.target.value });
    validate(type, name, event.target.value);
  };

  const handleChangeDate = (prop, date, type) => {
    setDates({ ...dates, [prop]: date });
    setState({ ...state, [prop]: convertDate(date, type) });
  };

  const handleSetDefaultValue = (type, name, value) => {
    if (type === "date" || type === "time" || type === "datetime") {
      const newDate = new Date(value);
      setDates((prevDates) => ({ ...prevDates, [name]: newDate }));
      setState((prevState) => ({
        ...prevState,
        [name]: convertDate(newDate, type),
      }));
    } else if (type !== "file") {
      setState((prevState) => ({ ...prevState, [name]: value }));
      validate(type, name, value);
    }
  };

  const handleClickShowPassword = (prop) => (event) => {
    setPasswordsVisibilities({
      ...passwordsVisibilities,
      [prop]: !passwordsVisibilities[prop],
    });
  };

  const fileAccept = (name, multiple, files) => {
    if (multiple) {
      const newFiles = [];
      Array.from(files).forEach((el) => {
        newFiles.push(el);
      });
      setState({ ...state, [name]: newFiles });
    } else {
      let previewEl = document.getElementById(`${name}_img_preview`);
      previewEl.src = window.URL.createObjectURL(files[0]);
      setState({ ...state, [name]: files[0] });
    }
  };

  const handleSubmitAction = () => {
    const dataToSend = resultToFormData ? toFormData(state) : state;
    setIsLoading(!isLoading);
    handleSubmit(dataToSend).then(() => {
      setIsLoading(!isLoading);
      closeModal && closeModal();
    });
  };

  return (
    <Row lg={12} md={12} sm={12} xs={12}>
      <Col lg={11} md={11} sm={11} xs={11} className="margin-center">
        <Row lg={12} md={12} sm={12} xs={12}>
          {inputs.map(
            (input, key) =>
              !input.hidden && (
                <Col
                  key={key}
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  className="inputs-container"
                >
                  <FormControl
                    variant={input.variant ? input.variant : "standard"}
                  >
                    {input.type !== "date" &&
                    input.type !== "time" &&
                    input.type !== "datetime" &&
                    input.type !== "file" ? (
                      <TextFieldInput
                        input={input}
                        state={state}
                        validations={validations}
                        passwordsVisibilities={passwordsVisibilities}
                        handleChange={handleChange}
                        handleClickShowPassword={handleClickShowPassword}
                      />
                    ) : input.type === "date" ? (
                      <DateInput
                        input={input}
                        handleChangeDate={handleChangeDate}
                        dates={dates}
                      />
                    ) : input.type === "time" ? (
                      <TimeInput
                        input={input}
                        handleChangeDate={handleChangeDate}
                        dates={dates}
                      />
                    ) : input.type === "datetime" ? (
                      <DateTimeInput
                        input={input}
                        handleChangeDate={handleChangeDate}
                        dates={dates}
                      />
                    ) : input.type === "file" ? (
                      <>
                        <FileInput onFilesAdded={fileAccept} input={input} />
                        <FilesSelected state={state} input={input} />
                      </>
                    ) : (
                      <div></div>
                    )}
                    {/* Helpers Space */}
                    {input.helperTexts &&
                      input.helperTexts.length > 0 &&
                      input.helperTexts.map((helperText, key) => (
                        <FormHelperText key={key}>{helperText}</FormHelperText>
                      ))}
                    {/* Validation Errors Space */}
                    {input.validatable &&
                    validations &&
                    validations[input.name] ? (
                      input.type === "email" ? (
                        <FormHelperText className={styles.errors_styles}>
                          Este campo debe tener el formato x@x.x.
                        </FormHelperText>
                      ) : input.type === "password" ? (
                        <FormHelperText className={styles.errors_styles}>
                          Este campo debe tener más de 8 caracteres.
                        </FormHelperText>
                      ) : (
                        <FormHelperText className={styles.errors_styles}>
                          Este campo no puede estar vacío.
                        </FormHelperText>
                      )
                    ) : (
                      <div></div>
                    )}
                  </FormControl>
                </Col>
              )
          )}
        </Row>
      </Col>
      <Col
        lg={11}
        md={11}
        sm={11}
        xs={11}
        className="margin-center"
        style={{ marginTop: 30, marginBottom: 30 }}
      >
        {button ? (
          <span onClick={handleSubmitAction}>{button}</span>
        ) : (
          // Change default button style here
          <button
            onClick={handleSubmitAction}
            style={{
              border: "none",
              padding: "10px 20px",
              borderRadius: 20,
              backgroundColor: "var(--main-color)",
              color: "#ffffff",
            }}
          >
            Enviar Form
          </button>
        )}
      </Col>
    </Row>
  );
};

export default Form;
