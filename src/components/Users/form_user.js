import { Form, Row, Col, Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';


const FormUser = (props) => {

    const handleChange = (input)=>(event) =>{
        props.handleChange(input, event.target.value);
    }

    return(
    <Container className="mt-5">
        <Form>
            <Form.Group as={Row} controlId="formPlaintextPassword1">
                <Form.Label column sm="2">
                    Nombre
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" defaultValue={props.user.nombre} onChange={handleChange("nombre")}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formPlaintextPassword2">
                <Form.Label column sm="2">
                    Apellido
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" defaultValue={props.user.apellido} onChange={handleChange("apellido")}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                    Email
                </Form.Label>
                <Col sm="10">
                    <Form.Control defaultValue={props.user.email} />
                </Col>
            </Form.Group>
        </Form>
    </Container>
    )
}

export default FormUser;