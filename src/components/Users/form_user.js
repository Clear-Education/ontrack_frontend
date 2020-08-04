import { Form, Row, Col, Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';


const FormUser = (props) => {

    const handleChange = (input) => (event) => {
        props.handleChange(input, event.target.value);
    }

    return (
        <Container className="mt-5">
            <Form>
                <Form.Group as={Row} controlId="formPlaintextName">
                    <Form.Label column sm="2">
                        Nombre
                </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" defaultValue={props.user.name} onChange={handleChange("name")} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        Apellido
                </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" defaultValue={props.user.last_name} onChange={handleChange("last_name")} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        DNI
                </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" defaultValue={props.user.dni} onChange={handleChange("dni")} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintextLegajo">
                    <Form.Label column sm="2">
                        Legajo
                </Form.Label>
                    <Col sm="10">
                        <Form.Control defaultValue={props.user.legajo} onChange={handleChange("legajo")} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintextCargo">
                    <Form.Label column sm="2">
                        Cargo
                </Form.Label>
                    <Col sm="10">
                        <Form.Control defaultValue={props.user.cargo} onChange={handleChange("cargo")} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        Email
                </Form.Label>
                    <Col sm="10">
                        <Form.Control defaultValue={props.user.email} onChange={handleChange("email")} />
                    </Col>
                </Form.Group>
            </Form>
        </Container>
    )
}

export default FormUser;