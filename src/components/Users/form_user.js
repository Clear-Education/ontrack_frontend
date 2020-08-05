import { Form, Row, Col, Container } from 'react-bootstrap';
import { Modal, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';


const FormUser = (props) => {
    const [validated, setValidated] = useState(false);

    const handleValidation = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        }
        else {
            event.preventDefault()
            props.handleSubmit();
        }
    };



    const handleChange = (input) => (event) => {
        props.handleChange(input, event.target.value);
    }

    return (
        <Container>
            <Form noValidate validated={validated} onSubmit={handleValidation}>
                <Form.Group as={Row} controlId="formPlaintextName">
                    <Form.Label column sm="12">
                        Nombre
                </Form.Label>
                    <Col sm="12">
                        <Form.Control
                            required
                            type="text"
                            placeholder="Nombre"
                            defaultValue={props.user.name}
                            onChange={handleChange("name")} />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Please provide a correct name!
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintextPassword">
                    <Form.Label column sm="12">
                        Apellido
                </Form.Label>
                    <Col sm="12">
                        <Form.Control type="text" defaultValue={props.user.last_name} onChange={handleChange("last_name")} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintextPassword">
                    <Form.Label column sm="12">
                        DNI
                </Form.Label>
                    <Col sm="12">
                        <Form.Control type="number" defaultValue={props.user.dni} onChange={handleChange("dni")} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintextLegajo">
                    <Form.Label column sm="12">
                        Legajo
                </Form.Label>
                    <Col sm="12">
                        <Form.Control defaultValue={props.user.legajo} onChange={handleChange("legajo")} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintextCargo">
                    <Form.Label column sm="12">
                        Cargo
                </Form.Label>
                    <Col sm="12">
                        <Form.Control defaultValue={props.user.cargo} onChange={handleChange("cargo")} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintextEmail">
                    <Form.Label column sm="12">
                        Email
                </Form.Label>
                    <Col sm="12">
                        <Form.Control defaultValue={props.user.email} onChange={handleChange("email")} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintextPassword">
                    <Form.Label column sm="12">
                        Contraseña
                    </Form.Label>
                    <Col sm="12">
                        <Form.Control type="password" defaultValue={props.user.password} placeholder="Password" onChange={handleChange("password")} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintextPassword">
                    <Form.Label column sm="12">
                        Contraseña 2
                    </Form.Label>
                    <Col sm="12">
                        <Form.Control type="password" defaultValue={props.user.password2} placeholder="Password2" onChange={handleChange("password2")} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintextCargo">
                    <Form.Label column sm="12">
                        Tipo de Cuenta
                </Form.Label>
                    <Col sm="12">
                        <Form.Control type="number" defaultValue={props.user.groups?.id} onChange={handleChange("groups")} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintextPassword">
                    <Form.Label column sm="12">
                        Teléfono
                </Form.Label>
                    <Col sm="12">
                        <Form.Control type="text" defaultValue={props.user.phone} onChange={handleChange("phone")} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintextPassword">
                    <Form.Label column sm="12">
                        Fecha de Nacimiento
                </Form.Label>
                    <Col sm="12">
                        <Form.Control type="date" defaultValue={props.user.date_of_birth} onChange={handleChange("date_of_birth")} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintextPassword">
                    <Form.Label column sm="12">
                        Dirección
                </Form.Label>
                    <Col sm="12">
                        <Form.Control type="text" defaultValue={props.user.direccion} onChange={handleChange("direccion")} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintextPassword">
                    <Form.Label column sm="12">
                        Localidad
                </Form.Label>
                    <Col sm="12">
                        <Form.Control type="text" defaultValue={props.user.localidad} onChange={handleChange("localidad")} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintextPassword">
                    <Form.Label column sm="12">
                        Provincia
                </Form.Label>
                    <Col sm="12">
                        <Form.Control type="text" defaultValue={props.user.provincia} onChange={handleChange("provincia")} />
                    </Col>
                </Form.Group>
                <div className="d-flex justify-content-end">
                    <Button className="mr-2" variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button type="submit" className="ml-2" variant="primary" /* onClick={props.handleSubmit} */>
                        Save Changes
                    </Button>
                </div>
            </Form>
        </Container>
    )
}

export default FormUser;